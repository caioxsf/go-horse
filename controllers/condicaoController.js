import CondicaoRepository from "../repositories/CondicaoRepository.js";

export default class CondicaoController {

    #condicaoRepository

    constructor(){
        this.#condicaoRepository = new CondicaoRepository();
    }

    async lista(req, res){
        const condicao = await this.#condicaoRepository.listar();

        if(condicao.length <= 0){
            return res.status(404).json({msg:'Condicão nao encontradas'})
        }

        return res.status(200).json(condicao)
    }
}