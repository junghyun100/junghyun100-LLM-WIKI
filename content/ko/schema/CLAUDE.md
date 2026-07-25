# LLM Wiki 운영 계약서

> 이 문서는 LLM이 3계층 위키(Sources → Wiki → Schema)를 운영할 때 따라야 할 **불변 규칙**입니다. 스키마 변경 시 `log.md`에 기록하고 사용자 승인 필요.

---

## 1. 계층별 역할과 권한

| 계층 | 경로 | 변경 주체 | 변경 권한 | 불변성 |
|------|------|-----------|-----------|--------|
| **Sources** | `content/ko/sources/` | 사람 | 읽기만 허용 | ✅ 절대 불변 |
| **Wiki** | `content/ko/wiki/` | LLM | 생성/수정/삭제 | ⚠️ Lint 통과 시에만 |
| **Schema** | `content/ko/schema/` | 사람 + LLM 협의 | 사람 승인 후 LLM 적용 | 🔒 변경 시 로그 필수 |

---

## 2. 프론트매터 표준 (Wiki 전 페이지 필수)

### 공통 필드 (4 유형 공통)
```yaml
---
title: '페이지 제목'
description: '한 줄 요약 (<=160자)'
type: 'entity | concept | synthesis | comparison'
sources: ['src-001', 'src-003']
tags: ['tag1', 'tag2']
last_updated: 'YYYY-MM-DD'
confidence: 'high | medium | low'
aliases: ['별칭1', '별칭2']
---
```

### Entity 전용 필드
```yaml
entity_type: 'model | paper | tool | person | organization'
```

### 필드 상세 규칙

| 필드 | 규칙 | 검증 |
|------|------|------|
| `title` | 고유해야 함, 중복 시 Lint 에러 | `lint-check.ts` |
| `description` | 160자 이하, 마침표 없이 | `lint-check.ts` |
| `type` | 4값 중 하나만 | `lint-check.ts` |
| `entity_type` | 5값 중 하나만 (entity만) | `lint-check.ts` |
| `sources` | `src-XXX` 형식, 실제 존재하는 소스만 | `lint-check.ts` |
| `tags` | `kebab-case`, 영문 소문자/숫자/하이픈 | `lint-check.ts` |
| `last_updated` | ISO 8601 날짜, 오늘 또는 과거 | `lint-check.ts` |
| `confidence` | 3값 중 하나만 | `lint-check.ts` |

---

## 3. 4가지 페이지 템플릿

> 템플릿은 `prompts/` 디렉토리의 시스템 프롬프트에 내장됨. LLM은 템플릿 구조를 준수해 생성.

### 3.1 Entity 템플릿 (`entity.md`)
```markdown
# {title}

> {description} — **{entity_type}**

## 개요
- **종류**: {entity_type}
- **주요 특징**: {핵심 3-5줄}

## 상세 스펙
| 항목 | 값 |
|------|-----|
| ...  | ... |

## 강점 / 약점
| 강점 | 약점 |
|------|------|
| ...  | ...  |

## 관련 엔티티
- [[Entity명]] — 관계 설명
- [[Entity명]] — 관계 설명

## 관련 개념
- [[Concept명]] — 관계 설명

## 참조 소스
- [src-XXX](../sources/src-XXX.md) — 소스 제목
- [src-YYY](../sources/src-YYY.md) — 소스 제목

## 변경 이력
- YYYY-MM-DD: 초기 생성 / 주요 변경 내용
```

### 3.2 Concept 템플릿 (`concept.md`)
```markdown
# {title}

> {description}

## 정의
{핵심 정의 3-5문장}

## 수학적/알고리즘적 기초
```math
수식/의사코드
```

## 주요 변형/확장
| 변형 | 핵심 아이디어 | 장점 |
|------|---------------|------|
| ...  | ...           | ...  |

## 실무 적용 고려사항
### 장점
- ...
### 단점/한계
- ...
### 대안
- ...

## 관련 개념
- [[Concept명]] — 관계 설명
- [[Entity명]] — 관계 설명

## 참조 소스
- [src-XXX](../sources/src-XXX.md) — 소스 제목

## 변경 이력
- YYYY-MM-DD: 초기 생성 / 주요 변경 내용
```

### 3.3 Synthesis 템플릿 (`synthesis.md`)
```markdown
# {title}

> {description}

## 배경/동기
{왜 이 종합 분석이 필요한가}

## 시계열 진화 / 논쟁 전개
| 시기 | 주요 이벤트/주장 | 소스 |
|------|------------------|------|
| ...  | ...              | ...  |

## 핵심 합의사항
- 합의 1 — 근거 소스
- 합의 2 — 근거 소스

## 미해결 논쟁점
| 논쟁점 | 입장 A (소스) | 입장 B (소스) | 현황 |
|--------|---------------|---------------|------|
| ...    | ...           | ...           | ...  |

## 베스트 프랙티스 / 가이드라인
1. 가이드 1 — 근거
2. 가이드 2 — 근거

## 관련 엔티티/개념
- [[Entity/Concept]] — 관계

## 참조 소스
- [src-XXX](../sources/src-XXX.md) — 소스 제목

## 변경 이력
- YYYY-MM-DD: 초기 생성 / 주요 변경 내용
```

### 3.4 Comparison 템플릿 (`comparison.md`)
```markdown
# {title}

> {description}

## 비교 대상
| 대상 | 유형 | 비고 |
|------|------|------|
| A    | ...  | ...  |
| B    | ...  | ...  |

## 정량 비교 (스펙/벤치마크)
| 지표 | A | B | 비고 |
|------|---|---|------|
| ...  |... |...| ...  |

## 정성 비교 (트레이드오프)
| 차원 | A | B | 평가 |
|------|---|---|------|
| ...  |...|...| ...  |

## 추천 시나리오
| 상황 | 추천 | 근거 |
|------|------|------|
| ...  | ...  | ...  |

## 관련 엔티티/개념
- [[Entity/Concept]] — 관계

## 참조 소스
- [src-XXX](../sources/src-XXX.md) — 소스 제목

## 변경 이력
- YYYY-MM-DD: 초기 생성 / 주요 변경 내용
```

---

## 4. 네이밍 & 링크 컨벤션

### 파일명
```
wiki/entities/{kebab-case-name}.md
wiki/concepts/{kebab-case-name}.md
wiki/synthesis/{kebab-case-name}.md
wiki/comparisons/{kebab-case-name}.md
sources/src-{3자리번호}-{kebab-case-title}.md
```
- 소문자, 하이픈만 허용
- 엔티티: `gpt-4`, `pytorch`, `openai`
- 개념: `attention-mechanism`, `retrieval-augmented-generation`
- 소스: `src-001-attention-is-all-you-need`

### 내부 링크 (필수)
```markdown
# 위키 페이지 참조 — 제목 기반 (Crawl-links가 자동 해결)
[[GPT-4]]
[[Attention Mechanism]]

# 소스 참조 — 상대 경로
[src-001](../sources/src-001-attention-is-all-you-need.md)

# 섹션 참조
[[GPT-4#개요]]
```

### 태그 컨벤션
- 도메인: `architecture`, `training`, `inference`, `evaluation`, `data`
- 출처: `paper`, `blog`, `doc`, `code`, `video`
- 특성: `foundational`, `sota`, `open-source`, `closed-source`, `multimodal`
- 기법: `lora`, `qlora`, `rag`, `mcp`, `reasoning`, `moe`

---

## 5. 워크플로 3종 (요약 — 상세는 `workflow.md`)

### 5.1 Ingest — 소스 수집 → 위키 통합
```
1. sources/src-XXX.md 생성 (스키마 §2 준수)
2. 소스 읽기 → 핵심 정보 추출
3. index.md로 기존 관련 페이지 스캔
4. 영향 페이지 식별:
   - 신규 → 템플릿으로 생성
   - 기존 → 내용 보강 + sources 추가 + last_updated 갱신
   - 모순 발견 → 즉시 플래그, 사용자 대기 (임의 해결 금지)
5. index.md 갱신 (last_updated 내림차순)
6. log.md 기록 (파싱 가능 형식)
```

### 5.2 Query — 질의 → 위키 기반 답변
```
1. index.md로 후보 페이지 선정
2. 후보 페이지 읽기 (+필요시 sources 참조)
3. 답변 작성 — 인용 필수: [[페이지]] 또는 [src-XXX]
4. 외부 지식 혼입 금지 (명시적 허용 시 예외)
5. 답변 가치 높으면 synthesis/comparison 페이지화 제안
6. log.md 기록
```

### 5.3 Lint — 위키 건강도 점검
```
주기: 주 1회 + 주요 ingest 직후
7대 체크:
  1. 모순 탐지 (Critical) — 동일 주제 상충 주장
  2. 오래된 주장 (High) — 6개월 초과 + 최신 소스 존재
  3. 고아 페이지 (Medium) — 인바운드 링크 0
  4. 누락 교차참조 (Medium) — 관련도 높은 페이지 간 링크 부재
  5. 메타데이터 완전성 (High) — 필수 필드 누락
  6. 신뢰도 분포 (Medium) — low 집중 검토
  7. 커버리지 갭 (Low) — 중요 토픽 누락
결과 → log.md 상세 기록, Critical/High는 사용자 리뷰 요청
```

---

## 6. 품질 기준 (Lint 통과 조건)

| 기준 | 설명 | 미통과 시 |
|------|------|-----------|
| **단일 진실원천** | 동일 사실은 한 페이지에만. 중복 시 synthesis로 통합 | Lint 에러 |
| **추적가능성** | 모든 주장은 `sources`로 연결 | Lint 에러 |
| **최신성** | `last_updated` 6개월 초과 시 플래그 | Lint 경고 |
| **모순 금지** | 상충 주장 발견 시 즉시 플래그, 비교 페이지에서 논의 | Lint 에러 |
| **원자성** | 한 페이지 = 한 엔티티/개념/주제. 과대 시 분할 | 작성 시 준수 |
| **교차참조** | 관련 엔티티/개념 간 양방향 링크 필수 | Lint 경고 |

---

## 7. 스키마 진화 프로세스

```
1. 변경 제안 (Issue 또는 직접 편집)
   → 영향 범위 분석 (기존 페이지, 템플릿, 스크립트)
2. 사용자 리뷰 및 승인
3. CLAUDE.md 수정 (이 문서)
4. 영향받은 템플릿/스크립트 동기화
5. 기존 페이지 일괄 마이그레이션 (스크립트 권장)
6. log.md: `## [YYYY-MM-DD] schema | 변경 요약 | 영향 N페이지`
7. Lint 실행으로 검증
```

---

## 8. 로그 형식 (log.md)

```markdown
## [YYYY-MM-DD] type | 제목 | 영향 N개
- 신규: wiki/type/page-name.md
- 갱신: wiki/type/page-name.md (sources 추가, last_updated 갱신)
- 소스: src-XXX
- 모순: 없음 / 발견 시 상세
- 비고: 특이사항

# type: ingest | query | lint | schema | maintenance
```

---

## 9. 금지 사항 (절대 위반 시 Lint 에러)

| 금지 사항 | 이유 |
|-----------|------|
| Sources 계층 수정/삭제 | 불변 아카이브 위반 |
| `sources` 빈 배열 | 추적가능성 상실 |
| 모순 발견 시 임의 해결 | 단일 진실원천 위반 |
| `last_updated` 미갱신하면서 내용 변경 | 최신성 추적 불가 |
| 외부 지식 혼입 (Query 시) | 위키 독립성 훼손 |
| 템플릿 구조 임의 변경 | 일관성 상실 |
| `confidence: high`를 근거 없이 남발 | 신뢰도 시스템 무력화 |

---

## 10. 예외 처리

| 상황 | 처리 |
|------|------|
| 소스 저작권 문제로 전체 저장 불가 | 요약 + 핵심 발췌 + 원본 URL만 저장 |
| 모순이지만 즉시 해결 필요 | 비교 페이지 생성 후 양측 주장 병기, `confidence: low` |
| 중요 페이지인데 소스 부재 | `confidence: low` 명시, `sources: []` 허용 (예외적) |
| 템플릿에 없는 섹션 필요 | 자유 섹션 추가 허용 단, 템플릿 필수 섹션은 유지 |

---

*버전: 1.0.0 | 최종 갱신: 2026-07-25 | 승인: Junghyun*