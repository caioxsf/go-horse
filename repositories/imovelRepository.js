import Database from "../db/database.js"

export default class ImovelRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async cadastrarImovel(imovel) {
        let sql = `INSERT INTO tb_imovel (imv_quartos, imv_banheiros, imv_metrosquadrados, tpi_id, tip_id, cla_id) VALUES (?,?,?,?,?,?)`
        let values = [imovel.quartos, imovel.banheiros, imovel.metros_quadrados, imovel.tipo_imovel, imovel.tipoId, imovel.classificadoId]
        let result = await this.#banco.ExecutaComandoLastInserted(sql,values);
        return result;
    }

    async obterImovel(id) {
        let sql = `SELECT * FROM tb_imovel WHERE cla_id = ?`
        let valores = [id]
        let resultado = await this.#banco.ExecutaComando(sql,valores);
        return resultado;
    }

    async alterarImovel(classificado, id) {
        let sql =   `UPDATE tb_imovel SET 
                    imv_quartos = ?, 
                    imv_banheiros = ?,
                    imv_metrosquadrados = ?,
                    tpi_id = ?
                    WHERE cla_id = ?`

        let valores = [ 
            classificado.quartos, 
            classificado.banheiros, 
            classificado.metros_quadrados, 
            classificado.tipo_imovel, 
            id]
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores)
        return resultado;
    }



}