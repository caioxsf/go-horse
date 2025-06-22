import BaseEntity from "./BaseEntity.js";

export default class EstadoEntity extends BaseEntity {

    #id
    #nome
    #ibge
    #estadoId

    constructor(id,nome, ibge, estadoId) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#ibge = ibge;
        this.#estadoId = estadoId;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get ibge () {return this.#ibge} set ibge (value) {this.#ibge = value}
    get estadoId () {return this.#estadoId} set estadoId (value) {this.#estadoId = value}
}