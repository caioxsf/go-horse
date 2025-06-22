import Database from "../db/database.js";
import ModeloVeiculoEntity from "../entities/modeloVeiculoEntity.js";
 

export default class ModeloVeiculoRepository {

    #database;

    constructor() {
        this.#database = new Database();
    }

    async listar() {
        let sql = `SELECT * from tb_modeloveiculo;`

        let arr = [];

        let result = await this.#database.ExecutaComando(sql);

        for (const index of result) {
            arr.push(
                new ModeloVeiculoEntity(
                    index['mod_id'],
                    index['mod_nome'],
                    index['fab_id']
                ));
        }

        return arr;
    };


}