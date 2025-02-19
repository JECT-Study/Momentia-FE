# 1️⃣ Node.js 20 기반의 공식 이미지 사용
FROM node:20 AS builder

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ 패키지 파일 먼저 복사 (캐싱 최적화)
COPY package.json pnpm-lock.yaml .npmrc* ./

# 4️⃣ 로컬과 동일한 pnpm 버전(9.14.4) 고정 설치
RUN npm install -g pnpm@9.14.4

# 5️⃣ 의존성 설치 (생산 환경을 고려해 --frozen-lockfile 사용)
RUN pnpm install --frozen-lockfile

# 6️⃣ 모든 프로젝트 파일 복사
COPY . .

# 7️⃣ Next.js 빌드 실행
RUN pnpm run build

# 8️⃣ 실제 실행용 스테이지 (멀티스테이지 빌드)
FROM node:20 AS runner
WORKDIR /app

# 9️⃣ 로컬과 동일한 pnpm 버전(9.14.4) 고정 설치
RUN npm install -g pnpm@9.14.4

# 🔟 빌드된 파일과 node_modules 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./


# ⓫ 포트 설정
EXPOSE 3000

# ⓬ 애플리케이션 실행
CMD ["pnpm", "run", "start"]
