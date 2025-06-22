
import ModeloVeiculoRepository from "../repositories/modeloVeiculoRepository.js";

export default class ModeloVeiculoController {

    #modeloVeiculoRepository

    constructor(){
        this.#modeloVeiculoRepository = new ModeloVeiculoRepository()
    }

    async lista(req, res){
        const modeloVeiculo = await this.#modeloVeiculoRepository.listar();

        if(modeloVeiculo.length <= 0){
            return res.status(404).json({msg:'Modelo dos veiculos não encontrados!'})
        }

        return res.status(200).json(modeloVeiculo)
    }
}