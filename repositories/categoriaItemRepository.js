import Database from "../db/database.js";
import CategoriaItemEntity from "../entities/categoriaItemEntity.js";

export default class CategoriaItemRepository {

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
        let sql = `SELECT * from tb_categoriaitem;`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push(
                new CategoriaItemEntity(
                    index['cat_id'],
                    index['cat_descricao']
                ));
        }

        return arr;
    };


}