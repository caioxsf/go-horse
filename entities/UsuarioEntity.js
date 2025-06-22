export default class UsuarioEntity {
    #id 
    #email
    #nome
    #senha
    #datacadastro

    constructor(id, email, nome, senha, datacadastro){
        this.#id = id;
        this.#email = email;
        this.#nome = nome;
        this.#senha = senha;
        this.#datacadastro = datacadastro;
    }

    get id(){
        return this.#id;
    }

    set id(value){
        this.#id = value;
    }

    get email(){
        return this.#email;
    }

    set email(value){
        this.#email = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#nome = value;
    }

    get senha(){
        return this.#senha;
    }

    set senha(value){
        this.#senha = value;
    }

    get datacadastro(){
        return this.#datacadastro;
    }

    set datacadastro(value){
        this.#datacadastro = value;
    }
}