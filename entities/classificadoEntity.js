export default class ClassificadoEntity {
    #id;
    #titulo;
    #descricao;
    #numVisualizacao;
    #dataPublicacao;
    #valor;
    #usuarioId;
    #condicaoId;
    #situacaoId;
    #tipoId;
    #cidadeId;

    constructor(id, titulo, descricao, numVisualizacao, dataPublicacao, valor, usuarioId, condicaoId, situacaoId, tipoId, cidadeId) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#numVisualizacao = numVisualizacao;
        this.#dataPublicacao = dataPublicacao;
        this.#valor = valor;
        this.#usuarioId = usuarioId;
        this.#condicaoId = condicaoId;
        this.#situacaoId = situacaoId;
        this.#tipoId = tipoId;
        this.#cidadeId = cidadeId;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(value) {
        this.#titulo = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    get numVisualizacao() {
        return this.#numVisualizacao;
    }
    set numVisualizacao(value) {
        this.#numVisualizacao = value;
    }

    get dataPublicacao() {
        return this.#dataPublicacao;
    }
    set dataPublicacao(value) {
        this.#dataPublicacao = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#valor = value;
    }

    get usuarioId() {
        return this.#usuarioId;
    }
    set usuarioId(value) {
        this.#usuarioId = value;
    }

    get condicaoId() {
        return this.#condicaoId;
    }
    set condicaoId(value) {
        this.#condicaoId = value;
    }

    get situacaoId() {
        return this.#situacaoId;
    }
    set situacaoId(value) {
        this.#situacaoId = value;
    }

    get tipoId() {
        return this.#tipoId;
    }
    set tipoId(value) {
        this.#tipoId = value;
    }

    get cidadeId() {
        return this.#cidadeId;
    }
    set cidadeId(value) {
        this.#cidadeId = value;
    }

    toJson() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            numVisualizacao: this.#numVisualizacao,
            dataPublicacao: this.#dataPublicacao,
            valor: this.#valor,
            usuarioId: this.#usuarioId,
            condicaoId: this.#condicaoId,
            situacaoId: this.#situacaoId,
            tipoId: this.#tipoId,
            cidadeId: this.#cidadeId,
        };
    }
}
