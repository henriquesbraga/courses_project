# Imagem base leve para produção
FROM node:22

# Diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos necessários para o container
COPY package.json yarn.lock ./

# Instalar apenas as dependências de produção
RUN yarn install --production

# Copiar a build para o container
COPY dist/ ./dist

# Expor a porta do backend
EXPOSE 4000

# Comando para executar o backend
CMD ["node", "dist/index.js"]
