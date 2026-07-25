# LLM Wiki — Junghyun100's Knowledge Base

> **장기적 LLM Wiki 플랫폼** — Quartz v5 기반, 3계층 아키텍처(Sources → Wiki → Schema)로 사람+LLM 협업 운영

## 🌐 배포 사이트
- **Production**: https://junghyun100.github.io/junghyun100-LLM-WIKI/ko/
- **Repository**: https://github.com/junghyun100/junghyun100-LLM-WIKI

---

## 🏗 아키텍처: 3계층 구조

```
content/ko/
├── sources/           # 📚 Sources — 원본 아카이브 (불변, 사람 관리)
│   ├── src-001-attention-is-all-you-need.md
│   ├── src-002-gpt-4-technical-report.md
│   └── ...
├── wiki/              # 🧠 Wiki — 구조화된 지식 (LLM 관리)
│   ├── entities/      # 모델, 논문, 도구, 인물, 조직
│   ├── concepts/      # 알고리즘, 메커니즘, 원리
│   ├── synthesis/     # 다중 소스 종합 분석
│   └── comparisons/   # 정량/정성 비교표
├── schema/            # 📋 Schema — 공유 규칙 (사람+LLM 협의)
│   └── CLAUDE.md      # LLM 운영 계약서 (템플릿, 워크플로, 금지사항)
├── index.md           # 전체 카탈로그 (자동 갱신)
├── getting-started.md # 이 문서
├── wiki-structure.md  # 3계층 상세
├── workflow.md        # Ingest/Query/Lint 절차
├── log.md             # 변경 연대기
└── tools.md           # 자동화 도구
```

---

## ✨ 핵심 특징

| 특징 | 설명 |
|------|------|
| **3계층 분리** | Sources(불변) → Wiki(가변/LLM) → Schema(규칙) |
| **LLM 운영** | Ingest/Query/Lint 3대 워크플로로 사람 개입 최소화 |
| **추적가능성** | 모든 주장은 `sources: ['src-XXX']`로 근거 연결 |
| **품질 게이트** | Lint(모순/최신성/고아/메타데이터) 주 1회 자동 실행 |
| **Quartz v5** | Wiki 링크 `[[...]]`, 백링크, 그래프 뷰, Pagefind 검색 네이티브 |
| **한국어 우선** | Noto Sans KR + JetBrains Mono, ko-KR 로케일 |

---

## 🚀 빠른 시작

```bash
# 1. 클론 및 의존성 설치
git clone https://github.com/junghyun100/junghyun100-LLM-WIKI.git
cd junghyun100-LLM-WIKI
npm ci --legacy-peer-deps

# 2. 개발 서버 (localhost:8080)
npx quartz build --serve

# 3. 프로덕션 빌드
npx quartz build

# 4. 자동화 도구
npm run lint        # 품질 검증 (lint-check.ts)
npm run index:gen   # 카탈로그 갱신 (index-gen.ts)
npm run ingest      # 소스→위키 도우미 (ingest-helper.ts)
```

---

## 📋 자동화 스크립트 (`scripts/`)

| 스크립트 | 용도 | 실행 |
|----------|------|------|
| `lint-check.ts` | 프론트매터 검증, 모순 탐지, 고아 페이지, 깨진 링크, 최신성 확인 | `npm run lint` |
| `index-gen.ts` | `index.md` 카탈로그 자동 생성 (엔티티/개념/합성/비교/소스 표) | `npm run index:gen` |
| `ingest-helper.ts` | 새 소스 파일을 위키 페이지 초안으로 변환 | `npm run ingest sources/src-XXX.md` |

---

## 🔄 LLM 협업 워크플로

### Ingest (소스→위키 통합)
```bash
# 새 논문/문서 추가 후
npm run ingest sources/src-007-new-paper.md --dry-run  # 미리보기
npm run ingest sources/src-007-new-paper.md            # 실제 생성
npm run index:gen && npm run lint                      # 후처리
```

### Query (위키 기반 질의)
```
"위키만 참고해서 RAG 청킹 전략 비교해줘"
→ index.md로 관련 페이지 탐색 → 내용 종합 → [[페이지]]/[src-XXX] 인용 필수
```

### Lint (주기적 품질 검증)
```bash
npm run lint
# 출력: Errors(차단), Warnings(고아/모순), Info(최신성)
# Critical/High 이슈는 log.md 기록 후 사용자 리뷰 요청
```

---

## 📝 프론트매터 스키마 (필수)

```yaml
---
title: '페이지 제목'                    # 필수, 고유
description: '한 줄 요약 (≤160자)'       # 필수
type: 'entity | concept | synthesis | comparison'  # 필수
entity_type: 'model | paper | tool | person | organization'  # entity만
sources: ['src-001', 'src-003']          # 필수, src-XXX 형식
tags: ['tag1', 'tag2']                   # 필수, kebab-case
last_updated: 'YYYY-MM-DD'               # 필수, LLM 최종 갱신일
confidence: 'high | medium | low'        # 필수
aliases: ['별칭1', '별칭2']              # 선택
---
```

---

## 🎯 품질 기준 (CLAUDE.md §8 요약)

| 기준 | 설명 | 검증 |
|------|------|------|
| **단일 진실원천** | 동일 사실은 한 페이지에만 | Lint 시 중복 제목 감지 |
| **추적가능성** | 모든 주장은 `sources`로 연결 | Ingest/Lint 시 필수 필드 |
| **최신성** | `last_updated` 6개월 초과 플래그 | Lint 시 Info 경고 |
| **모순 금지** | 상충 주장 즉시 플래그, 비교 페이지로 | Lint 시 Critical 에러 |
| **원자성** | 한 페이지 = 한 엔티티/개념/주제 | 작성 시 분할 권장 |
| **교차참조** | 관련 개념/엔티티 간 양방향 링크 | Lint 시 고아/누락 경고 |

---

## 🛠 기술 스택

| 영역 | 선택 | 비고 |
|------|------|------|
| **SSG** | Quartz v5 | Obsidian 네이티브, 플러그인 생태계 |
| **검색** | Pagefind | 클라이언트사이드, 한국어 지원 |
| **그래프** | Cytoscape (Graph 플러그인) | 인터랙티브 백링크 시각화 |
| **타입스크립트** | Strict 모드 | 스크립트 타입 안전성 |
| **배포** | GitHub Pages | Actions 워크플로 자동화 |
| **스타일링** | Quartz 테마 + 커스텀 CSS | Noto Sans KR / JetBrains Mono |
| **커스텀 컴포넌트** | `local/llm-wiki-components` | Header, SidebarNav, TOC, Footer (모던 디자인) |

---

## 🎨 모던 프론트엔드 디자인

이 프로젝트는 Quartz 기본 테마를 **커스텀 로컬 플러그인**(`local/llm-wiki-components`)으로 확장하여 최신 프론트엔드 디자인을 적용했습니다.

### 커스텀 컴포넌트 구조

```
local/llm-wiki-components/
├── components/
│   ├── Header.tsx          # 로고, 내비 탭, 검색 트리거, 테마 토글, GitHub 링크
│   ├── SidebarNav.tsx      # 접이식 섹션, 아이콘, 활성 상태 표시
│   ├── TableOfContents.tsx # 스크롤 스파이, 모바일 바텀시트, 진행률 표시
│   ├── SiteFooter.tsx      # 멀티컬럼(브랜드/위키/도구/메타), 반응형 그리드
│   └── ThemeToggle.tsx     # 다크/라이트 모드 (로컬스토리지 + prefers-color-scheme)
├── index.ts                # 컴포넌트 레지스트리 등록
├── package.json            # Quartz 매니페스트 (defaultPosition/priority 포함)
└── tsup.config.ts          # Preact JSX 자동 변환 빌드 설정
```

### 주요 디자인 특징

| 컴포넌트 | 기능 | 반응형 동작 |
|---------|------|------------|
| **Header** | 로고 + 5개 탭 네비 + ⌘K 검색 + 테마 토글 + GitHub | 모바일에서 탭 숨김, 검색 모달로 전환 |
| **SidebarNav** | 4개 섹션(시작하기/위키/참조/메타), 접이식, 아이콘 | 데스크톱 고정, 모바일 드로어 예정 |
| **TableOfContents** | 깊이별 들여쓰기, 스크롤 스파이(IntersectionObserver), 활성 하이라이트 | ≤1024px: 고정 바텀시트(스크롤 업 시 열림) |
| **SiteFooter** | 4컬럼 그리드(브랜드/위키/도구/메타), GitHub/Quartz 링크 | ≥1024px: 4컬럼, ≥768px: 2컬럼, 모바일: 1컬럼 |

### 레이아웃 구성 (`quartz.config.yaml`)

```yaml
layout:
  byPageType:
    content:
      positions:
        header: [Header]
        left: [SidebarNav]
        right: [TableOfContents]
        footer: [SiteFooter]
    folder:
      positions:
        header: [Header]
        left: [SidebarNav]
        footer: [SiteFooter]
    tag:
      positions:
        header: [Header]
        left: [SidebarNav]
        footer: [SiteFooter]
    canvas:
      positions:
        header: [Header]
        footer: [SiteFooter]
    bases:
      positions:
        header: [Header]
        footer: [SiteFooter]
```

### 빌드 및 개발

```bash
# 로컬 컴포넌트 빌드
cd local/llm-wiki-components && npm run build

# Quartz 빌드 (캐시 클리어 권장)
rm -rf .quartz-cache public && npx quartz build

# 개발 서버
npx quartz build --serve
```

### 테마 시스템

- **CSS 변수 기반**: `--color-*`, `--space-*`, `--font-*`, `--motion-*` 등 디자인 토큰 사용
- **다크/라이트 모드**: `data-theme="dark|light"` + `prefers-color-scheme` + localStorage 동기화
- **한국어 타이포그래피**: Noto Sans KR (본문/헤더), JetBrains Mono (코드)

---

## 📦 프로젝트 구조

```
junghyun100-LLM-WIKI/
├── content/ko/              # 콘텐츠 (Git 관리)
│   ├── sources/             # 원본 아카이브
│   ├── wiki/                # 위키 페이지
│   ├── schema/              # CLAUDE.md 계약서
│   └── *.md                 # 네비게이션/메타 페이지
├── scripts/                 # 자동화 스크립트 (TypeScript)
│   ├── lint-check.ts
│   ├── index-gen.ts
│   └── ingest-helper.ts
├── prompts/                 # LLM 시스템 프롬프트
│   ├── ingest.md
│   ├── query.md
│   └── lint.md
├── quartz.config.yaml       # Quartz 설정
├── .github/workflows/       # CI/CD
│   └── deploy.yml
├── package.json
└── CLAUDE.md                # 프로젝트 운영 지침
```

---

## 🔗 관련 링크

- [Quartz 문서](https://quartz.jzhao.xyz/)
- [Pagefind 검색](https://pagefind.app/)
- [GitHub Pages 배포 가이드](https://docs.github.com/en/pages)
- [프로젝트 운영 지침 (CLAUDE.md)](CLAUDE.md)

---

## 📄 라이선스

MIT License — 자유롭게 사용, 수정, 배포 가능

---

*Generated & Maintained with Quartz v5 + LLM-assisted workflows*