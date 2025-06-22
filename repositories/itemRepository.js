import Database from "../db/database.js";

export default class ItemRepository {
  #banco;
  constructor() {
    this.#banco = new Database();
  }

  async cadastrarItem(item) {
    let sql = `INSERT INTO tb_item (cat_id, tip_id, cla_id) VALUES (?,?,?)`;
    let values = [item.categoriaId, item.tipoId, item.classificadoId];
    let result = await this.#banco.ExecutaComandoLastInserted(sql, values);
    return result;
  }

  async obterItem(id) {
    let sql = `SELECT * FROM tb_item WHERE cat_id = ?`
    let valores = [id]
    let resultado = await this.#banco.ExecutaComando(sql,valores)
    return resultado
  }

  async atualizarItem(item, id) {
    let sql = `UPDATE tb_item SET cat_id = ? WHERE cla_id = ?`;
    let valores = [
      item.categoriaId,
      id
    ]
    let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores)
    return resultado
  }
}
