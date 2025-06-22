import BaseEntity from "./BaseEntity.js";

export default class MensagemEntity extends BaseEntity {
    #id;
    #texto;
    #remetente;
    #destinatario;
    #data;
    #classificado_id;

    constructor(id, texto, remetente, destinatario, data, classificado_id) {
        super();
        this.#id = id;
        this.#texto = texto;
        this.#remetente = remetente;
        this.#destinatario = destinatario;
        this.#data = data;
        this.#classificado_id = classificado_id;
    }

    
    get id() {
        return this.#id;
    }
    get texto() {
        return this.#texto;
    }
    get remetente() {
        return this.#remetente;
    }
    get destinatario() {
        return this.#destinatario;
    }
    get data() {
        return this.#data;
    }
    get classificado_id() {
        return this.#classificado_id;
    }

   
    set id(value) {
        this.#id = value;
    }
    set texto(value) {
        this.#texto = value;
    }
    set remetente(value) {
        this.#remetente = value;
    }
    set destinatario(value) {
        this.#destinatario = value;
    }
    set data(value) {
        this.#data = value;
    }
    set classificado_id(value) {
        this.#classificado_id = value;
    }
}
