import Database from "../db/database.js";
import ChatEntity from "../entities/chatEntity.js";
import ChatRoomEntity from "../entities/chatRoom.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/pt-br.js";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

function tempoAtras(data) {
    return dayjs(data).fromNow();
}

export default class ChatRepository {

    #database;

    constructor() {
        this.#database = new Database()
    }

    async listar() {
        let sql = `SELECT * FROM tb_sala;`
        let rows = await this.#database.ExecutaComando(sql);

        let row = rows.map(r => {
            return new ChatRoomEntity(
                r['sal_id'],
                r['sal_user1'],
                r['sal_user2'],
                r['sal_timestamp'],
                r['sal_cla_id']
            )
        });

        return row
    }

    async mensagensRecebidas(usuarioLogado) {
        let sql = ` SELECT 
                    sal.sal_id, 
                    sal.sal_user1, 
                    usu1.usu_nome AS nome_user1,
                    sal.sal_user2, 
                    usu2.usu_nome AS nome_user2,
                    sal.sal_timestamp, 
                    cla.cla_titulo, 
                    cla.cla_id 
                    FROM tb_sala sal 
                    INNER JOIN tb_classificado cla ON sal.sal_cla_id = cla.cla_id
                    INNER JOIN tb_usuario usu1 ON sal.sal_user1 = usu1.usu_id
                    INNER JOIN tb_usuario usu2 ON sal.sal_user2 = usu2.usu_id
                    WHERE (sal.sal_user1 = ? OR sal.sal_user2 = ?)
                    AND EXISTS (
                        SELECT 1 FROM tb_mensagem msg WHERE msg.sala_id = sal.sal_id
                )
                    `
        let value = [usuarioLogado, usuarioLogado]
        let rows = await this.#database.ExecutaComando(sql, value)
        let row = rows.map(r => {
            let dataPubNew = tempoAtras(r['sal_timestamp'])
            let destinatarioId = (r.sal_user1 === usuarioLogado) ? r.sal_user2 : r.sal_user1;
            let destinatarioNome = (r.sal_user1 === usuarioLogado) ? r.nome_user2 : r.nome_user1;
            return {
                sala_id: r['sal_id'],
                user_vendedor: r['sal_user2'],
                user_comprador: destinatarioNome,
                dataPubNew,
                titulo: r['cla_titulo'],
                user_comprador_id: destinatarioId,
                classificado_id: r['cla_id'],
            }
        })
        return row
    }

    async listar() {
        let sql = `SELECT * FROM tb_sala;`
        let rows = await this.#database.ExecutaComando(sql);

        let row = rows.map(r => {
            return new ChatRoomEntity(
                r['sal_id'],
                r['sal_user1'],
                r['sal_user2'],
                r['sal_timestamp'],
                r['sal_cla_id']
            )
        });

        return row
    }

    async gravarMensagem(msg) {
        const sql = `
        INSERT INTO tb_mensagem (
            men_texto, men_data, remetente, destinatario, sala_id
        ) VALUES (?, NOW(), ?, ?, ?);`;
        let values = [msg.texto, msg.remetente, msg.destinatario, msg.sala_id];
        let insertId = await this.#database.ExecutaComandoLastInserted(sql, values);

        return {
            id: insertId,
            texto: msg.texto,
            remetente: msg.remetente,
            destinatario: msg.destinatario,
            sala_id: msg.sala_id,
            men_data: new Date().toISOString()
        };
    }

    async encontrarSalaId(u1, u2, cla) {
        let sql = `
        SELECT * FROM tb_sala
        WHERE (
            (sal_user1 = ? AND sal_user2 = ? AND sal_cla_id = ?)
            OR
            (sal_user1 = ? AND sal_user2 = ? AND sal_cla_id = ?)
        )
    `;
        let values = [u1, u2, cla, u2, u1, cla];

        let result = await this.#database.ExecutaComando(sql, values);
        if (!result) return;
        let arr = result.map(r => {
            return new ChatEntity(
                r['sal_id'],
                r['sal_user1'],
                r['sal_user2'],
                r['sal_timestamp'],
                r['sal_cla_id']
            )
        });
        return arr;
    }


    async criarSala(u1, u2, cla) {
        let sql = `INSERT INTO tb_sala (sal_user1, sal_user2, sal_cla_id)
        VALUES (?, ?, ?);`
        let values = [u1, u2, cla];
        let result = await this.#database.ExecutaComandoNonQuery(sql, values)
        return result
    }


    async listarMensagens(sala_id) {
        let sql = `
        SELECT * FROM tb_mensagem
        WHERE 
        sala_id = ?;
        `
        let values = [sala_id]

        let result = await this.#database.ExecutaComando(sql, values);

        let arr = result.map(r => {
            return new ChatRoomEntity(
                r['men_id'],
                r['men_texto'],
                r['remetente'],
                r['destinatario'],
                r['men_data'],
                r['sala_id']
            )
        });

        return arr
    }
}