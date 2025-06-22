import CidadeRepository from "../repositories/cidadeRepository.js";

export default class CondicaoController {

    #CidadeRepository

    constructor(){
        this.#CidadeRepository = new CidadeRepository();
    }

    async lista(req, res){
        const cidade = await this.#CidadeRepository.listar();

        if(cidade.length <= 0){
            return res.status(404).json({msg:'Cidades nao encontradas'})
        }

        return res.status(200).json(cidade)
    }
}