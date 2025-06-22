import BaseEntity from "./BaseEntity.js";

export default class CategoriaItemEntity extends BaseEntity {
    #categoriaId;
    #categoriaDescricao;

    constructor(categoriaId, categoriaDescricao) {
        super();
        this.#categoriaId = categoriaId;
        this.#categoriaDescricao = categoriaDescricao
    }

    get categoriaId() {
        return this.#categoriaId;
    }

    set categoriaId(value) {
        this.#categoriaId = value;
    }

    get categoriaDescricao() {
        return this.#categoriaDescricao;
    }

    set categoriaDescricao(value) {
        this.#categoriaDescricao = value;
    }

}
