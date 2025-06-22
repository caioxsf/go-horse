
export default class ImovelEntity{

    #id
    #quartos
    #banheiros
    #metros_quadrados
    #tipo_imovel
    // tipoId = é o tipo do classificado, item, veiculo ou imovel
    #tipoId
    #classificadoId

    constructor(id,quartos,banheiros,metros_quadrados,tipo_imovel,tipoId,classificadoId) {
        this.#id = id
        this.#quartos = quartos
        this.#banheiros = banheiros
        this.#metros_quadrados = metros_quadrados
        this.#tipo_imovel = tipo_imovel
        this.#tipoId = tipoId
        this.#classificadoId = classificadoId
    }

    get id() {return this.#id} set id(value) {this.#id = value}
    get quartos() {return this.#quartos} set quartos(value) {this.#quartos = value}
    get banheiros() {return this.#banheiros} set banheiros(value) {this.#banheiros = value}
    get metros_quadrados() {return this.#metros_quadrados} set metros_quadrados(value) {this.#metros_quadrados = value}
    get tipo_imovel() {return this.#tipo_imovel} set tipo_imovel(value) {this.#tipo_imovel = value}
    get tipoId() {return this.#tipoId} set tipoId(value) {this.#tipoId = value}
    get classificadoId() {return this.#classificadoId} set classificadoId(value) {this.#classificadoId = value}

}