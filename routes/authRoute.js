import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import AutenticacaoController from "../controllers/authController.js";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new AutenticacaoController();
let user = new UsuarioController();

router.post("/auth/token", (req, res) => {
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = "Gera um JWT para validação de acesso"

  ctrl.token(req, res);
});

router.get("/auth/perfil", auth.validar, (req,res) => {
   /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = "Lista as informações do perfil logado"

  user.perfil(req,res);
})

export default router;
