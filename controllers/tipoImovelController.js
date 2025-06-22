
import tipoImovelRepository from "../repositories/tipoImovelRepository.js";

export default class TipoImovelController {

    #tipoImovelRepository

    constructor(){
        this.#tipoImovelRepository = new tipoImovelRepository()
    }

    async lista(req, res){
        const tipoImovel = await this.#tipoImovelRepository.listar();

        if(tipoImovel.length <= 0){
            return res.status(404).json({msg:'Tipo dos imoveis não encontradas'})
        }

        return res.status(200).json(tipoImovel)
    }
}