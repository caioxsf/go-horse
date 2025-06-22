import express from 'express';
import CondicaoController from '../controllers/condicaoController.js';

const router = express.Router();
const ctrl = new CondicaoController();

router.get('/condicao', (req,res) => {
    // #swagger.tags = ["Condicões"]
    // #swagger.summary = "End point para listar as condições"
    ctrl.lista(req,res);
});

export default router;