# Шаг 1: Базовый образ с PNPM
FROM node:22-alpine AS base

# Устанавливаем PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Копируем файлы для кэширования зависимостей
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./package.json ./
COPY packages/render-core/package.json ./packages/render-core/package.json
COPY packages/render-react/package.json ./packages/render-react/package.json
COPY packages/definition/package.json ./packages/definition/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY apps/web-next/package.json ./apps/web-next/package.json

# Ставим зависимости (включая dev для сборки)
RUN pnpm install --frozen-lockfile


# Шаг 2: Сборка всего монорепозитория
FROM base AS builder
WORKDIR /app

# Копируем ВЕСЬ монорепозиторий
COPY . .



# Собираем весь проект (включая web-next)
RUN pnpm build

# Шаг 3: Продакшен-образ (только Next.js из /apps/web-next)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production


# 1. Локальные пакеты (из их dist-папок)

#
## Вариант A: Если используется standalone-режим (output: 'standalone' в next.config.js)
COPY --from=builder /app/apps/web-next/.next/standalone/apps/web-next ./
COPY --from=builder /app/apps/web-next/.next/static ./.next/static
#COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/packages/render-core/dist ./packages/render-core/dist
COPY --from=builder /app/packages/render-react/dist ./packages/render-react/dist
COPY --from=builder /app/packages/definition/dist ./packages/definition/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist



#
## Вариант B: Если НЕ standalone

#
EXPOSE 3000

RUN ls -la

#
## Для standalone:
CMD ["node", "server.js"]
## Для обычного режима:
#CMD ["pnpm", "--filter", "@fragments/web-next", "start"]
