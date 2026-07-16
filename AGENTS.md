# LLM Wiki — 프로젝트 운영 지침

> 이 파일은 **이 프로젝트 전용** AGENTS.md입니다. 글로벌 `~/.claude/CLAUDE.md`와 함께 로드됩니다.

---

## 작업 규모에 따른 모델/에이전트 분담 원칙

| 작업 유형 | 모델 | 방식 |
|-----------|------|------|
| **설계/아키텍처/검증** | **Fable (이 모델)** | 메인 컨텍스트에서 직접 수행 |
| **구현/코딩/리팩토링** | **Sonnet (서브에이전트)** | `Agent` 도구로 위임 |

### 판단 기준
- **Fable 담당**: 새로운 기능 설계, 아키텍처 결정, 코드 리뷰, 버그 진단, 스펙 작성, 기술 선택
- **Sonnet 담당**: 파일 생성/수정, 보일러플레이트, 리팩토링 적용, 테스트 작성, 단순 버그 수정

### 위임 패턴
```
사용자 요청
    │
    ▼
[Fable] 작업 분석 & 설계
    │
    ├─▶ 단순/명확한 구현 → Sonnet 서브에이전트 위임
    │
    └─▶ 복잡/모호/아키텍처 영향 → Fable이 직접 구현 or 단계별 위임
```

---

## 서브에이전트 호출 템플릿

```javascript
// 구현 위임 시
await Agent({
  subagent_type: "general-purpose",
  description: "기능 구현: XXX",
  prompt: `다음 스펙을 구현하세요:
[여기에 Fable이 작성한 상세 스펙]

제약사항:
- 기존 코드 스타일 준수
- 타입스크립트 strict 모드
- 테스트 가능한 구조
- 불필요한 주석 금지
`
});
```

---

## 이 프로젝트별 규칙

### 기술 스택
- **Astro + Starlight** (정적 사이트 생성)
- **TypeScript strict** 모드
- **npm** 패키지 매니저
- **GitHub Pages** 배포 (`.github/workflows/deploy.yml`)

### 코드 스타일
- `const` 기본, 재할당 필요 시 `let`
- 화살표 함수 우선
- 타입 추론 활용, 명시적 타입은 필요할 때만
- `any` 금지, `unknown` 활용
- JSDoc 대신 타입으로 문서화

### 커밋 컨벤션
```
type(scope): description

feat: 새 기능
fix: 버그 수정
refactor: 리팩토링
docs: 문서
chore: 설정/빌드
```

### 개발 워크플로
1. `npm run dev`로 로컬 확인
2. `npm run build`로 빌드 검증
3. `npm run preview`로 프로덕션 프리뷰
4. 커밋 → 푸시 → GitHub Actions 자동 배포

---

## 위키 콘텐츠 구조 (3계층)

```
src/content/docs/
├── ko/              # 한국어 콘텐츠
│   ├── index.md
│   ├── getting-started.md
│   ├── wiki-structure.md
│   ├── workflow.md
│   ├── log.md
│   ├── wiki/        # 위키 페이지 (LLM 관리)
│   │   ├── entities/
│   │   └── concepts/
│   ├── schema/
│   │   └── CLAUDE.md    # LLM 운영 계약서
│   └── sources/         # 원본 소스 아카이브
├── en/              # 영어 콘텐츠 (향후)
├── wiki/            # 위키 페이지 (LLM 관리)
│   ├── entities/
│   └── concepts/
├── schema/
│   └── CLAUDE.md    # LLM 운영 계약서
└── sources/         # 원본 소스 아카이브
```

### Starlight 설정
- `astro.config.mjs` — 메인 설정 (사이드바, 로케일, 테마)
- `src/styles/custom.css` — 커스텀 스타일
- `public/logo-light.svg`, `logo-dark.svg` — 로고

---

## 금지 사항
- ❌ 이모티콘 사용 (사용자 요청)
- ❌ 기계적/반복적 문체 ("〜입니다", "〜합니다" 반복)
- ❌ 불필요한 주석 ("이 함수는 ~합니다")
- ❌ `any` 타입 사용
- ❌ 콘솔.log 남기기

---

## 유용한 명령어

```bash
# 개발
npm run dev          # 개발 서버 (백그라운드 권장)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 프리뷰
npx astro check      # 타입 체크

# 콘텐츠 추가
# 1. src/content/docs/ko/ 아래 .md 생성
# 2. astro.config.mjs 사이드바에 autogenerate 또는 items 추가
# 3. npm run dev로 확인

# 배포
git push origin main  # GitHub Actions가 자동 빌드/배포
```