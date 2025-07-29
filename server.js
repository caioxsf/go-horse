import express from "express";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import cors from "cors";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import http from "http";
import { errorHandler, catchError } from "./middlewares/ExceptionMiddleware.js";
import { Server } from "socket.io";
dotenv.config();
import socketInit from './sockets/socket.js';
require('dotenv').config()


// NÃO ESQUECER DE INCLUIR A ROTA NO SWAGGER.JS
import classficadosRoute from "./routes/classificadoRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";
import categoriaItemRouter from "./routes/categoriaItemRoute.js";
import authRoute from "./routes/authRoute.js";
import salvoRoute from "./routes/salvoRoute.js";
import filtroRoute from "./routes/filtroRoute.js";
import condicaoRoute from './routes/condicaoRoute.js'
import tipoImovelRoute from './routes/tipoImovelRoute.js'
import TipoClassificadoRoute from './routes/tipoClassificadoRoute.js'
import ModeloVeiculoRoute from './routes/modeloVeiculoRoute.js'
import CidadeRoute from './routes/cidadeRoute.js'
import chatRoute from './routes/chatRoute.js'

const app = express();

app.use(cors({
  origin: 'https://projetos-go-horse-client.lp3jkk.easypanel.host', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true
}));

app.options('*', cors({
  origin: 'https://projetos-go-horse-client.lp3jkk.easypanel.host',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true
}));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://projetos-go-horse-client.lp3jkk.easypanel.host",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true
  },
});

socketInit(io)

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/", catchError(categoriaItemRouter));


app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
app.use("/", catchError(classficadosRoute));
app.use("/", catchError(usuarioRoute));
app.use("/", catchError(authRoute));
app.use("/", catchError(salvoRoute));
app.use("/", catchError(filtroRoute));
app.use("/", catchError(condicaoRoute));
app.use("/", catchError(tipoImovelRoute));
app.use("/", catchError(TipoClassificadoRoute));
app.use("/", catchError(ModeloVeiculoRoute));
app.use("/", catchError(CidadeRoute));
app.use("/", catchError(chatRoute));


app.use(errorHandler);


server.listen(5001, function () {
  console.log("backend em execução e iniciado.");

});
