# Build stage
FROM node:18.18.2-alpine AS builder


WORKDIR /app

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
COPY --from=builder /app/.env.local ./.env.local

# Define o ambiente de produção
ENV NODE_ENV=production
ENV PORT=3000

# Inicia o app
CMD ["npm", "start"]
