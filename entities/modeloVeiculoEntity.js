import BaseEntity from "./BaseEntity.js";

export default class ModeloVeiculoEntity extends BaseEntity {

    #id
    #nome
    #fabricante

    constructor(id,nome,fabricante) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#fabricante = fabricante;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get fabricante () {return this.#fabricante} set fabricante (value) {this.#fabricante = value}
}