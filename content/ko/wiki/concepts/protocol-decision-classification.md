---
title: 'Protocol Decision Classification'
description: 'Autonomous Product Discovery-to-Delivery Protocol의 5클래스 결정 분류 체계(DISCOVER/DEFAULT/RECOMMEND/MANDATORY/DEFER)와 자동해결 규칙'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'decision-classification', 'decision-making', 'product-development', 'ai-orchestration']
last_updated: '2026-07-25'
confidence: 'high'
---

# Protocol Decision Classification

> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)  
> **상위 개념**: [[Autonomous Product Discovery-to-Delivery Protocol]]

---

## 5클래스 결정 분류

프로토콜 실행 중 발생하는 모든 미지수(unknown)는 다음 5개 클래스 중 하나로 분류됩니다:

| 클래스 | 아이콘 | 동작 | 사용자 개입 | 예시 |
|--------|--------|------|-------------|------|
| **DISCOVER** | 🔍 | 묻지 않고 조사 | 없음 | 저장소의 기존 프레임워크, 내부 라이브러리, 팀 컨벤션 |
| **DEFAULT** | ⚙️ | 선택 + 되돌릴 수 있는 기본값 기록 | 없음 (기록만) | 포맷팅 라이브러리, 로깅 레벨, 개발용 DB 설정 |
| **RECOMMEND** | 💡 | 옵션 + 추천 제시 | 선택적 (동의/수정) | SPA vs SSR, 상태관리 라이브러리, 클라우드 리전 |
| **MANDATORY** | 🔴 | 사용자 필수 결정 | **필수 대기** | 유료 서비스 가입, 공개 배포, 파괴적 마이그레이션, 데이터 삭제 |
| **DEFER** | ⏸️ | 현재 범위 밖으로 명시적 이동 | 없음 (선언만) | 향후 엔터프라이즈 SSO, 다국어 지원, 모바일 앱 확장 |

---

## 클래스별 상세 처리 규칙

### DISCOVER (자동 조사)
- **트리거**: "이미 정해진 것" 감지 시
- **처리**: 코드베이스/문서/설정에서 자동 탐색 → 값 확정 → 결정 로그에 `discovered: true` 기록
- **실패 시**: 발견 못 함 → `RECOMMEND`로 강등

### DEFAULT (자동 기본값)
- **조건**: 되돌릴 수 있음(reversible) + 지역적 영향(local) + 팀 컨벤션 부합
- **처리**: 권장 기본값 적용 + `decision_log`에 `{class: "DEFAULT", value, rationale, reversible: true}` 기록
- **나중에 변경 시**: `OVERRIDE` 결정으로 별도 로깅

### RECOMMEND (추천 제시)
- **조건**: 되돌릴 수 있음 + 영향 범위 중간 + 의미 있는 트레이드오프 존재
- **처리**: 
  1. 옵션 2~3개 수집 (장단점표)
  2. 가중 평가(`Protocol Weighted Stack Evaluation` 등) 적용
  3. 1순위 추천 + 2순위 대안 제시
  4. 사용자 승인/수정/거절 대기
- **자동 승인 조건**: 사용자 24시간 무응답 + 영향도 `LOW` → 1순위 자동 적용

### MANDATORY (필수 결정)
- **조건**: 다음 중 **하나라도 해당**
  - 실질적 반복 비용 발생(비용 > 임계값)
  - 데이터 외부 발행/전송
  - 프라이버시/컴플라이언스 영향
  - 프로덕션 데이터 파괴/마이그레이션
  - 공개 배포 생성
  - 인증/인가 변경
  - 실질적으로 다른 제품 결과 선택
  - 저렴하게 되돌릴 수 없음(irreversible)
- **처리**: 작업 일시정지(`PAUSED`) → 사용자 결정 대기 → 결정 기록 후 재개

### DEFER (범위 밖 명시)
- **조건**: 현재 프로토콜 실행 범위 밖 + 향후 필요 예상
- **처리**: `deferred_decisions` 배열에 `{topic, reason, estimated_revisit_trigger}` 기록
- **재방문 트리거**: 관련 기능 구현 시작, 사용자 요청, 의존성 해소

---

## 자동 해결 규칙 (Auto-Resolution Rules)

다음 **모두 충족** 시 `RECOMMEND` → `DEFAULT`로 자동 강등되어 사용자 대기 없이 진행:

| 조건 | 설명 |
|------|------|
| ✅ 되돌릴 수 있음 (reversible) | 롤백/변경 비용 낮음 (코드 레벨, 인프라 레벨 아닌) |
| ✅ 기존 관례 부합 | 팀/프로젝트/조직 기존 선택과 충돌 없음 |
| ✅ 영향이 지역적 (local) | 단일 모듈/파일/서비스 내 완결 |
| ✅ 사용자 선호 내포 안 함 | 주관적 취향(컬러, 네이밍 스타일 등) 개입 없음 |
| ✅ 가정이 기록됨 | `assumptions` 로그에 결정 근거 명시 |

> 위 5개 중 **하나라도 불충족** → `RECOMMEND` 유지(사용자 제시)

---

## 결정 로그 스키마 (Decision Record)

```yaml
decisions:
  - decision_id: "dec-20260725-001"
    timestamp: "2026-07-25T10:30:00Z"
    class: "RECOMMEND"
    topic: "Frontend framework selection"
    context: "Greenfield 웹 앱, SEO 불필요, 팀 React 경험 풍부"
    options:
      - id: "A"
        name: "React + Vite + TanStack Router"
        pros: ["팀 숙련도 높음", "생태계 성숙", "SSR 불필요 시 경량"]
        cons: ["번들 크기", "라우터 학습 곡선"]
        score: 4.2
      - id: "B"
        name: "Next.js (App Router)"
        pros: ["풀스택 가능", "Vercel 최적화", "RSC 지원"]
        cons: ["과도한 복잡도(SSR 불필요)", "빌드 시간"]
        score: 3.8
    recommendation: "A"
    status: "PENDING_USER"  # PENDING_USER | AUTO_APPLIED | USER_OVERRIDDEN | DEFERRED
    user_decision: null
    assumptions:
      - "SEO 불필요 (내부 도구)"
      - "팀 React 3년+ 경험"
    created_by: "orchestrator"
```

---

## 관련 개념

- [[Autonomous Product Discovery-to-Delivery Protocol]] — 상위 프로토콜 개요
- [[Protocol Workflow State Machine]] — `DECISION_LOOP` 상태에서 본 분류 체계 적용
- [[Protocol Weighted Stack Evaluation]] — `RECOMMEND` 클래스 결정 시 가중 평가 도구로 활용
- [[Protocol Operation Modes]] — 운영 모드에 따른 결정 클래스 처리 차이 (`FULL_AUTONOMOUS` 시 `RECOMMEND`→`DEFAULT` 자동 강등 확대)

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — §2. 결정 분류 체계

---

## 변경 이력

- 2026-07-25: src-001에서 분해 생성