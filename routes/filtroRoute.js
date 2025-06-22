import express from 'express';
import FiltoController from '../controllers/filtroController.js';
const router = express.Router();

let ctrl = new FiltoController();

router.get('/filtros' , (req, res) => {
    /* 
    #swagger.parameters['cidade'] = {
        in: 'query',
        description: 'Nome da cidade',
        required: false,
        type: 'number'
    }
    #swagger.parameters['tipoClassificado'] = {
        in: 'query',
        description: 'tipo do classificado',
        required: false,
        type: 'number'
    }
    #swagger.parameters['condicao'] = {
        in: 'query',
        description: 'Condição do classificado',
        required: false,
        type: 'number'
    }
    #swagger.parameters['ordenarData'] = {
        in: 'query',
        description: 'Ordenar por data',
        required: false,
        type: 'boolean'
    }
    #swagger.parameters['precoMinimo'] = {
        in: 'query',
        description: 'Valor mínimo do classificado',
        required: false,
        type: 'number'
    }
        #swagger.parameters['precoMaximo'] = {
        in: 'query',
        description: 'Valor máximo do classificado',
        required: false,
        type: 'number'
    }
    */
    
    ctrl.filtrarClassificados(req, res);
})

export default router;