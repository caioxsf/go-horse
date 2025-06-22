import CategoriaItemRepository from "../repositories/categoriaItemRepository.js"

export default class CategoriaItemController {

    #categoriaItemRepository

    constructor(){
        this.#categoriaItemRepository = new CategoriaItemRepository();
    }

    async lista(req, res){
        const categorias = await this.#categoriaItemRepository.listar();

        if(categorias.length <= 0){
            return res.status(404).json({msg:'Categorias nao encontradas'})
        }

        return res.status(200).json({
            msg:"Success",
            itens: categorias
        })
    }
}