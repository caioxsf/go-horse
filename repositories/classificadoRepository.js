import Database from "../db/database.js";
import ClassificadoEntity from "../entities/classificadoEntity.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/pt-br.js";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

function tempoAtras(data) {
  return dayjs(data).fromNow();
}

export default class ClassificadoRepository {
  #database;

  constructor() {
    this.#database = new Database();
  }

  get database() {
    return this.#database;
  }

  set database(value) {
    this.#database = value;
  }

  async cadastrar(classificado) {
    let sql = `INSERT INTO tb_classificado (
            cla_titulo,
            cla_descricao,
            cla_nrovisualizacao,
            cla_datapublicacao,
            cla_valor,
            usu_id,
            con_id,
            sit_id,
            tip_id,
            cid_id
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );`;

    let values = [
      classificado.titulo,
      classificado.descricao,
      classificado.numVisualizacao,
      classificado.dataPublicacao,
      classificado.valor,
      classificado.usuarioId,
      classificado.condicaoId,
      classificado.situacaoId,
      classificado.tipoId,
      classificado.cidadeId,
    ];

    const result = await this.#database.ExecutaComandoLastInserted(sql, values);

    return result;
  }

  async atualizarClassificado(classificado, classificadoId) {
    let sql = ` UPDATE  tb_classificado SET 
                        cla_titulo = ?,
                        cla_descricao = ?,
                        cla_valor = ?,
                        con_id = ?,
                        sit_id = ?,
                        cid_id = ?
                        WHERE cla_id = ?`;
    let valores = [
      classificado.titulo,
      classificado.descricao,
      classificado.valor,
      classificado.condicaoId,
      classificado.situacaoId,
      classificado.cidadeId,
      classificadoId
    ];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async listarPublic() {
    //Retira classicados com status id 4 - removido
    let sql = ` SELECT 
                    cla.cla_id,
                    cla.cla_titulo,
                    cla.cla_descricao,
                    cla.cla_nrovisualizacao,
                    cla.cla_datapublicacao,
                    cla.cla_valor,
                    usu.usu_nome,
                    con.con_descricao,
                    sit.sit_descricao,
                    tc.tip_descricao,
                    cid.cid_nome,
                    est.est_nome,

                    
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
                    CASE WHEN cla.tip_id = 3 THEN mo.mod_nome ELSE NULL END AS mod_nome,
                    CASE WHEN cla.tip_id = 3 THEN fab.fab_nome ELSE NULL END AS fab_nome,
                    
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
                    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_descricao ELSE NULL END AS tpi_descricao,
                    
                    CASE WHEN cla.tip_id = 1 THEN cat.cat_descricao ELSE NULL END AS cat_descricao

                    FROM tb_classificado cla
                    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
                    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
                    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
                    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
                    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
                    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
                    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
                    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
                    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
                    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
                    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
                    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
                    LEFT JOIN tb_estado est ON est.est_id = cid.est_id
                    WHERE cla.tip_id IN (1, 2, 3) AND cla.sit_id = 1 
                    ORDER BY cla.cla_nrovisualizacao DESC; `;

    let arr = [];

    let result = await this.#database.ExecutaComando(sql);

    for (const row of result) {
      let dataPubNew = tempoAtras(row["cla_datapublicacao"]);

      arr.push({
        idClassificado: row["cla_id"],
        usuario: row["usu_nome"],
        titulo: row["cla_titulo"],
        descricao: row["cla_descricao"],
        dataPublicacao: dataPubNew,
        valor: row["cla_valor"],
        condicao: row["con_descricao"],
        situacao: row["sit_descricao"],
        tipo: row["tip_descricao"],
        cidade: row["cid_nome"],
        estado: row["est_nome"],
        ano: row["vei_ano"],
        kilometragem: row["vei_kilometragem"],
        modeloVeiculo: row["mod_nome"],
        fabricanteVeiculo: row["fab_nome"],
        quartos: row["imv_quartos"],
        banheiros: row["imv_banheiros"],
        metrosQuadrados: row["imv_metrosquadrado"],
        tipoImovel: row["tpi_descricao"],
        categoriaItem: row["cat_descricao"],
      });
    }

    return arr;
  }

  async listarClassificadoIds(id) {
    let sql = `SELECT 
                    cla.cla_id,
                    cla.cla_titulo,
                    cla.cla_descricao,
                    cla.cla_nrovisualizacao,
                    cla.cla_datapublicacao,
                    cla.cla_valor,
                    usu.usu_id,
                    con.con_id,
                    sit.sit_id,
                    tc.tip_id,
                    cid.cid_id,
                    est.est_id,

                    
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
                    CASE WHEN cla.tip_id = 3 THEN mo.mod_id ELSE NULL END AS mod_id,
                    CASE WHEN cla.tip_id = 3 THEN fab.fab_id ELSE NULL END AS fab_id,
                    
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
                    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_id ELSE NULL END AS tpi_id,
                    
                    CASE WHEN cla.tip_id = 1 THEN cat.cat_id ELSE NULL END AS cat_id

                    FROM tb_classificado cla
                    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
                    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
                    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
                    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
                    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
                    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
                    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
                    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
                    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
                    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
                    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
                    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
                    LEFT JOIN tb_estado est ON est.est_id = cid.est_id
                    WHERE cla.tip_id IN (1, 2, 3) AND cla.sit_id = 1 
                    AND cla.cla_id = ?
                    ORDER BY cla.cla_nrovisualizacao DESC;  
                    `

    let arr = [];
    let valores = [id]
    let result = await this.#database.ExecutaComando(sql, valores)
    for (const row of result) {
      let dataPubNew = tempoAtras(row["cla_datapublicacao"]);

      arr.push({
        idClassificado: row["cla_id"],
        usuario: row["usu_nome"],
        titulo: row["cla_titulo"],
        descricao: row["cla_descricao"],
        dataPublicacao: dataPubNew,
        valor: row["cla_valor"],
        condicao: row["con_id"],
        situacao: row["sit_id"],
        tipo: row["tip_id"],
        cidade: row["cid_id"],
        estado: row["est_id"],
        ano: row["vei_ano"],
        kilometragem: row["vei_kilometragem"],
        modeloVeiculo: row["mod_id"],
        fabricanteVeiculo: row["fab_id"],
        quartos: row["imv_quartos"],
        banheiros: row["imv_banheiros"],
        metrosQuadrados: row["imv_metrosquadrado"],
        tipoImovel: row["tpi_id"],
        categoriaItem: row["cat_id"],
      });
    }

    return arr;
  }

  async obterClassificadoUsuarioId(id, usuarioId) {
    //Retira classicados com status id 4 - removido
    let sql = ` SELECT 
                    cla.cla_id,
                    cla.cla_titulo,
                    cla.cla_descricao,
                    cla.cla_nrovisualizacao,
                    cla.cla_datapublicacao,
                    cla.cla_valor,
                    usu.usu_nome,
                    con.con_descricao,
                    sit.sit_descricao,
                    tc.tip_descricao,
                    cid.cid_nome,
                    est.est_nome,

                    
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
                    CASE WHEN cla.tip_id = 3 THEN mo.mod_nome ELSE NULL END AS mod_nome,
                    CASE WHEN cla.tip_id = 3 THEN fab.fab_nome ELSE NULL END AS fab_nome,
                    
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
                    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_descricao ELSE NULL END AS tpi_descricao,
                    
                    CASE WHEN cla.tip_id = 1 THEN cat.cat_descricao ELSE NULL END AS cat_descricao

                    FROM tb_classificado cla
                    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
                    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
                    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
                    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
                    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
                    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
                    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
                    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
                    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
                    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
                    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
                    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
                    LEFT JOIN tb_estado est ON est.est_id = cid.est_id
                    WHERE cla.tip_id IN (1, 2, 3) AND cla.sit_id != 4 
                    AND cla.cla_id = ? AND usu.usu_id = ? ORDER BY cla.cla_nrovisualizacao DESC`;

    let arr = [];
    let valores = [id, usuarioId];

    let result = await this.#database.ExecutaComando(sql, valores);

    for (const row of result) {
      let dataPubNew = tempoAtras(row["cla_datapublicacao"]);
      //Devolvendo em JSON para remover informações desnecessárias
      arr.push({
        idClassificado: row["cla_id"],
        usuario: row["usu_nome"],
        titulo: row["cla_titulo"],
        descricao: row["cla_descricao"],
        numeroVisualizacao: row["cla_nrovisualizacao"],
        dataPublicacao: dataPubNew,
        valor: row["cla_valor"],
        condicao: row["con_descricao"],
        situacao: row["sit_descricao"],
        tipo: row["tip_descricao"],
        cidade: row["cid_nome"],
        estado: row["est_nome"],
        ano: row["vei_ano"],
        kilometragem: row["vei_kilometragem"],
        modeloVeiculo: row["mod_nome"],
        fabricanteVeiculo: row["fab_nome"],
        quartos: row["imv_quartos"],
        banheiros: row["imv_banheiros"],
        metrosQuadrados: row["imv_metrosquadrado"],
        tipoImovel: row["tpi_descricao"],
        categoriaItem: row["cat_descricao"],
      });
    }

    return arr;
  }

  async obterClassificadoCompleto(id) {
    //Retira classicados com status id 4 - removido
    let sql = ` SELECT 
                    cla.cla_id,
                    cla.cla_titulo,
                    cla.cla_descricao,
                    cla.cla_nrovisualizacao,
                    cla.cla_datapublicacao,
                    cla.cla_valor,
                    usu.usu_nome,
                    usu.usu_datacadastro,
                    usu.usu_id,
                    con.con_descricao,
                    sit.sit_descricao,
                    tc.tip_descricao,
                    cid.cid_nome,
                    est.est_nome,

                    
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
                    CASE WHEN cla.tip_id = 3 THEN mo.mod_nome ELSE NULL END AS mod_nome,
                    CASE WHEN cla.tip_id = 3 THEN fab.fab_nome ELSE NULL END AS fab_nome,
                    
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
                    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_descricao ELSE NULL END AS tpi_descricao,
                    
                    CASE WHEN cla.tip_id = 1 THEN cat.cat_descricao ELSE NULL END AS cat_descricao

                    FROM tb_classificado cla
                    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
                    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
                    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
                    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
                    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
                    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
                    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
                    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
                    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
                    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
                    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
                    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
                    LEFT JOIN tb_estado est ON est.est_id = cid.est_id
                    WHERE cla.tip_id IN (1, 2, 3) AND cla.sit_id = 1 
                    AND cla.cla_id = ?`;

    let arr = [];
    let valores = [id];

    let result = await this.#database.ExecutaComando(sql, valores);

    for (const row of result) {
      let dataPubNew = tempoAtras(row["cla_datapublicacao"]);

      const dataCadastroUsuario = row["usu_datacadastro"];
      const date = new Date(dataCadastroUsuario);
      const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      const mesAno = `${meses[date.getMonth()]} de ${date.getFullYear()}`;
      arr.push({
        idClassificado: row["cla_id"],
        usuario: row["usu_nome"],
        dataCadastro: mesAno,
        usu_id: row["usu_id"],
        titulo: row["cla_titulo"],
        descricao: row["cla_descricao"],
        numeroVisualizacao: row["cla_nrovisualizacao"],
        dataPublicacao: dataPubNew,
        valor: row["cla_valor"],
        condicao: row["con_descricao"],
        situacao: row["sit_descricao"],
        tipo: row["tip_descricao"],
        cidade: row["cid_nome"],
        estado: row["est_nome"],
        ano: row["vei_ano"],
        kilometragem: row["vei_kilometragem"],
        modeloVeiculo: row["mod_nome"],
        fabricanteVeiculo: row["fab_nome"],
        quartos: row["imv_quartos"],
        banheiros: row["imv_banheiros"],
        metrosQuadrados: row["imv_metrosquadrado"],
        tipoImovel: row["tpi_descricao"],
        categoriaItem: row["cat_descricao"],
      });
    }

    return arr;
  }

  async acrescentarVisualizacao(id) {
    let sql = `UPDATE tb_classificado SET cla_nrovisualizacao = cla_nrovisualizacao + 1 WHERE cla_id = ?`;
    let valores = [id];
    let result = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return result;
  }

  async update() {
    let sql = `UPDATE tb_classificado
                SET
                cla_titulo = ?,
                cla_descricao = ?,
                cla_valor = ?,
                con_id = ?,
                sit_id = ?,
                cid_id = ?
                WHERE
                cla_id = ?`;

    let values = [
      data.titulo,
      data.descricao,
      data.valor,
      data.condicaoId,
      data.situacaoId,
      data.cidadeId,
      id,
    ];

    let result = await this.#database.ExecutaComando(sql, values);

    return result;
  }

  async delete(id) {
    let sql = `UPDATE tb_classificado
                    SET sit_id ?
                    WHERE
                    cla_id = ?`;

    //situacao id 4 é produto removido
    let values = [4, id];

    let result = await this.#database.ExecutaComando(sql, values);

    return result;
  }

  async ativarClassificado(id, usuarioId) {
    let sql =
      "UPDATE tb_classificado SET sit_id = 1 WHERE cla_id = ? AND usu_id = ?";
    let valores = [id, usuarioId];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async pausarClassificado(id, usuarioId) {
    let sql =
      "UPDATE tb_classificado SET sit_id = 3 WHERE cla_id = ? AND usu_id = ?";
    let valores = [id, usuarioId];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async deletarClassificado(id, usuarioId) {
    let sql =
      "UPDATE tb_classificado SET sit_id = 4 WHERE cla_id = ? AND usu_id = ?";
    let valores = [id, usuarioId];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async venderClassificado(id, usuarioId) {
    let sql = `UPDATE tb_classificado SET sit_id = 2 WHERE cla_id = ? AND usu_id = ?`;
    let valores = [id, usuarioId];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async meusClassificados(id) {
    let sql = `SELECT 
                    cla.cla_id,
                    cla.cla_titulo,
                    cla.cla_descricao,
                    cla.cla_nrovisualizacao,
                    cla.cla_datapublicacao,
                    cla.cla_valor,
                    usu.usu_nome,
                    con.con_descricao,
                    sit.sit_descricao,
                    tc.tip_descricao,
                    cid.cid_nome,
                    est.est_nome,

                    
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
                    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
                    CASE WHEN cla.tip_id = 3 THEN mo.mod_nome ELSE NULL END AS mod_nome,
                    CASE WHEN cla.tip_id = 3 THEN fab.fab_nome ELSE NULL END AS fab_nome,
                    
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
                    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
                    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_descricao ELSE NULL END AS tpi_descricao,
                    
                    CASE WHEN cla.tip_id = 1 THEN cat.cat_descricao ELSE NULL END AS cat_descricao

                    FROM tb_classificado cla
                    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
                    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
                    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
                    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
                    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
                    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
                    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
                    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
                    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
                    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
                    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
                    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
                    LEFT JOIN tb_estado est ON est.est_id = cid.est_id
                    WHERE cla.tip_id IN (1, 2, 3) AND cla.sit_id != 4
                    AND usu.usu_id = ?`;
    let valores = [id];
    let lista = [];
    let result = await this.#database.ExecutaComando(sql, valores);
    for (const row of result) {
      let dataPubNew = tempoAtras(row["cla_datapublicacao"]);

      //Devolvendo em JSON para remover informações desnecessárias
      lista.push({
        idClassificado: row["cla_id"],
        usuario: row["usu_nome"],
        titulo: row["cla_titulo"],
        descricao: row["cla_descricao"],
        numeroVisualizacao: row["cla_nrovisualizacao"],
        dataPublicacao: dataPubNew,
        valor: row["cla_valor"],
        condicao: row["con_descricao"],
        situacao: row["sit_descricao"],
        tipo: row["tip_descricao"],
        cidade: row["cid_nome"],
        estado: row["est_nome"],
        ano: row["vei_ano"],
        kilometragem: row["vei_kilometragem"],
        modeloVeiculo: row["mod_nome"],
        fabricanteVeiculo: row["fab_nome"],
        quartos: row["imv_quartos"],
        banheiros: row["imv_banheiros"],
        metrosQuadrados: row["imv_metrosquadrado"],
        tipoImovel: row["tpi_descricao"],
        categoriaItem: row["cat_descricao"],
      });
    }
    return lista;
  }

  async verificarClassificadoDoUsuario(classificadoId, usuarioId) {
    let sql = `SELECT * FROM tb_classificado WHERE usu_id = ? AND cla_id = ?`;
    let valores = [usuarioId, classificadoId];
    let result = await this.#database.ExecutaComando(sql, valores);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async verificarClassificadoJaSalvo(classificadoId, usuarioId) {
    let sql = `SELECT * FROM tb_salvo WHERE usu_id = ? AND cla_id = ?`;
    let valores = [usuarioId, classificadoId];
    let result = await this.#database.ExecutaComando(sql, valores);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async buscarPorNome(value) {
    const sql = `
    SELECT 
    cla.cla_id,
    cla.cla_titulo,
    cla.cla_descricao,
    cla.cla_nrovisualizacao,
    cla.cla_datapublicacao,
    cla.cla_valor,
    usu.usu_nome,
    con.con_descricao,
    sit.sit_descricao,
    tc.tip_descricao,
    cid.cid_nome,
    est.est_nome,

    CASE WHEN cla.tip_id = 3 THEN vei.vei_ano ELSE NULL END AS vei_ano,
    CASE WHEN cla.tip_id = 3 THEN vei.vei_kilometragem ELSE NULL END AS vei_kilometragem,
    CASE WHEN cla.tip_id = 3 THEN mo.mod_nome ELSE NULL END AS mod_nome,
    CASE WHEN cla.tip_id = 3 THEN fab.fab_nome ELSE NULL END AS fab_nome,

    CASE WHEN cla.tip_id = 2 THEN imo.imv_quartos ELSE NULL END AS imv_quartos,
    CASE WHEN cla.tip_id = 2 THEN imo.imv_banheiros ELSE NULL END AS imv_banheiros,
    CASE WHEN cla.tip_id = 2 THEN imo.imv_metrosquadrados ELSE NULL END AS imv_metrosquadrado,
    CASE WHEN cla.tip_id = 2 THEN tpi.tpi_descricao ELSE NULL END AS tpi_descricao,

    CASE WHEN cla.tip_id = 1 THEN cat.cat_descricao ELSE NULL END AS cat_descricao

    FROM tb_classificado cla
    LEFT JOIN tb_veiculo vei ON vei.cla_id = cla.cla_id
    LEFT JOIN tb_imovel imo ON imo.cla_id = cla.cla_id
    LEFT JOIN tb_modeloveiculo mo ON mo.mod_id = vei.mod_id
    LEFT JOIN tb_fabricanteveiculo fab ON fab.fab_id = mo.fab_id
    LEFT JOIN tb_item it ON it.cla_id = cla.cla_id
    LEFT JOIN tb_categoriaitem cat ON cat.cat_id = it.cat_id
    LEFT JOIN tb_tipoimovel tpi ON tpi.tpi_id = imo.tpi_id
    LEFT JOIN tb_usuario usu ON usu.usu_id = cla.usu_id
    LEFT JOIN tb_condicao con ON con.con_id = cla.con_id
    LEFT JOIN tb_situacao sit ON sit.sit_id = cla.sit_id
    LEFT JOIN tb_tipoclassificado tc ON tc.tip_id = cla.tip_id
    LEFT JOIN tb_cidade cid ON cid.cid_id = cla.cid_id
    LEFT JOIN tb_estado est ON est.est_id = cid.est_id

    WHERE cla.tip_id IN (1, 2, 3)
    AND cla.sit_id = 1
    AND LOWER(cla.cla_titulo) LIKE ?

    ORDER BY cla.cla_nrovisualizacao DESC
    LIMIT 20;
`;

    let termoBusca = `%${value.toLowerCase()}%`;
    let result = await this.#database.ExecutaComando(sql, [termoBusca]);

    let arr = [];

    if (result.length > 0) {
      for (const row of result) {
        let dataPubNew = tempoAtras(row["cla_datapublicacao"]);

        arr.push({
          idClassificado: row["cla_id"],
          usuario: row["usu_nome"],
          titulo: row["cla_titulo"],
          descricao: row["cla_descricao"],
          dataPublicacao: dataPubNew,
          valor: row["cla_valor"],
          condicao: row["con_descricao"],
          situacao: row["sit_descricao"],
          tipo: row["tip_descricao"],
          cidade: row["cid_nome"],
          estado: row["est_nome"],
          ano: row["vei_ano"],
          kilometragem: row["vei_kilometragem"],
          modeloVeiculo: row["mod_nome"],
          fabricanteVeiculo: row["fab_nome"],
          quartos: row["imv_quartos"],
          banheiros: row["imv_banheiros"],
          metrosQuadrados: row["imv_metrosquadrado"],
          tipoImovel: row["tpi_descricao"],
          categoriaItem: row["cat_descricao"],
        });
      }
    }

    return arr;
  }

  async excluirImagens(id) {
    let sql = `DELETE FROM tb_imagemclassificado WHERE cla_id = ?`;
    let valores = [id];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async excluirImagensPorId(imagemId) {
    let sql = `DELETE FROM tb_imagemclassificado WHERE img_id = ?`;
    let valores = [imagemId];
    let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async obterNomeUsuarioPeloid(id1, id2) {
    let sql = `SELECT usu_id, usu_nome FROM tb_usuario WHERE usu_id IN (?,  ?)`;
    let valores = [id1, id2];
    let arr = [];
    let resultado = await this.#database.ExecutaComando(sql, valores)

    if (resultado.length > 0) {
      for (const row of resultado) {
        arr.push({
          id: row["usu_id"],
          nome: row["usu_nome"]
        })
      }
    }
    return arr;
  }

}
