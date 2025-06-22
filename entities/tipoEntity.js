import BaseEntity from "./BaseEntity.js";

export default class TipoEntity extends BaseEntity {

    #id
    #descricao

    constructor(id,descricao) {
        super();
        this.#id = id;
        this.#descricao = descricao;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get descricao () {return this.#descricao} set descricao (value) {this.#descricao = value}
}