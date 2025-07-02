# Build stage
FROM node:18.18.2-alpine AS builder


WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG QSTASH_CURRENT_SIGNING_KEY
ENV QSTASH_CURRENT_SIGNING_KEY $QSTASH_CURRENT_SIGNING_KEY

# Instala dependência
COPY package*.json ./
RUN npm install

# Copia o restante do projeto e faz o build
COPY . .
RUN npm run build

# Production state
FROM node:18.18.2-alpine
WORKDIR /app

# Copia arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Inicia o app
CMD ["npm", "start"]
