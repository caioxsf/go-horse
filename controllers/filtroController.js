import FiltroRepository from "../repositories/filtroRepository.js"

export default class FiltoController {

    #filtroRepo
    constructor () {
        this.#filtroRepo = new FiltroRepository();
    }

    async filtrarClassificados (req,res) {
        let {cidade, tipoClassificado, condicao, ordenarData, precoMinimo, precoMaximo} = req.query;
        let resultado = await this.#filtroRepo.filtrarClassificados(cidade, tipoClassificado, condicao, ordenarData, precoMinimo, precoMaximo);
        if(resultado) {
            res.status(200).json( resultado);
        } else {
            res.status(404).json({ msg: "Nenhum classificado encontrado!"});
        }
    }
    
}