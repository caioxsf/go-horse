import Database from "../db/database.js";
import TipoClassificadoEntity from "../entities/tipoClassificadoEntity.js";
 

export default class TipoClassificadoRepository {

    #database;

    constructor() {
        this.#database = new Database();
    }

    async listar() {
        let sql = `SELECT * from tb_tipoclassificado;`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push(
                new TipoClassificadoEntity(
                    index['tip_id'],
                    index['tip_descricao']
                ));
        }

        return arr;
    };


}