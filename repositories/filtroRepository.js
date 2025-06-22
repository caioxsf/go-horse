import Database from "../db/database.js";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/pt-br.js';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

function tempoAtras(data) {
    return dayjs(data).fromNow();
}

export default class FiltroRepository {
    #database;

    constructor() {
        this.#database = new Database();
    }

    async filtrarClassificados(cidade, tipoClassificado, condicao, ordenarData, precoMinimo, precoMaximo) {
        let sql = `
            SELECT 
                c.cla_id, 
                c.cla_titulo, 
                c.cla_valor, 
                c.cla_datapublicacao,
                cid.cid_nome,
                t.tip_descricao,
                con.con_descricao
            FROM tb_classificado c
            INNER JOIN tb_cidade cid ON cid.cid_id = c.cid_id
            INNER JOIN tb_tipoclassificado t ON t.tip_id = c.tip_id
            INNER JOIN tb_condicao con ON con.con_id = c.con_id
            WHERE c.sit_id NOT IN (3, 4)
        `;

        let valores = [];

        if (cidade) {
            sql += ' AND c.cid_id = ?';
            valores.push(cidade);
        }

        if (tipoClassificado) {
            sql += ' AND c.tip_id = ?';
            valores.push(tipoClassificado);
        }

        if (condicao) {
            sql += ' AND c.con_id = ?';
            valores.push(condicao);
        }

        if (precoMinimo) {
            sql += ' AND c.cla_valor >= ?';
            valores.push(precoMinimo);
        }

        if (precoMaximo) {
            sql += ' AND c.cla_valor <= ?';
            valores.push(precoMaximo);
        }

        let ordem = [];
        if (ordenarData === 'true') {
            ordem.push('c.cla_datapublicacao DESC');
        }
        if (precoMinimo || precoMaximo) {
            ordem.push('c.cla_valor ASC');
        }

        if (ordem.length > 0) {
            sql += ' ORDER BY ' + ordem.join(', ');
        }

        let resultado = await this.#database.ExecutaComando(sql, valores);

        let lista = [];
        if (resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                let row = resultado[i];
                let dataPubNew = tempoAtras(row.cla_datapublicacao);
                lista.push({
                    id: row.cla_id,
                    titulo: row.cla_titulo,
                    valor: row.cla_valor,
                    dataPublicacao: dataPubNew,
                    cidade: row.cid_nome,
                    tipoClassificado: row.tip_nome,
                    condicao: row.con_nome
                });
            }
            return lista;
        }

        return false;
    }
}
