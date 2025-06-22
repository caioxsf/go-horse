import Database from "../db/database.js"

export default class VeiculoRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async cadastrarVeiculo(veiculo) {
        let sql = `INSERT INTO tb_veiculo (vei_ano, vei_kilometragem, mod_id, tip_id, cla_id) VALUES(?,?,?,?,?)`;
        let values = [veiculo.ano, veiculo.kilometragem, veiculo.modeloId, veiculo.tipoId, veiculo.classificadoId]
        let result = await this.#banco.ExecutaComandoLastInserted(sql,values);
        return result;
    }

    async obterVeiculo(id) {
        let sql = `SELECT * FROM tb_veiculo WHERE cla_id = ?`
        let valores = [id]
        let resultado = await this.#banco.ExecutaComando(sql,valores);
        return resultado;
    }

    async alterarVeiculo(veiculo, id) {
        let sql = ` UPDATE tb_veiculo SET
                    vei_ano = ?,
                    vei_kilometragem = ?,
                    mod_id = ?
                    WHERE cla_id = ?`
        let valores = [
            veiculo.ano,
            veiculo.kilometragem,
            veiculo.modeloId,
            id
        ]
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }
}