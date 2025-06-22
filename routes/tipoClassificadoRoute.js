import express from 'express';
import tipoClassificadoController from '../controllers/tipoClassificadoController.js';

const router = express.Router();
const ctrl = new tipoClassificadoController();

router.get('/tipo-classificado', (req,res) => {
    // #swagger.tags = ["Tipo Classificado"]
    // #swagger.summary = "End point para listar os tipos de classificados"
    ctrl.lista(req,res);
});

export default router;