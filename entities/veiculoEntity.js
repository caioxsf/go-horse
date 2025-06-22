export default class VeiculoEntity {

    #id
    #ano
    #kilometragem
    #modeloId
    #tipoId
    #classificadoId

    constructor(id,ano,kilometragem,modeloId,tipoId,classificadoId) {
        this.#id = id
        this.#ano = ano
        this.#kilometragem = kilometragem
        this.#modeloId = modeloId
        this.#tipoId = tipoId
        this.#classificadoId = classificadoId
    }

    get id () {return this.#id} set id (value) {this.#id = value} 
    get ano () {return this.#ano} set ano (value) {this.#ano = value}
    get kilometragem () {return this.#kilometragem} set kilometragem (value) {this.#kilometragem = value}
    get modeloId () {return this.#modeloId} set modeloId (value) {this.#modeloId = value}
    get tipoId () {return this.#tipoId} set tipoId (value) {this.#tipoId = value}
    get classificadoId () {return this.#classificadoId} set classificadoId (value) {this.#classificadoId = value}
}