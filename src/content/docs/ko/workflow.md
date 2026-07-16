---
title: '운영 워크플로 — Ingest/Query/Lint 상세 절차'
description: 'LLM Wiki 3대 핵심 워크플로우 단계별 실행 가이드와 체크리스트'
---

# 운영 워크플로 — Ingest / Query / Lint

LLM Wiki의 3대 핵심 워크플로우입니다. `schema/CLAUDE.md`의 §5를 실무 중심으로 정리했습니다.

---

## 1. Ingest — 소스 수집 → 위키 통합

### 목적
새로운 원본 소스를 수집하고, 핵심 정보를 추출해 위키 페이지를 생성/갱신합니다.

### 트리거
- 새 논문/블로그/문서 발견 시
- 사용자 요청: `"sources/src-XXX.md를 ingest해줘"`

### 사전 조건
- `sources/src-XXX.md` 파일이 스키마(§4.2)에 맞게 생성됨
- `schema/CLAUDE.md` 템플릿 숙지

---

### 단계별 절차

#### Step 1: 소스 파일 생성
```bash
# 파일명 규칙: src-{번호:03d}-{짧은-설명}.md
cp schema/templates/source-template.md sources/src-006-new-paper.md
```
메타데이터(§4.2) 작성 후 콘텐츠 채우기.

#### Step 2: 소스 읽기 및 정보 추출
- 소스 파일 전체 읽기
- 핵심 정보 분류:
  - 새로운 엔티티/개념 식별
  - 기존 페이지 업데이트 필요 항목
  - 모순/상충 주장 발견 여부

#### Step 3: 기존 위키 스캔
- `index.md` 읽기 → 관련 페이지 후보 선정
- 후보 페이지들 읽기 (전체 또는 관련 섹션)

#### Step 4: 영향 페이지 식별 및 처리

| 상황 | 조치 |
|------|------|
| **새 엔티티/개념** | 해당 템플릿(`entity.md`/`concept.md`)으로 새 페이지 생성 |
| **기존 페이지 업데이트** | 내용 보강, `sources`에 추가, `last_updated` 갱신 |
| **모순 발견** | 즉시 플래그 표시, 사용자 확인 대기 (절대 임의 해결 금지) |

#### Step 5: index.md 갱신
- 새 페이지 카탈로그에 추가
- 업데이트된 페이지의 `last_updated`, 소스 수 반영
- 정렬: `last_updated` 내림차순

#### Step 6: log.md 기록
```markdown
## [2025-07-16] ingest | Flash Attention 3 논문 추가 | 영향 페이지 3개
- 신규: wiki/concepts/flash-attention.md
- 갱신: wiki/concepts/attention-mechanism.md, wiki/entities/h100.md
- 소스: src-004
- 모순: 없음
```

#### Step 7: 변경 요약 보고
사용자에게 영향 페이지 수, 신규/갱신 내역, 모순 여부 보고.

---

### Ingest 체크리스트

- [ ] `sources/src-XXX.md` 메타데이터 완전성 확인
- [ ] 소스에서 핵심 정보 추출 완료
- [ ] `index.md`로 기존 관련 페이지 스캔 완료
- [ ] 신규 페이지 템플릿 준수 생성
- [ ] 기존 페이지 업데이트: 내용 + sources + last_updated
- [ ] 모순 발견 시 즉시 보고 (자체 해결 X)
- [ ] `index.md` 카탈로그 갱신
- [ ] `log.md` 파싱 가능 형식으로 append

---

## 2. Query — 질의 → 위키 기반 답변

### 목적
위키 지식을 활용해 사용자 질문에 답변합니다. 외부 지식 사용 금지(명시적 허용 시 예외).

### 트리거
- 사용자 질문: `"RAG 청킹 전략 추천해줘"`

---

### 단계별 절차

#### Step 1: index.md 읽기 및 후보 선정
- 카탈로그에서 관련 카테고리/페이지 식별
- `tags`, `description`, `type` 기반 필터링

#### Step 2: 후보 페이지 읽기
- 선정된 페이지 전체 또는 관련 섹션 읽기
- 필요시 `sources` 참조로 원본 확인

#### Step 3: 정보 종합 및 답변 작성
- **인용 필수**: `[[페이지명]]` 또는 `[src-XXX]`
- 위키 내용만으로 답변 (외부 지식 혼입 금지)
- 불확실하면 `confidence: low` 페이지 명시

#### Step 4: 답변 가치 평가 → 페이지화 제안
| 조건 | 조치 |
|------|------|
| 재사용 가치 높음 | 새 `synthesis`/`comparison` 페이지 저장 제안 |
| 단순 조회 | 답변만 제공 |
| 위키에 정보 없음 | "위키에 관련 정보 없음" 명시, 외부 검색 제안 |

#### Step 5: log.md 기록
```markdown
## [2025-07-16] query | RAG 청킹 전략 비교 | 참조 페이지 3개
- 질문: "RAG에서 청킹 전략별 장단점 비교해줘"
- 참조: wiki/concepts/rag.md, wiki/comparisons/chunking-strategies.md, src-003
- 제안: wiki/comparisons/rag-chunking-strategies.md 신규 생성 가치 있음
```

---

### Query 체크리스트

- [ ] `index.md`로 후보 페이지 선정
- [ ] 후보 페이지 내용 읽기 완료
- [ ] 답변에 인용 포함 (`[[페이지]]` 또는 `[src-XXX]`)
- [ ] 외부 지식 혼입 여부 자가 검증
- [ ] 답변 가치 높으면 페이지화 제안
- [ ] `log.md` 기록

---

## 3. Lint — 위키 건강도 점검

### 목적
위키의 일관성, 최신성, 완결성을 주기적으로 검증합니다.

### 주기
- **주 1회** 정기 실행
- 주요 `ingest` 후 즉시 실행 권장

---

### 점검 항목 (7대 체크)

| # | 항목 | 설명 | 심각도 | 조치 |
|---|------|------|--------|------|
| 1 | **모순 탐지** | 동일 주제 상충 주장 스캔 | Critical | 비교 페이지 생성 또는 플래그 |
| 2 | **오래된 주장** | `last_updated` 6개월 초과 + 최신 소스 존재 | High | 최신 소스로 업데이트 또는 low 표시 |
| 3 | **고아 페이지** | 인바운드 링크 0개 페이지 | Medium | 링크 추가 또는 병합/삭제 제안 |
| 4 | **누락 교차참조** | 관련성 높은 페이지 간 링크 부재 | Medium | 양방향 링크 추가 |
| 5 | **메타데이터 완전성** | 프론트매터 필수 필드 누락 | High | 즉시 보완 |
| 6 | **신뢰도 분포** | `confidence: low` 페이지 집중 검토 | Medium | 우선 업데이트 또는 소스 보강 |
| 7 | **커버리지 갭** | 중요 개념/엔티티 누락 (웹 검색 보완 제안) | Low | 신규 페이지 생성 제안 |

---

### 단계별 절차

#### Step 1: 전체 스캔
```bash
# 프론트매터 추출 스크립트 예시
grep -r "^---$" wiki/ -A 20 | ...
```

#### Step 2: 자동화 가능한 검증 실행
- 메타데이터 완전성 (스크립트)
- 깨진 링크 (링크 체커)
- `last_updated` 경과 계산

#### Step 3: 의미적 검증 (LLM 수행)
- 모순 탐지: 동일 엔티티/개념 다중 페이지 교차 비교
- 커버리지 갭: 도메인 지식 기반 중요 토픽 체크리스트와 대조

#### Step 4: 결과 분류 및 기록
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

#### Step 5: 사용자 리뷰 요청
Critical/High 이슈는 사용자 확인 후 조치.

---

### Lint 체크리스트

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

## 워크플로 간단 비교표

| 구분 | Ingest | Query | Lint |
|------|--------|-------|------|
| **주체** | LLM | LLM | LLM (+자동화) |
| **입력** | 새 소스 파일 | 사용자 질문 | 전체 위키 |
| **출력** | 위키 변경 + 로그 | 답변 (+페이지 제안) | 이슈 리스트 + 로그 |
| **빈도** | 소스 추가 시 | 질문 시 | 주 1회 + 주요 ingest 후 |
| **핵심 제약** | 모순 시 중단 | 외부 지식 금지 | 파싱 가능 로그 필수 |
| **로그 형식** | `ingest \| 제목 \| N페이지` | `query \| 요약 \| N페이지` | `lint \| N이슈 \| 조치` |

---

## 자동화 지원 (선택)

| 도구 | 용도 | 비고 |
|------|------|------|
| `scripts/ingest-helper.py` | 소스→위키 매핑 제안 | LLM 프롬프트 구성 보조 |
| `scripts/lint-check.py` | 메타데이터/링크 자동 검증 | CI 연동 가능 |
| `scripts/index-gen.py` | `index.md` 자동 갱신 | 템플릿 기반 |

> `src/templates/` 아래 템플릿 파일 참고. 필요시 스크립트화 권장.

---

*이 워크플로는 `schema/CLAUDE.md` §5의 실무 가이드입니다. 변경 시 CLAUDE.md와 동기화 필요.*