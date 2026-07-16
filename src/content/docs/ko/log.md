---
title: '변경 로그'
description: 'LLM Wiki 연대기 작업 로그 — 파싱 가능 형식으로 모든 변경 기록'
---

# 변경 로그

모든 워크플로(`Ingest`/`Query`/`Lint`/`Schema`/`Maintenance`) 실행 시 append 기록합니다.

> **파싱**: `grep "^## \[" log.md`로 전체 항목 추출 가능  
> **형식**: `## [YYYY-MM-DD] type | 설명`  
> **타입**: `ingest` | `query` | `lint` | `schema` | `maintenance`

---

## [2025-07-16] maintenance | 프로젝트 초기 설정 및 스키마 v1.0.0 배포 | 영향 0개

초기 프로젝트 구조 생성 완료:
- Astro + Starlight 한국어 로케일 설정
- 3계층 디렉토리 구조 (Sources/Wiki/Schema)
- `schema/CLAUDE.md` 운영 계약서 v1.0.0 작성
- 템플릿 4종(`entity`, `concept`, `synthesis`, `comparison`) 생성
- 커스텀 CSS 테마 적용 (라이트/다크, 테이블, 코드블록, 카드, 콜아웃)
- GitHub Pages 배포 워크플로 구성 (`.github/workflows/deploy.yml`)

---

## [2025-07-16] schema | CLAUDE.md v1.0.0 확정 및 템플릿 적용 | 영향 0개

스키마 문서 확정:
- 프론트매터 표준 4유형 정의
- 템플릿 4종(`src/templates/` 배치) 검수
- 네이밍/링크/태그 컨벤션 표준화
- 품질 기준 6항목(단일진실원천, 추적가능성, 최신성, 모순금지, 원자성, 교차참조)
- 스키마 진화 프로세스 정의

---

## [2025-07-16] ingest | src-001 Attention Is All You Need 수집 | 영향 2개

**소스**: `sources/src-001-attention-is-all-you-need.md` (Vaswani et al., NeurIPS 2017)

**생성 페이지**:
- `wiki/concepts/attention.md` — 어텐션 메커니즘 수학적 기초, Multi-Head, 변형(Flash Attention 등)
- `wiki/entities/transformer.md` — Transformer 아키텍처 엔티티 (인코더/디코더, 스펙)

**index.md** 갱신: 개념 1개, 엔티티 1개 추가, 소스 수 반영

---

## [2025-07-16] ingest | src-002 GPT-4 Technical Report 수집 | 영향 1개

**소스**: `sources/src-002-gpt-4-technical-report.md` (OpenAI, 2023)

**갱신 페이지**:
- `wiki/entities/gpt-4.md` — GPT-4 스펙(파라미터 1.76T 추정, 컨텍스트 128K, 멀티모달), 벤치마크(MMLU 86.4%, GSM8K 92.0%)

**index.md** 갱신: 엔티티 1개 업데이트

---

## [2025-07-16] ingest | src-004 Flash Attention 3 수집 | 영향 2개

**소스**: `sources/src-004-flash-attention-3.md` (Dao et al., 2024)

**갱신 페이지**:
- `wiki/concepts/attention.md` — Flash Attention 3 내용 추가(H100 최적화, 비동기 복사, 1.5-2배 속도향상)
- `wiki/entities/h100.md` — H100 GPU 엔티티 신규 생성

**모순**: 없음

---

## [2025-07-15] query | "RAG 파이프라인 청킹 전략 비교" 질의 | 참조 3개

**질문**: RAG에서 청크 크기/오버랩/전략(고정/의미/계층)별 장단점

**참조**:
- `wiki/concepts/rag.md` — RAG 파이프라인 전체 구조
- `wiki/concepts/chunking.md` — 청킹 전략 상세 (미생성 → 생성 제안)
- `src-003` — RAG 원논문 (Lewis et al., 2020)

**결과**: 답변 제공 + `wiki/comparisons/rag-chunking-strategies.md` 신규 생성 제안 → 사용자 승인 대기

---

## [2025-07-14] lint | 주간 건강도 점검 | 발견 4건 / 조치 3건

**점검 범위**: 전체 위키(5페이지) + 소스(5개)

| 심각도 | 항목 | 상태 | 상세 |
|--------|------|------|------|
| Critical | ⚠️ 파라미터 수 상충 | 미해결 | `wiki/entities/gpt-4.md`(1.76T) vs `wiki/comparisons/gpt-vs-claude.md`(1.8T) — 미생성 페이지에서 조회됨, 사용자 확인 요청 |
| High | ✅ 오래된 주장 수정 | 해결 | `wiki/concepts/attention.md` Flash Attention 3 반영, `last_updated` 갱신 |
| High | ✅ 메타데이터 보완 | 해결 | `wiki/entities/claude-3.md` `sources`, `confidence` 필드 추가 |
| Medium | ⏳ 고아 페이지 | 대기 | `wiki/synthesis/llm-evolution.md` 인바운드 링크 0 — 관련 페이지에서 링크 추가 필요 |

**로그 기록**: `log.md` append 완료

---

## [2025-07-10] ingest | src-003, src-005 Scaling Laws 논문 2건 수집 | 영향 2개

**소스**:
- `src-003-scaling-laws.md` (Kaplan et al., 2020) — 파라미터/데이터/컴퓨트 스케일링 법칙
- `src-005-chinchilla.md` (Hoffmann et al., 2022) — Chinchilla 최적 배분 법칙

**생성/갱신 페이지**:
- `wiki/concepts/scaling-laws.md` — 두 법칙 수식 비교, 실무 적용 가이드
- `wiki/synthesis/llm-scaling-laws.md` — Kaplan vs Chinchilla 비교, 훈련 예산별 최적 모델 크기 가이드라인

**index.md** 갱신: 개념 1개, 합성 1개 추가

---

## [2025-07-01] maintenance | 초기 위키 구조 및 샘플 콘텐츠 생성 | 영향 0개

3계층 디렉토리 구조 생성:
```
ko/
├── sources/                 # 5개 소스 파일
├── wiki/
│   ├── entities/           # gpt-4.md, transformer.md, h100.md
│   ├── concepts/           # attention.md, scaling-laws.md
│   ├── synthesis/          # llm-scaling-laws.md
│   └── comparisons/        # (비어있음)
├── schema/CLAUDE.md
└── index.md, log.md
```

---

*다음 예정: 2025-07-23 주간 Lint*