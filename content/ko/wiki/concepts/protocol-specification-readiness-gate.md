---
title: 'Protocol Specification Readiness Gate'
description: 'Autonomous Product Discovery-to-Delivery Protocol의 사양 준비도 점수(9영역, 가중치, 최소점수 80%, 통과조건 95/100)'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'spec-readiness', 'quality-gate', 'specification', 'product-development']
last_updated: '2026-07-25'
confidence: 'high'
---

# Protocol Specification Readiness Gate

> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)  
> **상위 개념**: [[Autonomous Product Discovery-to-Delivery Protocol]]

---

## 목적

`SPEC_AUDIT` 상태에서 사양 문서가 구현 착수(`SPEC_REVIEW` → `ORCHESTRATION_PLAN`)에 충분한지 **정량적으로 판정**하는 게이트입니다.

---

## 9영역 가중치 테이블

| # | 영역 | 가중치 | 최소 점수 | 평가 포인트 |
|---|------|--------|-----------|-------------|
| 1 | **제품 및 범위** | 15 | 80% | 문제 정의, 대상 사용자, 성공 지표(KPI), 범위 내/외 명시 |
| 2 | **사용자 여정 및 UX** | 10 | 80% | 핵심 플로우, 와이어프레임/목업, 접근성, 에러/빈 상태 |
| 3 | **기능 요구사항** | 15 | 80% | 유스케이스, 인수조건, 예외 플로우, 비기능(성능/보안) |
| 4 | **아키텍처 및 도메인** | 15 | 80% | 컴포넌트 다이어그램, 데이터 모델, 도메인 경계, 기술 스택(스택 평가 참조) |
| 5 | **데이터, 보안, 프라이버시** | 10 | 80% | 데이터 분류, 암호화, 접근제어, PII 처리, 컴플라이언스 |
| 6 | **통합 및 운영** | 10 | 80% | 외부 API, 이벤트/메시징, 모니터링, 로깅, 배포 파이프라인 |
| 7 | **오류 및 복구** | 5 | 80% | 에러 분류, 재시도/보상 트랜잭션, 장애 격리, 롤백 절차 |
| 8 | **테스팅 및 승인** | 10 | 80% | 단위/통합/E2E 전략, 테스트 데이터, 승인 기준, 릴리스 게이트 |
| 9 | **마이그레이션 및 호환성** | 5 | 80% | 스키마 마이그레이션, 버전 호환, 롤백 계획, 피처 플래그 |
| 10 | **오케스트레이션 준비도** | 5 | 80% | 태스크 그래프, 의존성, 병렬화 가능 구간, 핫스팟 소유자 지정 |

**총 가중치: 100**

---

## 채점 방식

| 점수 | 의미 |
|------|------|
| **100%** | 해당 영역 완전 커버, 모든 하위 항목 충족, 검토자 이의 없음 |
| **80~99%** | 핵심 항목 충족, 일부 보완 필요(마이너) |
| **60~79%** | 주요 누락 있음, 보완 후 재평가 필요 |
| **<60%** | 영역 미흡, 사양 대폭 보강 필요 |

---

## 통과 조건 (ALL Must Pass)

| 조건 | 임계값 |
|------|--------|
| **총점** | ≥ 95 / 100 |
| **전 영역** | ≥ 80% (단 한 영역도 80% 미만 불가) |
| **필수 결정** | 미해결 0개 (`MANDATORY` 클래스 결정 모두 완료) |
| **보안 블로커** | 0개 (보안 검토 `PASS`) |

> 하나라도 미충족 → `SPEC_AUDIT` 유지, 블로킹 갭 리스트 반환 → `SPEC_DRAFT`로 재진입

---

## 평가 프로세스 (SPEC_AUDIT 상태)

```
1. 사양 문서 + 결정 로그 + 아키텍처 문서 수집
2. 각 영역별 체크리스트(세부 항목 5~8개) 대비 평가
3. 평가자 2인 이상 독립 채점 → 평균 산출
4. 미달 영역 → 블로킹 갭 리스트 생성 (구체적 누락 항목)
5. 총점/전역 조건 판정
   ├─ PASS → SPEC_REVIEW 진입 (사용자 리뷰)
   ├─ FAIL → SPEC_DRAFT 재진입 (갭 보완 지시)
6. 결과 기록: specification_readiness_score, blocking_gaps[], auditor[]
```

---

## 블로킹 갭 예시 (Blocking Gaps)

| 영역 | 갭 설명 | 심각도 | 보완 액션 |
|------|---------|--------|-----------|
| 아키텍처 | 외부 결제 API 인터페이스 미정의 | High | 인터페이스 계약서 작성, 모킹 전략 수립 |
| 보안 | PII 필드 암호화 미적용 | Critical | 필드 레벨 암호화 설계, 키 관리 정책 |
| 테스팅 | E2E 테스트 시나리오 0개 | High | 핵심 플로우 3개 시나리오 작성 |
| 운영 | 배포 롤백 절차 문서화 안됨 | Medium | 런북 작성, 카나리 배포 설정 |

---

## 관련 개념

- [[Autonomous Product Discovery-to-Delivery Protocol]] — 상위 프로토콜 개요
- [[Protocol Workflow State Machine]] — `SPEC_AUDIT` → `SPEC_REVIEW` 전이 게이트
- [[Protocol Decision Classification]] — 미해결 `MANDATORY` 결정이 있으면 자동 FAIL
- [[Protocol Weighted Stack Evaluation]] — "아키텍처 및 도메인" 영역 평가 근거로 활용
- [[Protocol Pipeline State Record]] — 게이트 통과 시 `contract_revision` 동결 기록

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — §4. 사양 준비도 점수

---

## 변경 이력

- 2026-07-25: src-001에서 분해 생성