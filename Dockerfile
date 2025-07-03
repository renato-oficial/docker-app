# Build stage
FROM node:18.18.2-alpine AS builder


WORKDIR /app

# Passar a variável como argumento de build
ENV NEXT_TELEMETRY_DISABLED=1
ARG QSTASH_CURRENT_SIGNING_KEY
ENV QSTASH_CURRENT_SIGNING_KEY $QSTASH_CURRENT_SIGNING_KEY
ARG QSTASH_NEXT_SIGNING_KEY
ENV QSTASH_NEXT_SIGNING_KEY $QSTASH_NEXT_SIGNING_KEY

# Instala dependência
COPY package*.json ./
RUN npm ci --include=dev


# Copia o restante do projeto e faz o build
COPY . .

# Faz o build do Next.js
RUN npm run build

# Production state
FROM node:18.18.2-alpine
WORKDIR /app

# Copia arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package.json ./package-lock.json
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/next.config.ts ./next.config.ts

# Instala apenas dependências de produção
RUN npm ci --only=production

# Inicia o app
CMD ["npx", "pm2-runtime", "ecosystem.config.js"]

