# LLM Wiki — LLM이 유지관리하는 지속적 지식 베이스

> **원본 소스 → 위키 → 스키마 3계층 구조**로 LLM이 직접 문서를 수집·정제·구조화·검증하는 지식 베이스
> 
> Andrej Karpathy의 "Software 2.0" 패턴을 지식 베이스 운영에 적용

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Deploy to GitHub Pages](https://github.com/junghyun100/junghyun100-LLM-WIKI/actions/workflows/deploy.yml/badge.svg)](https://github.com/junghyun100/junghyun100-LLM-WIKI/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 프로젝트 개요

**LLM Wiki**는 Andrej Karpathy의 "Software 2.0" 패턴에서 영감을 받아 **"LLM이 직접 문서를 수집·정제·구조화·검증하는 지속 가능한 지식 베이스"**를 구축하는 프로젝트입니다.

### Karpathy 패턴 적용

> _"소프트웨어 2.0에서 프로그래머는 명시적 코드를 작성하는 대신, 데이터셋을 큐레이션하고 모델을 훈련시키며, 평가 지표를 정의한다."_ — Andrej Karpathy

이 프로젝트는 그 패턴을 **지식 베이스 운영**에 적용합니다:

| 전통적 위키 | LLM Wiki (이 프로젝트) |
|------------|------------------------|
| 인간이 직접 작성/수정 | LLM이 원본 논문/리포트 수집 → 위키 페이지 자동 생성/갱신 |
| 수동 검수·갱신 | 자동 Lint(Judge LLM) → 모순 탐지·해결 제안 → 인간 승인 |
| 정적 문서 | 원본 소스 → 위키 → 스키마 3계층 연결 구조 |
| 링크 끊김 방치 | 역링크·교차참조 자동 검증 (주간 Lint) |
| 버전 관리 부족 | 모든 변경 연대기 로그(`log.md`) + Git 이력 |

---

## 🚀 빠른 시작

### 필수 요구사항
- **Node.js 20+**
- **npm 10+**

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/junghyun100/junghyun100-LLM-WIKI.git
cd junghyun100-LLM-WIKI

# 2. 의존성 설치
npm ci

# 3. 개발 서버 실행 (localhost:4321)
npm run dev
# → http://localhost:4321/junghyun100-LLM-WIKI/

# 4. 프로덕션 빌드 검증
npm run build
# → ./dist 폴더 생성

# 5. 빌드 결과 프리뷰
npm run preview
```

### 기타 유용한 명령어

```bash
# 타입 체크 (Astro 내장)
npx astro check

# 콘텐츠 싱크 확인
npx astro sync

# 의존성 업데이트
npm update

# 빌드 캐시 클리어 후 재설치
rm -rf dist node_modules/.cache && npm install

# Astro CLI 직접 실행
npx astro --help
```

---

## 📁 프로젝트 구조

```
junghyun100-LLM-WIKI/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages 자동 배포 워크플로
├── .vscode/
│   └── settings.json               # 에디터 설정 (포맷터, TS 설정 등)
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── logo-light.svg          # 라이트 모드 로고
│   │   └── logo-dark.svg           # 다크 모드 로고
│   ├── content/
│   │   ├── config.ts               # Starlight 컬렉션 설정 (스키마 정의)
│   │   └── docs/                   # 📂 문서 콘텐츠 (Starlight 컬렉션)
│   │       ├── en/                 # (예정) 영어 콘텐츠
│   │       └── ko/                 # 🇰🇷 한국어 콘텐츠 (현재 주력)
│   │           ├── getting-started.md     # 시작 가이드
│   │           ├── index.md               # 위키 전체 인덱스 (자동 갱신)
│   │           ├── log.md                 # 변경 로그 (날짜순, LLM 작성)
│   │           ├── wiki-structure.md      # 3계층 구조 설명서
│   │           ├── workflow.md            # 운영 워크플로 (Ingest/Query/Lint)
│   │           ├── tools.md               # 도구 & 템플릿 개요
│   │           ├── schema/
│   │           │   └── CLAUDE.md          # 📂 3계층: LLM 운영 계약서
│   │           ├── sources/               # 📂 1계층: 원본 소스 아카이브 (읽기 전용)
│   │           │   ├── index.md
│   │           │   ├── src-001-attention-is-all-you-need.md
│   │           │   ├── src-002-gpt-4-technical-report.md
│   │           │   ├── src-003-scaling-laws-for-neural-language-models.md
│   │           │   ├── src-004-flash-attention-3.md
│   │           │   └── src-005-training-compute-optimal-large-language-models.md
│   │           └── wiki/                  # 📂 2계층: 위키 페이지 (LLM 작성·관리)
│   │               ├── entities/          # 엔티티 (모델, 하드웨어, 논문, 연구자, 조직)
│   │               │   ├── index.md
│   │               │   └── gpt-4.md
│   │               ├── concepts/          # 개념 (어텐션, 스케일링 법칙, RAG 등)
│   │               │   ├── index.md
│   │               │   └── attention.md
│   │               ├── synthesis/         # 합성 (비교·종합·메타 분석) — 예정
│   │               │   └── index.md
│   │               └── comparisons/       # 비교 (모델 간, 기법 간) — 예정
│   │                   └── index.md
│   ├── styles/
│   │   └── custom.css             # 커스텀 스타일
│   └── templates/                 # LLM 작성용 템플릿 (콘텐츠 컬렉션 밖)
│       ├── entity.md              # 엔티티 페이지 템플릿
│       ├── concept.md             # 개념 페이지 템플릿
│       ├── synthesis.md           # 합성 페이지 템플릿
│       └── comparison.md          # 비교 페이지 템플릿
├── astro.config.mjs               # Astro + Starlight 메인 설정
├── package.json
├── tsconfig.json
├── CLAUDE.md                      # 프로젝트 운영 지침 (AGENTS.md 심볼릭 링크)
└── README.md                      # 이 파일
```

### 주요 디렉토리 설명

| 경로 | 설명 |
|------|------|
| `src/content/docs/ko/sources/` | **1계층: 원본 소스** — 논문, 리포트, 블로그 원문 보관 (불변) |
| `src/content/docs/ko/wiki/` | **2계층: 위키 페이지** — LLM이 생성/갱신하는 구조화된 지식 |
| `src/content/docs/ko/schema/` | **3계층: 스키마/계약** — LLM 운영 규칙, 템플릿, 프롬프트 |
| `src/templates/` | 페이지 생성용 템플릿 (Starlight 컬렉션 검증 제외) |
| `src/styles/custom.css` | Starlight 테마 커스터마이징 |

---

## 🏗️ 3계층 아키텍처 상세

### 핵심 설계 철학

```
┌─────────────────────────────────────────────────────────────────┐
│                     3-LAYER ARCHITECTURE                        │
├──────────────────┬──────────────────┬──────────────────────────┤
│   1️⃣ SOURCES     │   2️⃣ WIKI        │   3️⃣ SCHEMA             │
│   (불변 아카이브)  │   (LLM 관리)      │   (공유 규칙/계약)        │
├──────────────────┼──────────────────┼──────────────────────────┤
│ 변경 빈도: 낮음   │ 변경 빈도: 높음   │ 변경 빈도: 매우 낮음      │
│ 작성자: 사람      │ 작성자: LLM       │ 작성자: 사람 + LLM 협의   │
│ 저장: 원본+메타   │ 저장: 구조화 MD   │ 저장: MD + 템플릿 + 프롬프트│
│ 목적: 근거 보존   │ 목적: 지식 제공   │ 목적: 운영 표준화        │
└──────────────────┴──────────────────┴──────────────────────────┘
```

---

### 1️⃣ 1계층: 원본 소스 아카이브 (`sources/`) — **불변**

**위치**: `src/content/docs/ko/sources/`

#### 역할
- LLM이 **읽기만 하고 쓰지 않는** 원본 자료 보관소
- 모든 위키 주장의 **최종 근거** 제공
- 저작권 허용 범위 내 원문/요약/핵심 발췌 저장

#### 파일 명명 규칙
```
src-{번호:03d}-{짧은-설명}.md
예: src-001-attention-is-all-you-need.md
```

#### 소스 파일 프론트매터 (필수)
```yaml
---
source_id: 'src-001'
title: 'Attention Is All You Need'
authors: ['Vaswani et al.']
venue: 'NeurIPS 2017'
year: 2017
url: 'https://arxiv.org/abs/1706.03762'
type: 'paper'                    # paper | article | blog | video | code | doc
tags: ['foundational', 'attention', 'transformer']
ingested_at: '2025-07-01'
ingested_by: 'claude'
content_hash: 'sha256:abc123...'  # 중복 방지용 해시
---
```

#### 콘텐츠 구성 (소스 유형별)

| 소스 유형 | 포함 내용 |
|-----------|-----------|
| **논문** | 초록, 핵심 그림/표 설명, 주요 수식, 한계점, 인용문 |
| **블로그/아티클** | 요약, 핵심 주장, 데이터 포인트, 원본 링크 |
| **코드/문서** | 주요 API, 설정 예시, 아키텍처 노트 |

> **원칙**: 원본 텍스트 전체 저장 권장 (저작권 허용 시). 요약본과 함께 보관.

---

### 2️⃣ 2계층: 위키 페이지 (`wiki/`) — **LLM 관리**

**위치**: `src/content/docs/ko/wiki/`

#### 4가지 페이지 유형 (각 페이지는 단일 책임 — 한 엔티티/개념/주제)

```
wiki/
├── entities/      # 핵심 대상 객체 (모델, 논문, 도구, 인물, 조직)
├── concepts/      # 핵심 원리/메커니즘 (어텐션, RAG, MoE 등)
├── synthesis/     # 다중 소스 종합 분석 (시계열 진화, 베스트 프랙티스)
└── comparisons/   # 정량/정성 비교표 (모델 스펙, 기법 트레이드오프)
```

#### 공통 프론트매터 (필수)
```yaml
---
title: '페이지 제목'
description: '한 줄 요약 (160자 이하, 검색/SEO용)'
type: 'entity | concept | synthesis | comparison'
entity_type: 'model | paper | tool | person | organization'  # entity만
sources: ['src-001', 'src-003']     # 근거 소스 ID 배열 (필수)
tags: ['tag1', 'tag2']               # 자유 태그 (소문자, 하이픈)
last_updated: '2025-07-16'           # LLM 최종 갱신일
confidence: 'high | medium | low'    # 정보 신뢰도
---
```

#### 관계 표현 (필수)
```markdown
## 관련 엔티티/개념
- [[GPT-4]] — GPT-3.5 후속 모델, 멀티모달 지원
- [[Attention Mechanism]] — 핵심 아키텍처 구성요소
- [[OpenAI]] — 개발 조직
```

#### 타입별 상세 구조

##### Entity (엔티티) — `wiki/entities/`
> **정의**: 모델, 논문, 도구, 인물, 조직 등 "이름·스펙·버전·관계가 명확히 정의되는 실체"

| 필수 섹션 | 설명 |
|-----------|------|
| `## 개요` | 한 줄 정의 + 핵심 스펙 표 |
| `## 상세 스펙` | 파라미터 수, 컨텍스트 길이, 모달리티, 학습 데이터, 벤치마크 |
| `## 아키텍처/설계 특징` | 구조적 특징 설명 |
| `## 강점 / 약점` | 장단점 비교 |
| `## 관련 엔티티` | 양방향 링크 (파생/기반/경쟁/관련) |
| `## 참조 소스` | `sources` 배열 기반 자동 생성 |
| `## 변경 이력` | 날짜순 변경 기록 |

**예시**: `gpt-4.md`, `h100.md`, `transformer-paper.md`, `yann-lecun.md`, `openai.md`

##### Concept (개념) — `wiki/concepts/`
> **정의**: 여러 엔티티에 공통 적용되는 알고리즘, 메커니즘, 원리, 패턴

| 필수 섹션 | 설명 |
|-----------|------|
| `## 정의` | 수식·의미·범위 엄밀 정의 (2-3문장) |
| `## 수학적/알고리즘적 기초` | 핵심 수식, 의사코드, 다이어그램 설명 |
| `## 주요 변형/확장` | 파생 기법, 개선 버전 (Flash Attention 등) |
| `## 실무 적용 고려사항` | 하이퍼파라미터, 트레이드오프, 구현 팁 |
| `## 관련 개념` | 양방향 링크 |
| `## 참조 소스` | 자동 생성 |
| `## 변경 이력` | 날짜순 기록 |

**예시**: `attention-mechanism.md`, `scaling-laws.md`, `rag.md`, `lora.md`, `moe.md`

##### Synthesis (합성) — `wiki/synthesis/`
> **정의**: 독립적 소스들을 엮어 새로운 통찰 도출하는 메타 분석 문서

| 필수 섹션 | 설명 |
|-----------|------|
| `## 질문/가설` | 이 문서가 답하려는 핵심 질문 |
| `## 소스별 요약` | 각 소스 핵심 주장 2-3줄 요약 |
| `## 통합 분석` | 공통점/차이점/모순점 표로 정리 |
| `## 결론/가이드라인` | 실무자용 액션 아이템 |
| `## 한계/미해결` | 남은 질문, 추가 연구 필요 영역 |
| `## 참조 소스 (전체)` | 전체 소스 나열 |

**예시**: `llm-scaling-laws.md`, `llm-evolution-timeline.md`, `fine-tuning-best-practices.md`

##### Comparison (비교) — `wiki/comparisons/`
> **정의**: 동일 기준에서 2개 이상 대상 정량/정성 직접 비교

| 필수 섹션 | 설명 |
|-----------|------|
| `## 비교 기준` | 평가 차원 정의 (성능, 비용, 속도, 사용성 등) |
| `## 정량 비교표` | 수치 비교 테이블 (단위 통일 필수) |
| `## 정성 비교` | 장단점, 트레이드오프 서술 |
| `## 추천 가이드` | 상황별 추천 (예: "예산 < $100이면 A, 레이턴시 중요면 B") |
| `## 출처` | 비교 근거가 된 벤치마크/리포트 링크 |

**예시**: `gpt-vs-claude.md`, `rag-chunking-strategies.md`, `lora-vs-full-finetune.md`

---

### 3️⃣ 3계층: 스키마/운영 계약 (`schema/`) — **공유 규칙**

**위치**: `src/content/docs/ko/schema/`

```
schema/
├── CLAUDE.md          # 운영 계약서 (LLM 시스템 프롬프트)
├── templates/         # 페이지 템플릿 4종 (콘텐츠 컬렉션 밖)
│   ├── entity.md
│   ├── concept.md
│   ├── synthesis.md
│   └── comparison.md
└── prompts/           # 재사용 프롬프트
    ├── ingest.md
    ├── query.md
    └── lint.md
```

#### CLAUDE.md 핵심 구성

| 섹션 | 내용 |
|------|------|
| **프론트매터 표준** | 4 유형별 필수/선택 필드 |
| **템플릿 4종** | 페이지 생성 시 따를 구조 |
| **워크플로 3종** | Ingest/Query/Lint 단계별 절차 |
| **네이밍/링크 컨벤션** | 파일명, 내부 링크, 태그 규칙 |
| **품질 기준** | 단일 진실원천, 추적가능성, 최신성, 모순금지, 원자성, 교차참조 |
| **스키마 진화 프로세스** | 변경 제안 → 영향 분석 → 합의 → 적용 → 로그 |

> 📄 **전체 계약서**: [`src/content/docs/ko/schema/CLAUDE.md`](src/content/docs/ko/schema/CLAUDE.md)

---

## 📋 콘텐츠 타입 상세 스키마

### 공통 필수 필드 (모든 위키 페이지)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✅ | 페이지 제목 |
| `description` | string | ✅ | 한 줄 요약 (≤160자) |
| `type` | enum | ✅ | `entity \| concept \| synthesis \| comparison` |
| `sources` | string[] | ✅ | 참조 소스 ID 배열 (예: `['src-001', 'src-005']`) |
| `tags` | string[] | ✅ | 검색/분류용 태그 (소문자, 하이픈) |
| `last_updated` | date | ✅ | ISO 8601 날짜 (LLM 최종 갱신일) |
| `confidence` | enum | ✅ | `high \| medium \| low` — 정보 신뢰도 |

### Entity 전용 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `entity_type` | enum | ✅ | `model \| paper \| tool \| person \| organization` |

### Entity Type별 권장 스펙 필드

#### `model` (LLM 모델)
```yaml
title: 'GPT-4'
entity_type: 'model'
sources: ['src-002', 'src-015']
tags: ['openai', 'multimodal', 'closed-source', '2023']
# 권장 본문 섹션: 파라미터 수, 컨텍스트 길이, 모달리티, 출시일, 라이선스, 벤치마크
```

#### `paper` (논문)
```yaml
title: 'Attention Is All You Need'
entity_type: 'paper'
sources: ['src-001']
tags: ['foundational', 'transformer', '2017']
# 권장 본문 섹션: 저자, 출판지, 연도, 핵심 기여, 한계점, 인용 수
```

#### `tool` (도구/프레임워크)
```yaml
title: 'PyTorch'
entity_type: 'tool'
sources: ['src-010']
tags: ['framework', 'python', 'mlops', 'open-source']
# 권장 본문 섹션: 버전, 라이선스, 주요 기능, 생태계, 대안
```

#### `person` (연구자)
```yaml
title: 'Yann LeCun'
entity_type: 'person'
sources: ['src-020']
tags: ['meta', 'cnn', 'self-supervised', 'turing-award']
# 권장 본문 섹션: 소속, 주요 업적, 논문, 수상, 연구 관심사
```

#### `organization` (조직)
```yaml
title: 'OpenAI'
entity_type: 'organization'
sources: ['src-002']
tags: ['api-provider', 'research', 'closed-source']
# 권장 본문 섹션: 설립일, 주요 모델, API, 미션, 경쟁사
```

---

## ⚙️ 운영 워크플로 (3단계)

> 모든 워크플로는 `schema/CLAUDE.md` §5 계약서에 정의된 절차를 따릅니다.

---

### 1️⃣ Ingest — 소스 수집 → 위키 통합

**목적**: 새로운 원본 소스를 수집하고, 핵심 정보를 추출해 위키 페이지를 생성/갱신

#### 트리거
- 새 논문/블로그/문서 발견 시
- 사용자 요청: `"sources/src-XXX.md를 ingest해줘"`

#### 사전 조건
- `sources/src-XXX.md` 파일이 스키마(§4.2)에 맞게 생성됨
- `schema/CLAUDE.md` 템플릿 숙지

#### 단계별 절차

| 단계 | 작업 | 상세 |
|------|------|------|
| **1** | 소스 파일 생성 | `cp schema/templates/source-template.md sources/src-006-new-paper.md` → 메타데이터+콘텐츠 작성 |
| **2** | 소스 읽기 및 정보 추출 | 전체 읽기 → 핵심 정보 분류 (신규 엔티티/기존 업데이트/모순) |
| **3** | 기존 위키 스캔 | `index.md` 읽기 → 관련 페이지 후보 선정 → 후보 페이지 읽기 |
| **4** | 영향 페이지 식별 및 처리 | - **새 엔티티/개념**: 템플릿(`entity.md`/`concept.md`)으로 새 페이지 생성<br>- **기존 페이지 업데이트**: 내용 보강, `sources` 추가, `last_updated` 갱신<br>- **모순 발견**: 즉시 플래그 표시, 사용자 확인 대기 (임의 해결 금지) |
| **5** | `index.md` 갱신 | 신규 페이지 카탈로그 추가, 업데이트된 페이지 `last_updated`/소스 수 반영, `last_updated` 내림차순 정렬 |
| **6** | `log.md` 기록 | 파싱 가능 형식으로 append (아래 예시) |
| **7** | 변경 요약 보고 | 사용자에게 영향 페이지 수, 신규/갱신 내역, 모순 여부 보고 |

#### log.md 기록 형식 (Ingest)
```markdown
## [2025-07-16] ingest | Flash Attention 3 논문 추가 | 영향 페이지 3개
- 신규: wiki/concepts/flash-attention.md
- 갱신: wiki/concepts/attention-mechanism.md, wiki/entities/h100.md
- 소스: src-004
- 모순: 없음
```

#### Ingest 체크리스트
- [ ] `sources/src-XXX.md` 메타데이터 완전성 확인
- [ ] 소스에서 핵심 정보 추출 완료
- [ ] `index.md`로 기존 관련 페이지 스캔 완료
- [ ] 신규 페이지 템플릿 준수 생성
- [ ] 기존 페이지 업데이트: 내용 + sources + last_updated
- [ ] 모순 발견 시 즉시 보고 (자체 해결 ❌)
- [ ] `index.md` 카탈로그 갱신
- [ ] `log.md` 파싱 가능 형식으로 append

---

### 2️⃣ Query — 질의 → 위키 기반 답변

**목적**: 위키 지식을 활용해 사용자 질문에 답변. 외부 지식 사용 금지(명시적 허용 시 예외)

#### 트리거
- 사용자 질문: `"RAG 청킹 전략 추천해줘"`

#### 단계별 절차

| 단계 | 작업 | 상세 |
|------|------|------|
| **1** | `index.md` 읽기 및 후보 선정 | 카탈로그에서 관련 카테고리/페이지 식별, `tags`/`description`/`type` 기반 필터링 |
| **2** | 후보 페이지 읽기 | 선정된 페이지 전체 또는 관련 섹션 읽기, 필요시 `sources` 참조로 원본 확인 |
| **3** | 정보 종합 및 답변 작성 | **인용 필수**: `[[페이지명]]` 또는 `[src-XXX]`, 위키 내용만으로 답변 (외부 지식 혼입 금지), 불확실하면 `confidence: low` 페이지 명시 |
| **4** | 답변 가치 평가 → 페이지화 제안 | - **재사용 가치 높음**: 새 `synthesis`/`comparison` 페이지 저장 제안<br>- **단순 조회**: 답변만 제공<br>- **위키에 정보 없음**: "위키에 관련 정보 없음" 명시, 외부 검색 제안 |
| **5** | `log.md` 기록 | 파싱 가능 형식 append |

#### log.md 기록 형식 (Query)
```markdown
## [2025-07-16] query | RAG 청킹 전략 비교 | 참조 페이지 3개
- 질문: "RAG에서 청킹 전략별 장단점 비교해줘"
- 참조: wiki/concepts/rag.md, wiki/comparisons/chunking-strategies.md, src-003
- 제안: wiki/comparisons/rag-chunking-strategies.md 신규 생성 가치 있음
```

#### Query 체크리스트
- [ ] `index.md`로 후보 페이지 선정
- [ ] 후보 페이지 내용 읽기 완료
- [ ] 답변에 인용 포함 (`[[페이지]]` 또는 `[src-XXX]`)
- [ ] 외부 지식 혼입 여부 자가 검증
- [ ] 답변 가치 높으면 페이지화 제안
- [ ] `log.md` 기록

---

### 3️⃣ Lint — 위키 건강도 점검

**목적**: 위키의 일관성, 최신성, 완결성을 주기적으로 검증

#### 주기
- **주 1회** 정기 실행
- 주요 `ingest` 후 즉시 실행 권장

#### 7대 점검 항목

| # | 항목 | 설명 | 심각도 | 조치 |
|---|------|------|--------|------|
| 1 | **모순 탐지** | 동일 주제 상충 주장 스캔 | Critical | 비교 페이지 생성 또는 플래그 |
| 2 | **오래된 주장** | `last_updated` 6개월 초과 + 최신 소스 존재 | High | 최신 소스로 업데이트 또는 low 표시 |
| 3 | **고아 페이지** | 인바운드 링크 0개 페이지 | Medium | 링크 추가 또는 병합/삭제 제안 |
| 4 | **누락 교차참조** | 관련성 높은 페이지 간 링크 부재 | Medium | 양방향 링크 추가 |
| 5 | **메타데이터 완전성** | 프론트매터 필수 필드 누락 | High | 즉시 보완 |
| 6 | **신뢰도 분포** | `confidence: low` 페이지 집중 검토 | Medium | 우선 업데이트 또는 소스 보강 |
| 7 | **커버리지 갭** | 중요 개념/엔티티 누락 (웹 검색 보완 제안) | Low | 신규 페이지 생성 제안 |

#### 단계별 절차

**Step 1: 전체 스캔**
```bash
# 프론트매터 추출 예시
grep -r "^---$" wiki/ -A 20 | ...
```

**Step 2: 자동화 가능한 검증 실행**
- 메타데이터 완전성 (스크립트)
- 깨진 링크 (링크 체커)
- `last_updated` 경과 계산

**Step 3: 의미적 검증 (LLM 수행)**
- 모순 탐지: 동일 엔티티/개념 다중 페이지 교차 비교
- 커버리지 갭: 도메인 지식 기반 중요 토픽 체크리스트 대조

**Step 4: 결과 분류 및 기록**
```markdown
## [2025-07-16] lint | 발견 이슈 7건 | 조치 3건 완료 4건 대기
### Critical (1)
- [ ] wiki/entities/gpt-4.md vs wiki/comparisons/gpt-vs-claude.md: 파라미터 수 상충 (1.76T vs 1.8T)

### High (2)
- [x] wiki/concepts/attention.md: last_updated 8개월 경과, src-004로 업데이트 필요
- [ ] wiki/entities/claude-3.md: sources 필드 누락

### Medium (3)
- [ ] wiki/synthesis/llm-evolution.md: 인바운드 링크 0 (고아)
- [ ] wiki/concepts/rag.md ↔ wiki/concepts/vector-db.md: 교차참조 누락
- [ ] confidence: low 페이지 3개 (claude-3, gemini-1.5, llama-3) 소스 보강 필요

### Low (1)
- [ ] 커버리지: MoE 아키텍처, 테스트타임 컴퓨트 등 신규 중요 토픽 누락

### 조치 내역
- [x] wiki/concepts/attention.md 업데이트 완료 (src-004 반영)
- [x] wiki/entities/claude-3.md sources 추가
- [x] wiki/concepts/rag.md ↔ vector-db.md 양방향 링크 추가
```

**Step 5: 사용자 리뷰 요청**
- Critical/High 이슈는 사용자 확인 후 조치

#### Lint 체크리스트
- [ ] 전체 페이지 프론트매터 추출 완료
- [ ] 메타데이터 누락 검증 (자동/수동)
- [ ] 깨진 링크 검사
- [ ] `last_updated` 6개월 초과 페이지 리스트업
- [ ] 모순 탐지 (LLM 교차 비교)
- [ ] 고아 페이지 식별
- [ ] 누락 교차참조 식별
- [ ] `confidence: low` 페이지 리스트업
- [ ] 커버리지 갭 도메인 체크리스트 대조
- [ ] `log.md` 상세 기록
- [ ] Critical/High 이슈 사용자 보고

---

### 워크플로 간단 비교표

| 구분 | Ingest | Query | Lint |
|------|--------|-------|------|
| **주체** | LLM | LLM | LLM (+자동화) |
| **입력** | 새 소스 파일 | 사용자 질문 | 전체 위키 |
| **출력** | 위키 변경 + 로그 | 답변 (+페이지 제안) | 이슈 리스트 + 로그 |
| **빈도** | 소스 추가 시 | 질문 시 | 주 1회 + 주요 ingest 후 |
| **핵심 제약** | 모순 시 중단 | 외부 지식 금지 | 파싱 가능 로그 필수 |
| **로그 형식** | `ingest \| 제목 \| N페이지` | `query \| 요약 \| N페이지` | `lint \| N이슈 \| 조치` |

---

## 🌐 배포 (GitHub Pages)

### 자동 배포 설정

#### 1. GitHub Pages 활성화
- Repository → Settings → Pages
- Source: **"GitHub Actions"**
- Custom domain: 미설정 (github.io 사용)

#### 2. 배포 워크플로 (`.github/workflows/deploy.yml`)
- `main` 브랜치 푸시 시 자동 실행
- `npm run build` → `dist/` → GitHub Pages 업로드

#### 3. URL
**https://junghyun100.github.io/junghyun100-LLM-WIKI/**

### 로컬 검증
```bash
npm run build
npm run preview
# http://localhost:4321/junghyun100-LLM-WIKI/ 확인
```

### 배포 체크리스트
- [ ] `astro.config.mjs` `base: '/junghyun100-LLM-WIKI'` 설정 확인
- [ ] `site: 'https://junghyun100.github.io'` 설정 확인
- [ ] GitHub Pages 설정에서 Source: "GitHub Actions" 선택
- [ ] `main` 브랜치 보호 규칙 설정 권장

### 수동 배포 (필요 시)
```bash
npm run build
# dist/ 폴더 내용을 정적 호스팅에 업로드
```

---

## 🛠️ 기술 스택

| 계층 | 기술 | 버전 | 용도 |
|------|------|--------|------|
| **프레임워크** | Astro | 7.x | 정적 사이트 생성 |
| **문서 테마** | Starlight | 0.41+ | 문서 사이트 테마 (사이드바, 검색, 다국어) |
| **언어** | TypeScript | 5.x (strict) | 타입 안전성 |
| **스타일링** | CSS + Astro | - | 커스텀 스타일 (`src/styles/custom.css`) |
| **빌드/배포** | GitHub Actions | - | CI/CD 파이프라인 |
| **호스팅** | GitHub Pages | - | 무료 정적 호스팅 |
| **검색** | Pagefind | 내장 | 클라이언트 사이드 전체 텍스트 검색 |

### Starlight 공식 문서
> 📚 **공식 문서**: https://starlight.astro.build/
> - [시작하기](https://starlight.astro.build/getting-started/)
> - [사이드바 구성](https://starlight.astro.build/reference/configuration/#sidebar)
> - [다국어 지원](https://starlight.astro.build/guides/i18n/)
> - [검색(Pagefind)](https://starlight.astro.build/reference/configuration/#pagefind)
> - [배포](https://starlight.astro.build/guides/deploy/)

---

## 🤝 기여 가이드 (LLM 협업 중심)

### 기여 방식

| 유형 | 방법 |
|------|------|
| **콘텐츠 추가/수정** | LLM에게 Ingest 요청 → 자동 생성/갱신 |
| **스키마/워크플로 변경** | `schema/CLAUDE.md` 수정 → 인간 검토 → 승인 |
| **사이트 UI/기능** | 이 저장소 PR → 코드 리뷰 → 머지 |
| **버그 리포트** | GitHub Issues 템플릿 사용 |

### 콘텐츠 추가 워크플로 (LLM 협업)

#### 사용자 요청 예시
```markdown
"Attention Is All You Need 논문(2017) 수집해서 위키에 반영해줘"
```

#### LLM 수행 순서
1. **원본 소스 생성**: `sources/src-006-attention-is-all-you-need.md` 생성 (원본 저장)
2. **개념 페이지 생성**: `wiki/concepts/2025-07-16-attention.md` 생성 (Attention 메커니즘 개념)
3. **엔티티 페이지 생성**: `wiki/entities/2025-07-16-transformer.md` 생성 (Transformer 모델 엔티티)
4. **자동 갱신**: `index.md`, `log.md` 자동 갱신
5. **보고**: 사용자에게 변경 사항 요약 보고

#### 수동 콘텐츠 추가 (사람이 직접 쓸 때)

1. `src/content/docs/ko/wiki/{type}/{YYYY-MM-DD-slug}.md` 생성
2. 필수 프론트매터 작성 (위 스키마 참조)
3. `npm run dev`로 로컬 확인
4. PR 생성 → 리뷰 → 머지 → 자동 배포

### 파일 명명 규칙
- **케밥케이스**: `kebab-case.md` (소문자, 하이픈)
- **엔티티**: `wiki/entities/2025-07-16-gpt-4.md`
- **개념**: `wiki/concepts/2025-07-16-attention-mechanism.md`
- **합성**: `wiki/synthesis/2025-07-10-llm-scaling-laws.md`
- **비교**: `wiki/comparisons/2025-07-16-rag-chunking-strategies.md`

### 내부 링크 규칙
```markdown
# 위키 페이지 참조
[[GPT-4]]                              # 제목 기반
[GPT-4 상세](../wiki/entities/gpt-4.md)  # 상대 경로

# 소스 참조
[src-001](../sources/src-001-attention-is-all-you-need.md)
```

### 태그 컨벤션
- **소문자, 하이픈**: `multi-modal`, `open-source`, `foundational`
- **도메인**: `architecture`, `training`, `inference`, `evaluation`
- **출처**: `paper`, `blog`, `doc`, `code`

---

## 📝 개발 워크플로

```bash
# 1. 로컬 개발 서버
npm run dev          # 개발 서버 (백그라운드 권장)

# 2. 콘텐츠 추가/수정
# src/content/docs/ko/ 아래 .md 생성/수정

# 3. 사이드바 등록 (필요 시)
# astro.config.mjs sidebar 배열에 추가:
{
  label: '새 카테고리',
  items: [
    { label: '페이지 제목', slug: 'wiki/entities/page-slug' },
    // 또는 자동 생성:
    { autogenerate: { directory: 'wiki/entities' } }
  ]
}

# 4. 로컬 확인
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 검증
npm run preview  # 빌드 결과 프리뷰

# 5. 커밋 → 푸시 → 자동 배포
git add .
git commit -m "feat: add attention mechanism concept"
git push origin main
```

### 커밋 컨벤션
```
type(scope): description

feat: 새 기능
fix: 버그 수정
refactor: 리팩토링
docs: 문서
chore: 설정/빌드
```

### 코드 스타일
- `const` 기본, 재할당 필요 시 `let`
- 화살표 함수 우선
- 타입 추론 활용, 명시적 타입은 필요할 때만
- `any` 금지, `unknown` 활용
- JSDoc 대신 타입으로 문서화

---

## 🔧 문제 해결

| 문제 | 해결 |
|------|------|
| 빌드 시 슬러그 에러 | `astro.config.mjs` sidebar slug와 실제 파일 경로 일치 확인 |
| 프론트매터 검증 실패 | 필수 필드(`title`, `description`, `type` 등) 모두 포함 확인 |
| 사이드바에 안 보임 | `autogenerate.directory` 경로가 `ko/` 하위인지 확인 |
| 한글 깨짐 | 파일 인코딩 UTF-8 확인, `lang: ko-KR` 설정 확인 |
| 타입 에러 | `npx astro check` 실행하여 상세 확인 |
| 의존성 충돌 | `rm -rf node_modules package-lock.json && npm install` |

---

## 📄 라이선스

**MIT License** — 자유로운 사용, 수정, 배포 가능

---

## 🔗 관련 링크

| 링크 | 설명 |
|------|------|
| [GitHub 저장소](https://github.com/junghyun100/junghyun100-LLM-WIKI) | 소스 코드, 이슈, PR |
| [배포 사이트](https://junghyun100.github.io/junghyun100-LLM-WIKI/) | GitHub Pages 공개 사이트 |
| [Starlight 공식 문서](https://starlight.astro.build/) | 테마 문서·가이드 |
| [Astro 공식 문서](https://astro.build/) | 프레임워크 문서 |
| [LLM Wiki 스키마 계약](src/content/docs/ko/schema/CLAUDE.md) | LLM 운영 규칙 원문 |
| [위키 구조 문서](src/content/docs/ko/wiki-structure.md) | 3계층 아키텍처 상세 |
| [워크플로 문서](src/content/docs/ko/workflow.md) | Ingest/Query/Lint 절차 |
| [시작 가이드](src/content/docs/ko/getting-started.md) | 개발/운영 가이드 |

---

## 📝 변경 로그

자세한 변경 이력은 [`src/content/docs/ko/log.md`](src/content/docs/ko/log.md)를 참조하세요.

| 날짜 | 버전 | 변경 사항 |
|------|------|-----------|
| 2025-07-16 | 0.1.0 | 초기 구조 생성, 3계층 아키텍처, 샘플 콘텐츠, 배포 파이프라인 구축 |

---

> **"소프트웨어 2.0에서 가장 중요한 코드는 데이터다."** — 이 위키는 LLM이 큐레이션하는 '데이터로서의 지식'입니다.