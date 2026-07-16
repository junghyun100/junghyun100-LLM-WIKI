---
title: '시작하기'
description: 'LLM Wiki 개발 워크플로, 콘텐츠 구조, 배포 절차'
---

# 시작하기

LLM Wiki 개발 및 운영 가이드입니다.

---

## 개발 워크플로

### 1. 로컬 개발 서버 실행

```bash
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 시작 (localhost:4321)
npm run dev
```

### 2. 콘텐츠 추가/수정

```
src/content/docs/ko/
├── index.md              # 전체 카탈로그 (자동/수동 갱신)
├── getting-started.md    # 이 문서
├── wiki-structure.md     # 3계층 아키텍처 설명
├── workflow.md           # Ingest/Query/Lint 워크플로
├── log.md                # 변경 로그 (연대기)
├── wiki/                 # 위키 페이지 (LLM 관리)
│   ├── entities/         # 모델, 논문, 도구, 인물, 조직
│   ├── concepts/         # 핵심 원리/메커니즘
│   ├── synthesis/        # 다중 소스 종합 분석
│   └── comparisons/      # 정량/정성 비교표
├── schema/
│   └── CLAUDE.md         # LLM 운영 계약서
└── sources/              # 원본 소스 아카이브 (불변)
```

### 3. 프론트매터 필수 필드

모든 위키 페이지(`wiki/**/*.md`):

```yaml
---
title: '페이지 제목'
description: '한 줄 요약 (검색/SEO용, 160자 이내)'
type: 'entity | concept | synthesis | comparison'
entity_type: 'model | paper | tool | person | organization'  # type=entity일 때만
sources: ['src-001', 'src-005']  # 참조 소스 ID 배열
tags: ['tag1', 'tag2']  # 소문자, 하이픈 구분
last_updated: 'YYYY-MM-DD'  # LLM 최종 갱신일
confidence: 'high | medium | low'  # 정보 신뢰도
---
```

### 4. 사이드바 등록

`astro.config.mjs`의 `sidebar` 배열에 추가:

```js
{
  label: '새 카테고리',
  items: [
    { label: '페이지 제목', slug: 'wiki/entities/page-slug' },
    // 또는 자동 생성:
    { autogenerate: { directory: 'wiki/entities' } }
  ]
}
```

### 5. 로컬 확인

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 검증
npm run preview  # 빌드 결과 프리뷰
```

---

## 콘텐츠 작성 가이드

### 파일 명명
- `kebab-case.md` (소문자, 하이픈)
- 엔티티: `wiki/entities/gpt-4.md`
- 개념: `wiki/concepts/attention-mechanism.md`
- 합성: `wiki/synthesis/llm-scaling-laws.md`
- 비교: `wiki/comparisons/rag-vs-finetuning.md`

### 내부 링크
```markdown
# 위키 페이지 참조
[[GPT-4]]                    # 제목 기반
[GPT-4 상세](../wiki/entities/gpt-4.md)  # 상대 경로

# 소스 참조
[src-001](../sources/src-001-attention-is-all-you-need.md)
```

### 태그 컨벤션
- 소문자, 하이픈: `multi-modal`, `open-source`, `foundational`
- 도메인: `architecture`, `training`, `inference`, `evaluation`
- 출처: `paper`, `blog`, `doc`, `code`

---

## 배포

### GitHub Pages 자동 배포

```bash
# main 브랜치 푸시 시 자동 배포
git push origin main
```

**워크플로**: `.github/workflows/deploy.yml`
1. Node 20 환경에서 `npm ci` → `npm run build`
2. `dist/` 디렉토리를 GitHub Pages 아티팩트로 업로드
3. `github-pages` 환경에 배포

**URL**: `https://junghyun100.github.io/junghyun100-LLM-WIKI/`

### 수동 배포 (필요 시)

```bash
npm run build
# dist/ 폴더 내용을 정적 호스팅에 업로드
```

---

## LLM 협업 워크플로

### Ingest 요청 예시
```
다음 소스를 ingest해줘:
- 파일: sources/src-006-rag-paper.md
- 위키 스키마: schema/CLAUDE.md 참고
```

### Query 요청 예시
```
위키 기반으로 답변해줘:
"RAG에서 청킹 전략별 장단점 비교"
- index.md로 관련 페이지 탐색
- 위키 내용만 사용 (외부 지식 금지)
- 인용 필수: [[페이지]] 또는 [src-XXX]
```

### Lint 요청 예시
```
전체 위키 lint 실행:
1. 모순 탐지
2. 오래된 주장 (6개월 초과)
3. 고아 페이지
4. 메타데이터 누락
5. confidence: low 페이지
결과를 log.md에 append하고 Critical/High 이슈 보고
```

---

## 유용한 명령어

```bash
# 타입 체크
npx astro check

# 콘텐츠 싱크 확인
npx astro sync

# 의존성 업데이트
npm update

# 빌드 캐시 클리어
rm -rf dist node_modules/.cache && npm install
```

---

## 문제 해결

| 문제 | 해결 |
|------|------|
| 빌드 시 슬러그 에러 | `astro.config.mjs` sidebar slug와 실제 파일 경로 일치 확인 |
| 프론트매터 검증 실패 | 필수 필드(`title`, `description`, `type` 등) 모두 포함 확인 |
| 사이드바에 안 보임 | `autogenerate.directory` 경로가 `ko/` 하위인지 확인 |
| 한글 깨짐 | 파일 인코딩 UTF-8 확인, `lang: ko-KR` 설정 확인 |

---

## 다음 단계

1. `wiki-structure.md` — 3계층 아키텍처 상세 이해
2. `workflow.md` — Ingest/Query/Lint 절차 숙지
3. `schema/CLAUDE.md` — LLM 운영 계약서 (템플릿, 규칙)
4. `src/templates/` — 페이지 생성용 템플릿 4종