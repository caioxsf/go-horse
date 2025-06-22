import BaseEntity from "./BaseEntity.js";

export default class ImagemClassificadoEntity extends BaseEntity {

    #id
    #imagem
    #extensao
    #classificado

    constructor (id, imagem, extensao, classificado) {
        super();
        this.#id = id;
        this.#imagem = imagem;
        this.#extensao = extensao;
        this.#classificado = classificado;
    }

    get id () {
        return this.#id;
    }
    get imagem () {
        return this.#imagem;
    }
    get extensao () {
        return this.#extensao;
    }
    get classificado () {
        return this.#classificado;
    }
    set id (id) {
        this.#id = id;
    }
    set imagem (imagem) {
        this.#imagem = imagem;
    }
    set extensao (extensao) {
        this.#extensao = extensao;
    }
    set classificado (classificado) {
        this.#classificado = classificado;
    }

    validar() {
        if(this.#extensao == "png" || 
            this.#extensao == "jpg" || 
            this.#extensao == "jpeg") {
            return true;
        }

        return false;
    }
}