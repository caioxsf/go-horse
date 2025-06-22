import express from 'express';
import CategoriaItemController from '../controllers/categoriaItemController.js';


const router = express.Router();
const ctrl = new CategoriaItemController();

router.get('/categoria-items-list', (req,res) => {
    // #swagger.tags = ["Categoria"]
    // #swagger.summary = "End point para listar a categoria item"
    ctrl.lista(req,res);
});

export default router;