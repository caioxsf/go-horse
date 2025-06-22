import Database from "../db/database.js";
import ChatRoomEntity from "../entities/chatRoom.js";
import CidadeEntity from "../entities/cidadeEntity.js";

export default class CidadeRepository {

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

    async listar() {
        let sql = ` SELECT cid.cid_id, cid.cid_nome, est.est_uf FROM tb_cidade cid 
                    INNER JOIN tb_estado est
                    ON
                    cid.est_id = est.est_id`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push({
                cid_id: index['cid_id'],
                cid_nome: index['cid_nome'],
                uf: index['est_uf']
            });
        
        }

        return arr;
    };

    


}