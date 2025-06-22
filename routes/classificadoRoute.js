import express from "express";
import ClassificadoController from "../controllers/classificadoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

let ctrl = new ClassificadoController();
let auth = new authMiddleware();
const upload = multer();

router.post("/classificados", auth.validar, upload.array("imagens", 5), (req, res) => {
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para cadastrar um classificado"
  /* #swagger.requestBody = {
          required: true,
          content: {
              "multipart/form-data": {
                  schema: {
                      $ref: "#/components/schemas/classificados"
                  }
              }
          }
      }

  */
  ctrl.cadastrarClassificadoItem(req, res);
}
);


router.put("/classificados", auth.validar, upload.array("imagens", 5), (req, res) => {
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para atualizar um classificado"
  /* #swagger.consumes = ["multipart/form-data"] */
  /* #swagger.requestBody = {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    $ref: "#/components/schemas/classificados"
                }
            }
        }
    }
  */
  ctrl.alterarClassificadoItem(req, res);
});

router.get("/classificados", (req, res) => {
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para listar todos os classificados"

  ctrl.listarClassificadoCompleto(req, res);
});


router.get("/classificados/busca", (req, res) => {
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para buscar classificados por nome"

  ctrl.buscarTermo(req, res);
});

router.get("/meus-classificados", auth.validar, (req, res) => {
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para listar os classificados do usuário"

  ctrl.meusClassificados(req, res);
});

router.get("/classificados/:id", (req, res) => {
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para obter um classificado pelo ID"

  ctrl.obterClassificado(req, res);
});

router.get("/classificados-ids/:id", (req, res) => {
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para listar todos os classificados com os IDS dos elementos"

  ctrl.listarClassificadoIds(req, res);
});

router.patch("/classificados/ativar/:id", auth.validar, (req, res) => {
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para ativar o classificado"

  ctrl.ativarClassificado(req, res);
});

router.patch("/classificados/pausar/:id", auth.validar, (req, res) => {
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para pausar o classificado"
  ctrl.pausarClassificado(req, res);
});

router.patch("/classificados/deletar/:id", auth.validar, (req, res) => {
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para deletar o classificado"
  ctrl.deletarClassificado(req, res);
});

router.patch('/classificados/vender/:id', auth.validar, (req, res) => {
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ["Classificados"]
  // #swagger.summary = "End point para vender o classificado"
  ctrl.venderClassificado(req, res);
})

router.get("/classificados/imagens/:id", (req, res) => {
  // #swagger.tags = ['Classificados']
  // #swagger.summary = "Lista as imagens de um determinado classificado"
  ctrl.imagens(req, res);
});

router.get("/classificados/usuarios-nome/:id1/:id2", (req,res) => {
  // #swagger.tags = ['Classificados']
  // #swagger.summary = "Lista as imagens de um determinado classificado"
  ctrl.obterNomeUsuarioPeloid(req,res);
});

router.delete("/classificados/imagens/:id", auth.validar, (req, res) => {
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  // #swagger.tags = ['Classificados']
  // #swagger.summary = "Deleta uma imagem de um classificado"
  ctrl.excluirImagensPorId(req, res)
});



export default router;
