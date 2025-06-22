import Database from "../db/database.js";
import SalvoEntity from "../entities/SalvoEntity.js";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/pt-br.js';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

function tempoAtras(data) {
    return dayjs(data).fromNow();
}

export default class SalvoRepository {

    #database
    constructor() {
        this.#database = new Database();
    }

    async salvarClassificado(data, usuario, classificado) {
        let sql = "INSERT INTO tb_salvo (sal_data, usu_id, cla_id) VALUES (?,?,?)";
        let valores = [data, usuario, classificado];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores)
        return resultado;
    }

    async meusSalvos(usuarioId) {
        let sql = ` 
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

                        FROM tb_salvo s
                        INNER JOIN tb_classificado cla ON s.cla_id = cla.cla_id
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

                        WHERE s.usu_id = ?
                        AND cla.tip_id IN (1, 2, 3)
                        AND cla.sit_id = 1;
;
                    `
        let valores = [usuarioId];
        let resultado = await this.#database.ExecutaComando(sql, valores);
        let lista = [];
        if (resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                let dataPubNew = tempoAtras(row['cla_datapublicacao']);

                lista.push({
                    idClassificado: row['cla_id'],
                    usuario: row['usu_nome'],
                    titulo: row['cla_titulo'],
                    descricao: row['cla_descricao'],
                    numeroVisualizacao: row['cla_nrovisualizacao'],
                    dataPublicacao: dataPubNew,
                    valor: row['cla_valor'],
                    condicao: row['con_descricao'],
                    situacao: row['sit_descricao'],
                    tipo: row['tip_descricao'],
                    cidade: row['cid_nome'],
                    estado: row['est_nome'],
                    ano: row['vei_ano'],
                    kilometragem: row['vei_kilometragem'],
                    modeloVeiculo: row['mod_nome'],
                    fabricanteVeiculo: row['fab_nome'],
                    quartos: row['imv_quartos'],
                    banheiros: row['imv_banheiros'],
                    metrosQuadrados: row['imv_metrosquadrado'],
                    tipoImovel: row['tpi_descricao'],
                    categoriaItem: row['cat_descricao'],
                });
            }
            return lista;
        }
        return null;
    }

    async deletarClassificadoSalvo(idClassificado, idUsuario) {
        let sql = "DELETE FROM tb_salvo WHERE cla_id = ? AND usu_id = ?";
        let valores = [idClassificado, idUsuario];
        let resultado = await this.#database.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async obterClassificadoSalvo(idClassificado, idUsuario) {
        let sql = "SELECT * FROM tb_salvo WHERE cla_id = ? AND usu_id = ?";
        let valores = [idClassificado, idUsuario];
        let resultado = await this.#database.ExecutaComando(sql, valores);
        if (resultado.length > 0) {
            return new SalvoEntity(
                resultado[0]['sal_id'],
                resultado[0]['sal_data'],
                resultado[0]['usu_id'],
                resultado[0]['cla_id']
            )
        }
        return null;
    }
}
