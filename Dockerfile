# Etapa 1: Imagem base
FROM node:18

# Etapa 2: Diretório de trabalho
WORKDIR /app

# Etapa 3: Copiar package.json e package-lock.json
COPY package*.json . 

# Etapa 4: Instalar dependências
RUN npm install --legacy-peer-deps

# Etapa 5: Copiar o restante da aplicação
COPY . .

# Etapa 6: Expor a porta usada pela aplicação
EXPOSE 5001

# Etapa 7: Gerar Swagger e rodar o servidor
CMD npm run swagger && npm start