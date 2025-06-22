import Database from "../db/database.js";
import TipoImovelEntity from "../entities/tipoImovelEntity.js";
 

export default class tipoImovelRepository {

    #database;

    constructor() {
        this.#database = new Database();
    }

    async listar() {
        let sql = `SELECT * from tb_tipoimovel;`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push(
                new TipoImovelEntity(
                    index['tpi_id'],
                    index['tpi_descricao']
                ));
        }

        return arr;
    };


}