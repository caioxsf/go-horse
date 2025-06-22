import ClassificadoRepository from "../repositories/classificadoRepository.js";
import SalvoRepository from "../repositories/salvoRepository.js"

export default class SalvarController {

    #repoSalvo 
    constructor () {
        this.#repoSalvo = new SalvoRepository();
    }

    async salvarClassificado (req,res) {
        let {id} = req.params;
        let data = new Date();
        let repoClassificado = new ClassificadoRepository();
        let classificado = await repoClassificado.obterClassificadoCompleto(id)
        if(classificado.length > 0) {
            if(await repoClassificado.verificarClassificadoDoUsuario(id, req.usuarioLogado.id) == false) {
                if(await repoClassificado.verificarClassificadoJaSalvo(id, req.usuarioLogado.id) == false) {
                    if(await this.#repoSalvo.salvarClassificado(data, req.usuarioLogado.id, id)) {
                        await repoClassificado.acrescentarVisualizacao(id);
                        return res.status(201).json({msg: "Classificado salvo com sucesso!"})
                    }
                        
                    else
                        throw new Error ("Erro ao salvar classificado no banco de dados!")
                } else
                    return res.status(400).json({msg: "Esse classificado já foi salvo!"})
                
            } else
                return res.status(400).json({msg: "Esse classificado pertence a você!"})
            
        } else
            return res.status(404).json({msg: "Classificado não encontrado!"})
    }

    async meusSalvos (req,res) {
        let usuarioId = req.usuarioLogado.id;
        let resultado = await this.#repoSalvo.meusSalvos(usuarioId);
        if(resultado != null)
            return res.status(200).json(resultado);
        else
            return res.status(404).json({msg: "Nenhum classificado salvo!"})
    }

    async deletarClassificadoSalvo (req,res) {
        let {id} = req.params;
        let usuarioId = req.usuarioLogado.id;
        let repoClassificado = new ClassificadoRepository();
        let classificado = await repoClassificado.obterClassificadoCompleto(id)
        if(classificado.length > 0) {
            if(await this.#repoSalvo.obterClassificadoSalvo(id, usuarioId) != null) {
                if(await this.#repoSalvo.deletarClassificadoSalvo(id, usuarioId)) {
                    return res.status(200).json({msg: "Classificado deletado com sucesso!"})
                } else
                    throw new Error ("Erro ao deletar classificado no banco de dados!")
            } else
                return res.status(404).json({msg: "Classificado não encontrado!"})
        } else
            return res.status(404).json({msg: "Classificado não encontrado!"})
    }
}