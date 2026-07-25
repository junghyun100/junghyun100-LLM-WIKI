---
title: 'Protocol Operation Modes'
description: 'Autonomous Product Discovery-to-Delivery Protocol의 3가지 운영 모드(FULL_AUTONOMOUS/SEMI_AUTONOMOUS/ASSISTED) 선택 가이드와 8가지 필수 결정 트리거(MANDATORY 클래스 자동 판정)'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'operation-modes', 'autonomy-level', 'decision-triggers', 'ai-orchestration']
last_updated: '2026-07-25'
confidence: 'high'
---

# Protocol Operation Modes

> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)  
> **상위 개념**: [[Autonomous Product Discovery-to-Delivery Protocol]]  
> **상태 레코드 필드**: `operation_mode` (pipeline-state.yaml)

---

## 3가지 운영 모드 비교

| 모드 | 설명 | 결정 처리 | 사용자 개입 | 적합 상황 |
|------|------|-----------|-------------|-----------|
| **FULL_AUTONOMOUS** | 완전 자율 실행 | `RECOMMEND` → `DEFAULT` 자동 강등 확대<br>`MANDATORY`만 대기 | 최소 (최종 승인만) | 검증된 도메인, 반복 제품, 저위험, 팀 신뢰도 높음 |
| **SEMI_AUTONOMOUS** | 반자율 (기본값) | 표준 규칙 적용<br>`RECOMMEND`는 사용자 제시<br>`MANDATORY` 대기 | 중간 (중요 결정점마다) | **기본 권장**, 신규 도메인, 중간 위험도 |
| **ASSISTED** | 보조 모드 | 모든 결정 `RECOMMEND` 또는 `MANDATORY`로 상향<br>자동 강등 없음 | 최대 (단계별 확인) | 고위험, 규제 도메인, 초기 프로토콜 학습, 감사 필요 |

---

## 모드별 결정 클래스 처리 차이

| 결정 클래스 | FULL_AUTONOMOUS | SEMI_AUTONOMOUS | ASSISTED |
|-------------|-----------------|-----------------|----------|
| **DISCOVER** | 자동 조사 → 적용 | 자동 조사 → 적용 | 자동 조사 → 적용 |
| **DEFAULT** | 자동 적용 + 기록 | 자동 적용 + 기록 | 사용자 확인 후 적용 |
| **RECOMMEND** | **자동 강등 조건 완화** → `DEFAULT`로 처리 | 표준 규칙 적용 → 사용자 제시 | **강등 금지** → 사용자 제시 |
| **MANDATORY** | 사용자 대기 (알림만) | 사용자 대기 (작업 일시정지) | 사용자 대기 (작업 일시정지 + 상세 브리핑) |
| **DEFER** | 자동 기록 | 자동 기록 | 자동 기록 + 사용자 확인 |

### FULL_AUTONOMOUS에서 RECOMMEND → DEFAULT 자동 강등 조건 확대

표준 규칙(5개 모두 충족) + **다음 중 1개만 추가 충족** 시 강등:

- 과거 동일 주제 결정 이력 존재 (`decision_register`에서 검색)
- 팀/프로젝트 컨벤션 문서화됨 (`CONTEXT_RECON`에서 확인)
- 영향도 분석 결과 `LOW` 판정

---

## 모드 선택 가이드 (Decision Tree)

```
시작
 │
 ├─► 규제/컴플라이언스 필수 도메인? (의료, 금융, 공공)
 │      └─ Yes → ASSISTED
 │
 ├─► 프로토콜 첫 실행이거나 팀 경험 부족?
 │      └─ Yes → ASSISTED
 │
 ├─► 동일 도메인 3회 이상 성공적 실행 이력?
 │      └─ Yes → FULL_AUTONOMOUS 후보
 │
 ├─► 리스크 허용도 낮음? (데이터 손실, 비용 초과, 공개 배포 위험)
 │      └─ Yes → SEMI_AUTONOMOUS
 │
 └─► 기본 → SEMI_AUTONOMOUS
```

---

## 8가지 필수 결정 트리거 (MANDATORY 클래스 자동 판정 기준)

다음 **중 하나라도 해당**하면 무조건 `MANDATORY` 클래스로 분류되어 사용자 결정 대기:

| # | 트리거 | 판정 로직 | 예시 |
|---|--------|-----------|------|
| **1** | **비용 임계값 초과** | 예상 비용 > 프로젝트 예산의 10% 또는 절대값 $100/월 | 유료 GPU 인스턴스, 서드파티 API 유료 티어 |
| **2** | **데이터 외부 발행/전송** | 내부망 외부로 데이터 전송 발생 | 웹훅, 이메일 발송, 외부 API 호출, CDN 업로드 |
| **3** | **프라이버시/컴플라이언스 영향** | PII 처리, GDPR/개인정보보호법 적용, 암호화 요구사항 변경 | 사용자 이메일 저장, 결제 정보 처리, 로그에 PII 포함 |
| **4** | **프로덕션 데이터 파괴/마이그레이션** | `DELETE`, `DROP`, `TRUNCATE`, 스키마 변경(역호환 불가) | DB 마이그레이션, 데이터 아카이브, 계정 삭제 |
| **5** | **공개 배포 생성** | 프로덕션 환경 배포, 공개 URL 생성, 앱스토어 제출 | Vercel 배포, Docker 이미지 푸시, Chrome 확장 발행 |
| **6** | **인증/인가 변경** | 로그인 방식, 권한 모델, 토큰 발급/검증 로직 변경 | OAuth 프로바이더 추가, RBAC 변경, JWT 시크릿 교체 |
| **7** | **실질적 제품 결과 변경** | 사용자가 마주하는 핵심 기능/플로우/UX 변경 | 온보딩 플로우 변경, 핵심 버튼 제거, 결제 플로우 수정 |
| **8** | **저렴하게 되돌릴 수 없음 (Irreversible)** | 롤백 비용 > 순방향 비용 × 3, 또는 기술적 롤백 불가 | 도메인 이전, 계정 삭제, 암호화 키 폐기, 계약 해지 |

> **판정 시점**: `DECISION_LOOP`에서 각 미지수 분석 시 자동 평가  
> **결과**: 해당 시 `class: "MANDATORY"`, `status: "PENDING_USER"`, 작업 일시정지(`PAUSED`)

---

## 모드 전환 규칙

| 전환 | 조건 | 처리 |
|------|------|------|
| `ASSISTED` → `SEMI_AUTONOMOUS` | 사용자 명시적 요청 + 1회 이상 완주 성공 | 즉시 적용, 이후 결정부터 새 모드 규칙 |
| `SEMI_AUTONOMOUS` → `FULL_AUTONOMOUS` | 동일 도메인 3회 연속 성공 + 사용자 승인 | 다음 run부터 적용 |
| `FULL_AUTONOMOUS` → `SEMI_AUTONOMOUS` | `MANDATORY` 결정 2회 연속 발생 또는 사용자 요청 | 즉시 적용 |
| 어떤 모드 → `ASSISTED` | 사용자 요청 / 중대 인시던트 / 규제 변경 | 즉시 적용, 현재 run은 완료 후 차기부터 |

---

## 파이프라인 상태 레코드 기록 예시

```yaml
operation_mode: "SEMI_AUTONOMOUS"
mode_rationale: "신규 도메인(미니어처 비디오 생성), 팀 첫 프로토콜 실행, 중간 위험도"
mode_selected_at: "2026-07-25T10:00:00Z"
mode_selected_by: "junghyun"
```

---

## 관련 개념

- [[Autonomous Product Discovery-to-Delivery Protocol]] — 상위 프로토콜 개요
- [[Protocol Decision Classification]] — 결정 클래스 정의 및 표준 처리 규칙
- [[Protocol Pipeline State Record]] — `operation_mode` 필드 저장 위치
- [[Protocol Workflow State Machine]] — `PAUSED` 상태 진입 트리거 (MANDATORY 결정 대기 시)

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — §6. 운영 모드 & 필수 결정 트리거

---

## 변경 이력

- 2026-07-25: src-001에서 분해 생성