
import tipoClassificadoRepository from "../repositories/tipoClassificadoRepository.js";

export default class TipoClassificadoController {

    #tipoClassificadoRepository

    constructor(){
        this.#tipoClassificadoRepository = new tipoClassificadoRepository()
    }

    async lista(req, res){
        const tipoClassificado = await this.#tipoClassificadoRepository.listar();

        if(tipoClassificado.length <= 0){
            return res.status(404).json({msg:'Tipo dos classificados não encontradas'})
        }

        return res.status(200).json(tipoClassificado)
    }
}