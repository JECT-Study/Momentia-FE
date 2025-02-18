# 1️⃣ Node.js 20 기반의 공식 이미지 사용
FROM node:20 AS builder

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ Next.js 환경 변수 설정을 위해 ARG 사용
ARG NEXT_PUBLIC_KAKAO_API_KEY
ARG NEXT_PUBLIC_KAKAO_REDIRECT_PATH
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_PRIVATE_API_KEY
ARG NEXT_PUBLIC_GOOGLE_REDIRECT_PATH
ARG NEXT_PUBLIC_API_BASE_URL

# 4️⃣ 환경 변수를 Dockerfile 내부에서도 유지
ENV NEXT_PUBLIC_KAKAO_API_KEY=$NEXT_PUBLIC_KAKAO_API_KEY
ENV NEXT_PUBLIC_KAKAO_REDIRECT_PATH=$NEXT_PUBLIC_KAKAO_REDIRECT_PATH
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_PRIVATE_API_KEY=$NEXT_PUBLIC_GOOGLE_PRIVATE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_REDIRECT_PATH=$NEXT_PUBLIC_GOOGLE_REDIRECT_PATH
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# 5️⃣ 필요 파일 먼저 복사 (캐싱 최적화)
COPY package.json pnpm-lock.yaml .npmrc* ./

# 6️⃣ 로컬과 동일한 pnpm 버전(9.14.4) 고정 설치
RUN npm install -g pnpm@9.14.4

# 7️⃣ 의존성 설치 (생산 환경을 고려해 --frozen-lockfile 사용)
RUN pnpm install --frozen-lockfile

# 8️⃣ 모든 프로젝트 파일 복사
COPY . .

# 9️⃣ Next.js 빌드 실행
RUN pnpm run build

# 🔟 실제 실행용 스테이지 (멀티스테이지 빌드)
FROM node:20 AS runner
WORKDIR /app

# ⓫ 로컬과 동일한 pnpm 버전(9.14.4) 고정 설치
RUN npm install -g pnpm@9.14.4

# ⓬ 빌드된 파일과 node_modules 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# ⓭ 포트 설정
EXPOSE 3000

# ⓮ 애플리케이션 실행
CMD ["pnpm", "start"]
