
export default class ItemEntity{

    #id
    #categoriaId
    #tipoId
    #classificadoId

    constructor(id,categoriaId,tipoId,classificadoId) {
        this.#id = id
        this.#categoriaId = categoriaId
        this.#tipoId = tipoId
        this.#classificadoId = classificadoId
    }

    get id() {return this.#id} set id(value) {this.#id = value}
    get categoriaId() {return this.#categoriaId} set categoriaId(value) {this.#categoriaId = value}
    get tipoId() {return this.#tipoId} set tipoId(value) {this.#tipoId = value}
    get classificadoId() {return this.#classificadoId} set classificadoId(value) {this.#classificadoId = value}

}