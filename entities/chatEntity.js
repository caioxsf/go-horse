import BaseEntity from "./BaseEntity.js";

export default class ChatEntity extends BaseEntity{
    #sala_id;
    #user_vendedor;
    #user_comprador;
    #data;
    #classifi_id;

    constructor(sala_id, user_vendedor, user_comprador, data, classifi_id) {
        super();
        this.#sala_id = sala_id;
        this.#user_vendedor = user_vendedor;
        this.#user_comprador = user_comprador;
        this.#data = data;
        this.#classifi_id = classifi_id;
        
    }

 
    get sala_id() {
        return this.#sala_id;
    }
    get user_vendedor() {
        return this.#user_vendedor;
    }
    get user_comprador() {
        return this.#user_comprador;
    }
    get data() {
        return this.#data;
    }
    get classifi_id() {
        return this.#classifi_id;
    }

 
    set sala_id(value) {
        this.#sala_id = value;
    }
    set user_vendedor(value) {
        this.#user_vendedor = value;
    }
    set user_comprador(value) {
        this.#user_comprador = value;
    }
    set data(value) {
        this.#data = value;
    }
    set classifi_id(value) {
        this.#classifi_id = value;
    }
}
