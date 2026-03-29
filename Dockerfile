# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm ci

# Копируем весь код
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Копируем только необходимое
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Создаём директорию для SQLite базы
RUN mkdir -p /app/data

EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]