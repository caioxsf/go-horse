import BaseEntity from "./BaseEntity.js";

export default class SalvoEntity extends BaseEntity {

    #id;
    #data;
    #usuarioId;
    #classificadoId;

    constructor(id, data, usuarioId, classificadoId) {
        super();
        this.#id = id;
        this.#data = data;
        this.#usuarioId = usuarioId;
        this.#classificadoId = classificadoId;
    }

    get id() { return this.#id; } set id(id) { this.#id = id; }
    get data() { return this.#data; } set data(data) { this.#data = data; }
    get usuarioId() { return this.#usuarioId; } set usuarioId(usuarioId) { this.#usuarioId = usuarioId; }
    get classificadoId() { return this.#classificadoId; } set classificadoId(classificadoId) { this.#classificadoId = classificadoId; }

}