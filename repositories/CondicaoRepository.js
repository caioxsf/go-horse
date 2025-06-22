import Database from "../db/database.js";
import CondicaoEntity from "../entities/condicaoEntity.js";

export default class CondicaoRepository {

    #database;

    constructor() {
        this.#database = new Database();
    }

    async listar() {
        let sql = `SELECT * from tb_condicao;`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push(
                new CondicaoEntity(
                    index['con_id'],
                    index['con_descricao']
                ));
        }

        return arr;
    };


}