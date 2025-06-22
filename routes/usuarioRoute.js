import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
const router = express.Router();

let ctrl = new UsuarioController();

router.post('/usuarios', (req,res) => {
    // #swagger.tags = ["Usuarios"]
    // #swagger.summary = "End point para criar um usuario"
    ctrl.create(req,res);
})


export default router;