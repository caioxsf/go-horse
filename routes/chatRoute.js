import e from "express";
import ChatController from "../controllers/chatController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();
const ctrl = new ChatController();
let auth = new AuthMiddleware();

router.post('/chat/msgs', (req, res) =>{
    ctrl.obterMensagens(req, res);
});

router.post('/chat/room', (req, res) => {
    ctrl.getRoom(req, res);
})

router.get('/chat/mensagens-recebidas', auth.validar, (req,res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    // #swagger.tags = ["Chat"]
    // #swagger.summary = "End point para listar os chat em aberto "
    ctrl.mensagensRecebidas(req,res)
})

export default router