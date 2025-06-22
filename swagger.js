import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API RESTful",
  },
  host: "localhost:5001",
  components: {
    schemas: {
      classificado_teste: {
        "id": 1,
        "titulo": "Xbox 360",
        "descricao": "Video game para jogar jogos",
        "valor": 10.50,
        "condicaoId": {
          "id": 1
        },
        "situacaoId": {
          "id": 1
        },
        "tipoId": {
          "id": 1
        },
        "cidadeId": {
          "id": 1
        },
        "quartos": 1,
        "banheiros": 1,
        "metros_quadrados": 20,
        "tipo_imovel": 1
      },
      classificado_atualizar: {
        "id": 1,
        "titulo": "Xbox 360",
        "descricao": "Video game para jogar jogos",
        "valor": 10.50,
        "condicaoId": 1,
        "situacaoId": 1,
        "tipoId": 1,
        "cidadeId": 1,
        "quartos": 1,
        "banheiros": 1,
        "metros_quadrados": 20,
        "tipo_imovel": 1,
        "ano": 2015,
        "kilometragem": 129000,
        "modeloId": 233,
        "categoriaId": 1,
      },
      filtros: {
        cidade: 254,
        tipoClassificado: 1,
        condicao: 1,
        ordenarData: true,
        ordenarPreco: true,
      }
    },
    '@schemas': {
      classificados: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
            required: false,
          },
          titulo: {
            type: "string",
            required: true,
          },
          descricao: {
            type: "string",
            required: true,
          },
          valor: {
            type: "number",
            required: true,
          },
          condicaoId: {
            type: "integer",
            required: true,
          },
          situacaoId: {
            type: "integer",
            required: true,
          },
          tipoId: {
            type: "integer",
            required: true,
          },
          cidadeId: {
            type: "integer",
            required: true,
          },
          quartos: {
            type: "integer",
            required: false,
          },
          banheiros: {
            type: "integer",
            required: false,
          },
          metros_quadrados: {
            type: "integer",
            required: false,
          },
          tipo_imovel: {
            type: "integer",
            required: false,
          },
          ano: {
            type: "integer",
            required: false,
          },
          kilometragem: {
            type: "integer",
            required: false,
          },
          modeloId: {
            type: "integer",
            required: false,
          },
          categoriaId: {
            type: "integer",
            required: true,
          },
          imagens: {
            type: "array",
            items: {
              type: "string",
              format: "binary"
            },
            required: false,
          }
        },
      },
    },
    
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputJson = "./swagger-output.json";

const routes = [
  "./routes/authRoute.js",
  "./routes/usuarioRoute.js",
  "./routes/classificadoRoute.js",
  "./routes/categoriaItemRoute.js",
  "./routes/salvoRoute.js",
  "./routes/filtroRoute.js",
  "./routes/condicaoRoute.js",
  "./routes/tipoImovelRoute.js",
  './routes/tipoClassificadoRoute.js',
  './routes/modeloVeiculoRoute.js',
  './routes/cidadeRoute.js',
  './routes/chatRoute.js'
];

swaggerAutogen({ openapi: "3.0.0", autoHeaders: false })(
  outputJson,
  routes,
  doc
).then(async () => {
  await import("./server.js");
});
