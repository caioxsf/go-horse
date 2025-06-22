import BaseEntity from "./BaseEntity.js";

export default class CidadeEntity extends BaseEntity {

    #id
    #nome
    #ibge
    #estado

    constructor(id, nome,ibge, estado) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#ibge = ibge;
        this.#estado = estado;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get ibge () {return this.#ibge} set ibge (value) {this.#ibge = value}
    get estado () {return this.#estado} set estado (value) {this.#estado = value}
}