# Lightning Market

React 19.2.0 + Vite 7 + TypeScript + Tailwind CSS 4.1

## 기술 스택

- **React**: 19.2.0
- **Vite**: 7.3.1
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.18
- **Axios**: 1.13.5
- **패키지 매니저**: pnpm

## 설치

```bash
pnpm install
```

## 환경 설정

`.env.example` 파일을 참고하여 각 환경별 `.env` 파일을 설정하세요.

- `.env.development` - 개발 환경
- `.env.staging` - 스테이징 환경
- `.env.production` - 프로덕션 환경

## 실행

### 개발 서버 (Development)

```bash
pnpm dev
```

- `.env.development` 파일을 사용합니다.
- 개발 서버가 http://127.0.0.1:5174 에서 실행됩니다.

### 스테이징 빌드 (Staging)

```bash
pnpm stg
```

- `.env.staging` 파일을 사용합니다.
- `dist` 폴더에 빌드 결과물이 생성됩니다.

### 프로덕션 빌드 (Production)

```bash
pnpm prod
```

- `.env.production` 파일을 사용합니다.
- `dist` 폴더에 빌드 결과물이 생성됩니다.

## 기타 스크립트

### 일반 빌드

```bash
pnpm build
```

### 빌드 결과 미리보기

```bash
pnpm preview
```

## 프로젝트 구조

```
lightning-market/
├── src/
│   ├── lib/          # 유틸리티 및 설정
│   │   └── axios.ts  # Axios 인스턴스
│   ├── App.tsx       # 메인 앱 컴포넌트
│   ├── main.tsx      # 엔트리 포인트
│   ├── index.css     # Tailwind CSS
│   ├── env.d.ts      # 환경 변수 타입
│   └── vite-env.d.ts # Vite 타입
├── public/           # 정적 파일
├── .env.example      # 환경 변수 예시
└── vite.config.ts    # Vite 설정
```
