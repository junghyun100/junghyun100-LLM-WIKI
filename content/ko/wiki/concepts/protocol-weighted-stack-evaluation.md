---
title: 'Protocol Weighted Stack Evaluation'
description: '기술 스택 후보를 10개 차원에서 1~5 채점 후 가중 합산해 최적 스택을 선정하는 수식과 차원별 정의'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'stack-evaluation', 'decision-making', 'architecture', 'technology-selection', 'ai-orchestration']
last_updated: '2026-07-25'
confidence: 'high'
---

# Protocol Weighted Stack Evaluation

> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)  
> **상위 개념**: [[Autonomous Product Discovery-to-Delivery Protocol]]  
> **사용 위치**: [[Protocol Workflow State Machine]]의 `ARCHITECTURE` 단계에서 스택 선정 시 적용

---

## 평가 수식 (Evaluation Formula)

```
Score = Σ(score_i × weight_i) / Σ(weights)

where:
  score_i ∈ {1, 2, 3, 4, 5}  # 각 차원별 채점 (1=매우 부적합, 5=최적)
  weight_i ∈ ℕ                # 차원별 가중치 (기본값 아래 표 참조)
```

**최종 점수 범위**: 1.0 ~ 5.0 (높을수록 적합)

---

## 차원별 기본 가중치 (Default Weights)

| 차원 | 가중치 | 비중(%) | 설명 |
|------|--------|---------|------|
| **필수 UX 적합성** | 20 | 18.5% | 핵심 사용자 경험(실시간성, 오프라인, 반응성 등)을 충족하는가 |
| **기존 작업공간 적합성** | 15 | 13.9% | 현재 코드베이스, 인프라, 팀 스택과의 호환성 |
| **납기 속도** | 15 | 13.9% | 구현~배포까지 리드타임 단축 기여도 |
| **운영 단순성** | 10 | 9.3% | 배포/모니터링/장애복구 복잡도 낮음 |
| **보안** | 10 | 9.3% | 인증/인가/암호화/컴플라이언스 내재화 수준 |
| **테스트 용이성** | 10 | 9.3% | 단위/통합/E2E 테스트 작성·실행·유지보수 용이성 |
| **유지보수성** | 10 | 9.3% | 코드 가독성, 모듈화, 기술 부채 누적 억제력 |
| **비용** | 5 | 4.6% | 라이선스, 인프라, 인건비 등 총소유비용(TCO) |
| **생태계 성숙도** | 5 | 4.6% | 커뮤니티, 문서, 써드파티 라이브러리, 인재 풀 |
| **총합** | **100** | **100%** | |

> **커스터마이징**: 프로젝트 특성에 따라 가중치 조정 가능. 단, 변경 시 `DECISION_LOOP`에서 `RECOMMEND` 클래스로 기록 필수.

---

## 채점 가이드 (Score Rubric)

| 점수 | 의미 | 판단 기준 예시 |
|------|------|----------------|
| **5** | **이상적 적합** | 해당 차원에서 명백한 최적 선택, 트레이드오프 거의 없음 |
| **4** | **양호** | 전반적 우수, 미세한 우려 1개 이하 |
| **3** | **보통** | 장단점 균형, 프로젝트 문맥에 따라 수용 가능 |
| **2** | **부적합** | 명확한 단점 존재, 완화 대책 필요 |
| **1** | **부적절** | 치명적 결함(보안 홀, 지원 중단, 팀 스킬 갭 등) |

---

## 평가 시트 예시 (Scorecard Template)

| 후보 | 필수 UX 적합성 (20) | 기존 Workspace 적합성 (15) | 납기 속도 (15) | 운영 단순성 (10) | 보안 (10) | 테스트 용이성 (10) | 유지보수성 (10) | 비용 (5) | 생태계 (5) | **가중 합계** | **정규화(÷100)** |
|------|-------------------|--------------------------|---------------|----------------|----------|------------------|---------------|----------|-----------|--------------|----------------|
| **A: Next.js + Vercel + Supabase** | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 5 | **445** | **4.45** |
| **B: React + Vite + AWS + RDS** | 4 | 5 | 3 | 3 | 5 | 4 | 4 | 3 | 4 | **395** | **3.95** |
| **C: SvelteKit + Cloudflare + D1** | 4 | 2 | 4 | 4 | 4 | 3 | 3 | 5 | 3 | **355** | **3.55** |

---

## 적용 프로세스 (ARCHITECTURE 단계)

1. **후보 리스트업** — `RESEARCH` 단계에서 수집한 3~5개 스택 조합
2. **차원별 채점** — 각 평가자(아키텍트, 리드, 옵스) 독립 채점 → 평균
3. **가중 합산** — 위 수식 적용
4. **상위 2개 `RECOMMEND`** — 1위 추천, 2위 대안으로 `DECISION_LOOP`에 제시
5. **사용자 확인** — `MANDATORY` 클래스 결정(예: 클라우드 벤더 락인) 별도 분리

---

## 관련 개념

- [[Autonomous Product Discovery-to-Delivery Protocol]] — 상위 프로토콜 개요
- [[Protocol Workflow State Machine]] — ARCHITECTURE 단계에서 본 평가 적용
- [[Protocol Decision Classification]] — 평가 결과는 `RECOMMEND` 클래스 결정으로 기록
- [[Protocol Specification Readiness Gate]] — 스택 선정 근거는 사양 준비도 점수의 "아키텍처 및 도메인" 영역에 반영

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — §3. 기술 스택 가중 평가 수식

---

## 변경 이력

- 2026-07-25: src-001에서 분해 생성