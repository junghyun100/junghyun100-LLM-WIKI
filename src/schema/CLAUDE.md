# LLM Wiki — 스키마 및 운영 지침 (CLAUDE.md)

> 이 문서는 LLM이 위키를 유지관리하기 위한 **운영 계약서**입니다. LLM은 이 스키마를 따라야 하며, 사용자와 협의해 지속적으로 개선합니다.

---

## 1. 디렉토리 구조 (3계층 아키텍처)

```
├── sources/                 # [불변] 원본 소스 아카이브
│   ├── src-001-attention-is-all-you-need.md
│   ├── src-002-gpt-4-technical-report.md
│   └── ...
├── wiki/                    # [LLM 소유] 생성/갱신되는 위키 페이지
│   ├── entities/            # 핵심 대상 객체 (모델, 논문, 도구, 인물, 조직)
│   └── concepts/            # 핵심 원리/메커니즘 (Attention, RAG, MoE 등)
├── index.md                 # 콘텐츠 지향 카탈로그 (페이지 링크, 요약, 메타데이터)
├── log.md                   # 연대기 작업 로그 (ingest/query/lint 기록)
└── schema/                  # 스키마 및 템플릿
    ├── CLAUDE.md            # 이 파일 (운영 계약)
    └── templates/           # 페이지 템플릿 (con텐츠 컬렉션 밖: src/templates/)
```

> **참고**: synthesis/와 comparisons/ 디렉토리는 현재 사용하지 않음 (향후 필요시 추가)

---

## 2. 페이지 프론트매터 표준

모든 위키 페이지(`wiki/**/*.md`)는 다음 프론트매터를 **필수**로 가집니다.

```yaml
---
title: '페이지 제목'
description: '한 줄 요약 (검색/SEO용, 160자 이내)'
type: 'entity | concept'  # 2종류 중 하나
entity_type: 'model | paper | tool | person | organization'  # type=entity일 때만
sources: ['src-001', 'src-005']  # 참조한 소스 ID 배열
tags: ['tag1', 'tag2']  # 자유 태그 (소문자, 하이픈)
last_updated: 'YYYY-MM-DD'  # LLM이 최종 갱신한 날짜
confidence: 'high | medium | low'  # 정보 신뢰도
---
```

### 예시: 엔티티 페이지

```yaml
---
title: 'GPT-4'
description: 'OpenAI의 멀티모달 LLM, 1.76T 파라미터 추정'
type: 'entity'
entity_type: 'model'
sources: ['src-002', 'src-015', 'src-021']
tags: ['openai', 'multimodal', 'closed-source', '2023']
last_updated: '2025-07-16'
confidence: 'high'
---
```

### 예시: 개념 페이지

```yaml
---
title: 'Attention Mechanism'
description: 'Query-Key-Value 어텐션의 수학적 기초와 변형'
type: 'concept'
sources: ['src-001', 'src-006', 'src-019']
tags: ['foundational', 'architecture', 'math']
last_updated: '2025-07-16'
confidence: 'high'
---
```

---

## 3. 페이지 템플릿

템플릿 파일은 `src/templates/`에 별도 보관 (콘텐츠 컬렉션 프론트매터 검증 제외).

### 3.1 엔티티 템플릿 (`src/templates/entity.md`)

```markdown
---
# 프론트매터 (위 표준 준수)
---

# {{title}}

> {{description}}

## 개요
- **종류**: {{entity_type}}
- **개발사/저자**: 
- **공개일**: 
- **라이선스**: 
- **주요 특징**: 

## 상세 스펙
| 항목 | 값 |
|------|-----|
| 파라미터 수 |  |
| 컨텍스트 길이 |  |
| 모달리티 |  |
| 학습 데이터 |  |
| 벤치마크 |  |

## 아키텍처/설계 특징

## 강점 / 약점

## 관련 엔티티
- [[연관 엔티티 1]] — 관계 설명
- [[연관 엔티티 2]] — 관계 설명

## 참조 소스
{% for src in sources %}
- [{{src}}](../sources/{{src}}.md)
{% endfor %}

## 변경 이력
- {{last_updated}}: 초기 생성 / 주요 업데이트
```

### 3.2 개념 템플릿 (`src/templates/concept.md`)

```markdown
---
# 프론트매터 (위 표준 준수)
---

# {{title}}

> {{description}}

## 정의
핵심 개념을 2-3문장으로 정의.

## 수학적/알고리즘적 기초
수식, 의사코드, 다이어그램 설명 포함.

## 주요 변형/확장
- 변형 1: 설명
- 변형 2: 설명

## 실무 적용 고려사항
- 장점
- 단점/한계
- 대안

## 관련 개념
- [[관련 개념 1]] — 관계
- [[관련 개념 2]] — 관계

## 참조 소스
{% for src in sources %}
- [{{src}}](../sources/{{src}}.md)
{% endfor %}

## 변경 이력
- {{last_updated}}: 초기 생성 / 주요 업데이트
```

---

## 4. 원본 소스 아카이브 규칙 (`sources/`)

### 4.1 명명 규칙
```
src-{번호:03d}-{짧은-설명}.md
예: src-001-attention-is-all-you-need.md
```

### 4.2 소스 파일 프론트매터
```yaml
---
source_id: 'src-001'
title: 'Attention Is All You Need'
authors: ['Vaswani et al.']
venue: 'NeurIPS 2017'
year: 2017
url: 'https://arxiv.org/abs/1706.03762'
type: 'paper'  # paper | article | blog | video | code | doc
tags: ['foundational', 'attention', 'transformer']
ingested_at: '2025-07-01'
ingested_by: 'claude'
content_hash: 'sha256:...'  # 원본 콘텐츠 해시 (중복 방지)
---
```

### 4.3 소스 콘텐츠 구성
- **논문**: 초록, 핵심 그림/표 설명, 주요 수식, 한계점, 인용문
- **아티클/블로그**: 요약, 핵심 주장, 데이터 포인트, 링크
- **코드/문서**: 주요 API, 설정 예시, 아키텍처 노트

> 원본 텍스트 전체 저장 권장 (저작권 허용 범위 내). 요약본과 함께 보관.

---

## 5. 운영 워크플로

### 5.1 Ingest (소스 수집 → 위키 통합)
```
입력: 새 소스 파일(들) + 사용자 지시
절차:
  1. sources/src-XXX.md 생성 (프론트매터 + 콘텐츠)
  2. 소스 읽기 → 핵심 정보 추출
  3. 기존 위키 페이지 스캔 (index.md, 관련 페이지들)
  4. 영향 받는 페이지 식별:
     - 신규 엔티티/개념 → 새 페이지 생성 (템플릿 사용)
     - 기존 페이지 → 업데이트 (내용 보강, 소스 추가, 날짜 갱신)
     - 모순 발견 → 플래그 표시, 사용자 확인 요청
  5. index.md 업데이트 (카탈로그 갱신)
  6. log.md append — `[YYYY-MM-DD] ingest | 소스 제목 | 영향 페이지 N개`
출력: 변경 사항 요약 + 사용자 리뷰 요청
```

### 5.2 Query (질의 → 위키 기반 답변)
```
입력: 사용자 질문
절차:
  1. index.md 읽기 → 관련 페이지 후보 선정
  2. 후보 페이지들 읽기 (전체 또는 섹션)
  3. 정보 종합 → 답변 작성 (인용 포함: [[페이지]] 또는 [src-XXX])
  4. 답변이 가치 있으면 → 새 synthesis/comparison 페이지로 저장 제안
  5. log.md append — `[YYYY-MM-DD] query | 질문 요약 | 참조 페이지 N개`
출력: 답변 + (선택) 새 페이지 저장 제안
```

### 5.3 Lint (위키 건강도 점검)
```
주기: 주 1회 또는 주요 ingest 후
점검 항목:
  1. 모순 탐지 — 동일 주제 상충 주장 스캔
  2. 오래된 주장 — 최신 소스로 대체 필요 표시
  3. 고아 페이지 — 인바운드 링크 0개인 페이지
  4. 누락 교차참조 — 관련 페이지 간 링크 부재
  5. 메타데이터 완전성 — 프론트매터 필수 필드 누락
  6. 신뢰도 분포 — low confidence 페이지 우선 검토
  7. 커버리지 갭 — 중요 개념/엔티티 누락 여부 (웹 검색 보완 제안)
로그: log.md append — `[YYYY-MM-DD] lint | 발견 이슈 N건 | 조치 내역`
```

---

## 6. 인덱스 & 로그 유지 규칙

### 6.1 index.md (콘텐츠 카탈로그)
- **갱신 시점**: 모든 ingest 후
- **구조**: 카테고리별 표 (페이지, 요약, 소스 수, 최종 갱신)
- **정렬**: 최종 갱신일 내림차순
- **메타데이터**: 소스 수, confidence 분포 표시

### 6.2 log.md (연대기 로그)
- **형식**: `## [YYYY-MM-DD] type | 설명`
- **타입**: `ingest` | `query` | `lint` | `schema` | `maintenance`
- **파싱 가능**: `grep "^## \[" log.md` 로 전체 항목 추출 가능
- **상세**: 영향받은 페이지, 소스 ID, 주요 변경사항 포함

---

## 7. 네이밍 & 링크 컨벤션

| 대상 | 규칙 |
|------|------|
| 위키 페이지 파일명 | `kebab-case.md` (소문자, 하이픈) |
| 엔티티 페이지 | `wiki/entities/{name}.md` |
| 개념 페이지 | `wiki/concepts/{name}.md` |
| 내부 링크 | `[[페이지 제목]]` 또는 상대 경로 `[텍스트](../wiki/entities/gpt-4.md)` |
| 소스 참조 | `[src-XXX](../sources/src-XXX.md)` |
| 태그 | 소문자, 하이픈 구분 (`multi-modal`, `open-source`) |

---

## 8. 품질 기준

| 기준 | 설명 |
|------|------|
| **단일 진실원천** | 동일 사실에 대한 진술은 한 페이지에만. 중복 시 합성 페이지로 통합. |
| **추적 가능성** | 모든 주장은 `sources` 배열로 소스 연결. |
| **최신성** | `last_updated` 6개월 초과 시 lint 시 플래그. |
| **모순 금지** | 상충하는 주장 발견 시 즉시 플래그, 비교 페이지에서 논의. |
| **원자성** | 한 페이지 = 한 엔티티/개념/주제. 너무 크면 분할. |
| **교차참조** | 관련 개념/엔티티 간 양방향 링크 필수. |

---

## 9. 도구 지원 (선택 사항)

| 도구 | 용도 | 비고 |
|------|------|------|
| `scripts/ingest-helper.py` | 소스→위키 매핑 제안 | LLM 프롬프트 구성 보조 |
| `scripts/lint-check.py` | 메타데이터/링크 자동 검증 | CI 연동 가능 |
| `scripts/index-gen.py` | `index.md` 자동 갱신 | 템플릿 기반 |
| `qmd` | 로컬 하이브리드 검색 (BM25 + 벡터) | MCP 서버로 LLM 연동 가능 |
| `obsidian` | 위키 탐색, 그래프 뷰, 캔버스 | 로컬 폴더 열기로 사용 |
| `dataview` (Obsidian 플러그인) | 프론트매터 기반 동적 테이블/쿼리 | 태그/날짜/소스 필터링 |
| `marp` | 마크다운 → 슬라이드 변환 | 합성 페이지 발표용 |
| `git` | 버전 관리, 변경 이력 | 모든 변경 커밋 권장 |

---

## 10. 스키마 진화 프로세스

1. **변경 제안**: 사용자 또는 LLM이 이슈/PR로 제안
2. **영향 분석**: 기존 페이지 마이그레이션 필요 여부 평가
3. **합의**: 사용자 승인
4. **적용**: `schema/` 업데이트 + 기존 페이지 일괄 마이그레이션 (스크립트 권장)
5. **로그 기록**: `[YYYY-MM-DD] schema | 변경 요약 | 영향 페이지 N개`

---

## 부록: 빠른 참조 프롬프트

> LLM에게 작업을 지시할 때 이 섹션을 복사해 컨텍스트로 주입하세요.

### Ingest 프롬프트
```
당신은 LLM Wiki 유지관리자입니다. 다음 소스를 ingest하세요:
- 소스 파일: sources/src-XXX.md
- 위키 스키마: schema/CLAUDE.md (이 문서)

절차:
1. 소스 읽기 및 핵심 정보 추출
2. index.md로 기존 관련 페이지 확인
3. 필요한 페이지 생성/갱신 (템플릿 준수)
4. index.md, log.md 갱신
5. 변경 요약 보고

모순 발견 시 즉시 보고하고 사용자 확인 대기.
```

### Query 프롬프트
```
당신은 LLM Wiki 기반 QA 어시스턴트입니다.
- index.md 읽고 관련 페이지 탐색
- 위키 페이지 내용만으로 답변 (외부 지식 사용 금지, 단 사용자 명시 시 예외)
- 인용 필수: [[페이지명]] 또는 [src-XXX]
- 답변이 재사용 가치 높으면 새 페이지 저장 제안
```

### Lint 프롬프트
```
당신은 LLM Wiki 감사관입니다. 전체 위키를 스캔해 다음을 점검하세요:
1. 모순 탐지 (동일 주제 상충 주장)
2. 오래된 주장 (최신 소스와 비교)
3. 고아 페이지 (인바운드 링크 0)
4. 누락 교차참조
5. 메타데이터 누락
6. 저신뢰도 페이지 (confidence: low)
7. 커버리지 갭 (중요 개념 누락)

결과를 log.md에 append하고, 사용자에게 조치 필요 항목 보고.
```

---

*마지막 업데이트: 2025-07-16*
*버전: 1.0.0*