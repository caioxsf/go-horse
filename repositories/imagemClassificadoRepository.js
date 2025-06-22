import Database from "../db/database.js"
import ClassificadoEntity from "../entities/classificadoEntity.js";
import ImagemClassificadoEntity from "../entities/imagemClassificadoEntity.js";

export default class ImagemClassificadoRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async inserirImagem(entidade) {
        let sql = `INSERT INTO tb_imagemclassificado (img_blob, img_extensao, cla_id) VALUES (?,?,?)`;
        let valores = [entidade.imagem, entidade.extensao, entidade.classificado];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async listarPorImovel(idImovel) {
        let sql = `SELECT * FROM tb_imagemclassificado WHERE cla_id = ?`
        let valores = [idImovel];

        let rows = await this.#banco.ExecutaComando(sql,valores);
        let lista = [];

        for(let row of rows) {
            lista.push(new ImagemClassificadoEntity(row['img_id'], "data:image/jpeg;base64," + row["img_blob"].toString("base64"), row['img_extensao'], row['cla_id']));
        }
        return lista;
    }
}
