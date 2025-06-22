import express from 'express';
import CidadeController from '../controllers/cidadeController.js';

const router = express.Router();
const ctrl = new CidadeController();

router.get('/cidades', (req,res) => {
    // #swagger.tags = ["Cidades"]
    // #swagger.summary = "End point para listar as cidades"
    ctrl.lista(req,res);
});

export default router;