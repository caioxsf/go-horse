import express from 'express';
import ModeloVeiculoController from '../controllers/modeloVeiculoController.js';

const router = express.Router();
const ctrl = new ModeloVeiculoController();

router.get('/modelo-veiculos', (req,res) => {
    // #swagger.tags = ["Modelo veiculos"]
    // #swagger.summary = "End point para listar os modelos dos veiculos"
    ctrl.lista(req,res);
});

export default router;