# Step 1: 빌드 환경
FROM node:20-alpine AS builder
WORKDIR /app

# 패키지 설치 & 빌드
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# Step 2: 실행 환경 (경량화)
FROM node:20-alpine
WORKDIR /app

# 실행에 필요한 파일만 복사
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 컨테이너 실행
EXPOSE 3000
CMD ["pnpm", "run", "start"]
