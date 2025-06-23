# Etapa 1: Imagem base
FROM node:18

# Etapa 2: Diretório de trabalho
WORKDIR /app

# Etapa 3: Copiar package.json e package-lock.json
COPY package*.json ./

# Etapa 4: Instalar dependências (inclui opcionais - importante para sharp)
RUN npm install --include=optional --legacy-peer-deps

# Etapa 5: Copiar o restante da aplicação
COPY . .

# Etapa 6: Expor a porta usada pelo app
EXPOSE 5001

# Etapa 7: Comando para rodar o servidor
CMD ["node", "swagger.js"]