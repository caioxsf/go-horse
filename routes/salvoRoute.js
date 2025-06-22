import express from "express";
import SalvarController from "../controllers/salvoController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

let ctrl = new SalvarController();
let auth = new AuthMiddleware();


router.get("/meus-salvos", auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Salvo']
    // #swagger.summary = "End point para o usuario obter os classificados salvos"
    ctrl.meusSalvos(req,res);
})

router.post("/salvo/:id", auth.validar, (req,res) => {
    /* #swagger.security = [{
       "bearerAuth": []
   }] */
   // #swagger.tags = ['Salvo']
   // #swagger.summary = "End point para o usuario salvar um classificado"
   ctrl.salvarClassificado(req,res);
})

router.delete("/deletar-salvo/:id", auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ['Salvo']
    // #swagger.summary = "End point para o usuario deletar um classificado salvo"
    ctrl.deletarClassificadoSalvo(req,res);
})




export default router;