import express from 'express';
import TipoImovelController from '../controllers/tipoImovelController.js';

const router = express.Router();
const ctrl = new TipoImovelController();

router.get('/tipo-imovel', (req,res) => {
    // #swagger.tags = ["Tipo Imovel"]
    // #swagger.summary = "End point para listar os tipos de imoveis"
    ctrl.lista(req,res);
});

export default router;