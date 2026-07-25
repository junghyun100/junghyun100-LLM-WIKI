---
title: 'Protocol Pipeline State Record'
description: 'Autonomous Product Discovery-to-Delivery Protocol의 전체 상태를 담는 YAML 스키마 — run_id, 현재 상태, 결정 레지스터, 계약 리비전, 웨이브 현황 등 모든 필드 정의'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'pipeline-state', 'yaml-schema', 'state-management', 'product-development', 'ai-orchestration']
last_updated: '2026-07-25'
confidence: 'high'
---

# Protocol Pipeline State Record

> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)  
> **상위 개념**: [[Autonomous Product Discovery-to-Delivery Protocol]]  
> **사용 위치**: [[Protocol Workflow State Machine]]의 전 상태에서 이 레코드를 읽고 씀

---

## 목적

프로토콜 실행의 **단일 진실의 원천(Single Source of Truth)**. 모든 상태, 결정, 계약, 진행 상황을 이 하나의 YAML 파일에 기록/갱신합니다.

- 파일 경로: `.llm-wiki/protocol-state.yaml` (워크스페이스 루트)
- 포맷: YAML 1.2
- 동시 접근: 단일 프로토콜 인스턴스만 허용 (`run_id` 락)

---

## 전체 스키마 (Complete Schema)

```yaml
# =============================================================================
# Protocol Pipeline State Record — Autonomous Product Discovery-to-Delivery
# =============================================================================

# -----------------------------------------------------------------------------
# 메타데이터 (불변 - 생성 시 확정)
# -----------------------------------------------------------------------------
run_id: "proto-20260725-001"              # 고유 실행 ID (UUID/timestamp 기반)
protocol_version: "1.0"                   # 프로토콜 버전
created_at: "2026-07-25T10:00:00Z"        # 생성 시각 (ISO 8601)
created_by: "junghyun"                    # 실행 주체
workspace_root: "/path/to/workspace"      # 작업공간 루트 경로

# -----------------------------------------------------------------------------
# 현재 실행 상태 (가변)
# -----------------------------------------------------------------------------
current_state: "SPEC_DRAFT"               # Protocol Workflow State Machine 상태 코드
state_entered_at: "2026-07-25T10:30:00Z"  # 현재 상태 진입 시각
state_transitions:                        # 상태 전이 이력 (감사용)
  - from: "INTAKE"
    to: "CONTEXT_RECON"
    at: "2026-07-25T10:05:00Z"
  - from: "CONTEXT_RECON"
    to: "DISCOVERY"
    at: "2026-07-25T10:15:00Z"
  # ... 이어짐

# -----------------------------------------------------------------------------
# 입력 및 컨텍스트
# -----------------------------------------------------------------------------
intake:
  raw_idea: "미니어처 건설 비디오 생성 서비스 만들고 싶어"
  normalized_idea: "AI 기반 미니어처 건설 시뮬레이션 비디오 생성 SaaS"
  user_context: |
    - 타겟: 건설/건축 교육 콘텐츠 크리에이터
    - 차별화: 실제 건설 과정의 물리적 정확도
    - 수익모델: 구독형 + 비디오당 과금
  constraints:
    - budget: "월 $500 이하 인프라 비용"
    - timeline: "MVP 4주 내 배포"
    - team: "1인 개발 (풀스택)"
    - tech_preference: "기존 React/TypeScript 스택 활용"

# -----------------------------------------------------------------------------
# 컨텍스트 재구성 결과 (CONTEXT_RECON 단계 산출)
# -----------------------------------------------------------------------------
context_report:
  tech_stack:
    frontend: "React 18 + TypeScript + Vite"
    backend: "Node.js + Fastify"
    database: "PostgreSQL (Supabase)"
    hosting: "Vercel + Railway"
    ci_cd: "GitHub Actions"
  existing_patterns:
    - "컴포넌트: atomic design 변형"
    - "상태관리: Zustand + React Query"
    - "API: tRPC 엔드투엔드 타입 안전성"
    - "스타일링: Tailwind CSS"
  constraints_discovered:
    - "Supabase 무료 티어: DB 500MB, 대역폭 2GB"
    - "Vercel Hobby: 서버리스 함수 10초 제한"
  hotspots_identified:
    - "src/lib/api/trpc-router.ts"
    - "src/lib/db/schema.sql"
    - "src/components/video/Player.tsx"

# -----------------------------------------------------------------------------
# 제품 비전 및 범위 (DISCOVERY 단계 산출)
# -----------------------------------------------------------------------------
product_scope:
  vision: "건설 교육 크리에이터가 코딩 없이 물리 기반 미니어처 건설 비디오를 생성하는 플랫폼"
  target_users:
    - primary: "건설/건축 유튜버, 온라인 강사"
    - secondary: "건설사 마케팅팀, 조달 교육 담당자"
  mvp_scope:
    in:
      - "프롬프트 → 스토리보드 자동 생성"
      - "3D 에셋 라이브러리 (건설 장비, 자재, 인부)"
      - "물리 시뮬레이션 (중력, 충돌, 재질)"
      - "렌더링 파이프라인 (Blender headless → MP4)"
      - "사용자 인증 + 프로젝트 관리"
    out:
      - "실시간 협업 편집"
      - "마켓플레이스 (에셋 판매)"
      - "모바일 앱"
      - "다국어 자막 자동 생성"
  success_metrics:
    - "MVP 배포 후 4주 내 활성 사용자 50명"
    - "비디오 생성 성공률 95% 이상"
    - "평균 생성 시간 10분 이하"

# -----------------------------------------------------------------------------
# 결정 레지스터 (DECISION_LOOP 단계에서 지속 갱신)
# -----------------------------------------------------------------------------
decision_register:
  - decision_id: "dec-20260725-001"
    timestamp: "2026-07-25T11:00:00Z"
    class: "RECOMMEND"
    topic: "3D 렌더링 엔진 선택"
    context: "Blender headless vs Three.js vs Babylon.js"
    options:
      - id: "A"
        name: "Blender Headless (Python API)"
        pros: ["물리 시뮬레이션 내장", "고품질 렌더링", "에셋 파이프라인 성숙"]
        cons: ["서버 리소스 무거움", "Python 컨테이너 필요", "콜드 스타트 느림"]
        score: 4.3
      - id: "B"
        name: "Three.js + Cannon.js (WebGL)"
        pros: ["브라우저 네이티브", "경량", "서버리스 친화적"]
        cons: ["물리 엔진 별도 구축", "렌더링 품질 한계", "에셋 변환 파이프라인 필요"]
        score: 3.7
    recommendation: "A"
    status: "AUTO_APPLIED"
    user_decision: null
    assumptions:
      - "품질 우선, 속도 차선"
      - "GPU 인스턴스 사용 가능 (Railway GPU)"
    created_by: "orchestrator"

  - decision_id: "dec-20260725-002"
    timestamp: "2026-07-25T11:15:00Z"
    class: "MANDATORY"
    topic: "유료 GPU 인스턴스 사용 승인"
    context: "Blender 렌더링용 Railway GPU 인스턴스 ($0.50/시간)"
    options: []
    recommendation: null
    status: "PENDING_USER"
    user_decision: null
    assumptions:
      - "월 예상 100시간 = $50/월"
    created_by: "orchestrator"

# -----------------------------------------------------------------------------
# 리서치 레코드 (RESEARCH 단계 산출)
# -----------------------------------------------------------------------------
research_records:
  - record_id: "res-20260725-001"
    topic: "Blender headless 렌더링 파이프라인 최적화"
    sources:
      - "https://docs.blender.org/api/current/"
      - "https://github.com/blender/blender/wiki/Headless-Rendering"
    findings:
      - "bpy.ops.render.render(write_still=True) 사용"
      - "EEVEE vs Cycles: EEVEE가 10배 빠름, 품질 충분"
      - "GPU 메모리 8GB면 1080p 30초 렌더링 가능"
    computed_at: "2026-07-25T12:00:00Z"

# -----------------------------------------------------------------------------
# 아키텍처 결정 기록 (ARCHITECTURE 단계 산출)
# -----------------------------------------------------------------------------
architecture_records:
  - adr_id: "adr-20260725-001"
    title: "렌더링 워커 아키텍처: 큐 기반 비동기 처리"
    status: "ACCEPTED"
    context: "비디오 생성 요청을 비동기 큐에 넣고 워커가 처리"
    decision: "BullMQ + Redis (Railway) → Blender 워커 컨테이너 풀"
    consequences:
      positive: ["확장 용이", "재시도/데드레터 내장", "진행률 추적 가능"]
      negative: ["Redis 비용 추가", "워커 관리 복잡도"]
    created_at: "2026-07-25T13:00:00Z"

  - adr_id: "adr-20260725-002"
    title: "프론트엔드 상태관리: tRPC + React Query + Zustand"
    status: "ACCEPTED"
    context: "기존 패턴 유지, 엔드투엔드 타입 안전성 보장"
    decision: "현행 유지, 렌더링 진행률만 WebSocket으로 실시간 수신"
    consequences:
      positive: ["일관성", "학습 비용 0", "캐싱 자동화"]
      negative: ["WebSocket 별도 인프라 필요"]
    created_at: "2026-07-25T13:10:00Z"

# -----------------------------------------------------------------------------
# 사양 문서 버전 관리 (SPEC_DRAFT/SPEC_AUDIT 단계)
# -----------------------------------------------------------------------------
spec_versions:
  - version: "0.1"
    state: "SPEC_DRAFT"
    created_at: "2026-07-25T14:00:00Z"
    path: "docs/spec/v0.1.md"
    audit_score: null
    blocking_gaps: []
  - version: "0.2"
    state: "SPEC_AUDIT"
    created_at: "2026-07-25T15:30:00Z"
    path: "docs/spec/v0.2.md"
    audit_score: 87
    blocking_gaps:
      - area: "보안"
        gap: "PII 필드 암호화 미적용"
        severity: "Critical"
      - area: "테스팅"
        gap: "E2E 시나리오 미작성"
        severity: "High"

# -----------------------------------------------------------------------------
# 계약 동결 (CONTRACT_FREEZE 단계 산출)
# -----------------------------------------------------------------------------
contract_revision: "v1.0.0"                # 동결된 계약 리비전 (SemVer)
contract_frozen_at: null                   # 동결 시각
contracts:
  api_schema:                              # OpenAPI/tRPC 스키마
    path: "contracts/api.schema.json"
    hash: "sha256:..."
  event_schemas:                           # 이벤트 스키마 (CloudEvents)
    - name: "video.generation.requested"
      path: "contracts/events/video-generation-requested.json"
      version: "1.0"
    - name: "video.generation.completed"
      path: "contracts/events/video-generation-completed.json"
      version: "1.0"
  shared_types:                            # 공유 TypeScript 타입
    path: "packages/shared-types/src/index.ts"
    hash: "sha256:..."

# -----------------------------------------------------------------------------
# 구현 웨이브 현황 (IMPLEMENTATION_WAVES 단계)
# -----------------------------------------------------------------------------
waves:
  - wave_id: "wave-1"
    name: "코어 백엔드: 인증, 프로젝트, 비디오 요청 API"
    status: "NOT_STARTED"  # NOT_STARTED | IN_PROGRESS | DONE | BLOCKED
    tasks:
      - task_id: "task-001"
        title: "tRPC 라우터: auth, project, video 절차 정의"
        owner: "backend"
        status: "NOT_STARTED"
        depends_on: []
      - task_id: "task-002"
        title: "BullMQ 큐 + Redis 연결 설정"
        owner: "backend"
        status: "NOT_STARTED"
        depends_on: []
      - task_id: "task-003"
        title: "Blender 워커 컨테이너 Dockerfile 작성"
        owner: "devops"
        status: "NOT_STARTED"
        depends_on: ["task-002"]
    started_at: null
    completed_at: null

  - wave_id: "wave-2"
    name: "프론트엔드: 프로젝트 대시보드, 비디오 생성 폼, 진행률 UI"
    status: "NOT_STARTED"
    tasks: []
    started_at: null
    completed_at: null

  - wave_id: "wave-3"
    name: "렌더링 파이프라인: Blender 스크립트, 에셋 로드, 출력"
    status: "NOT_STARTED"
    tasks: []
    started_at: null
    completed_at: null

# -----------------------------------------------------------------------------
# 통합 및 QA 현황
# -----------------------------------------------------------------------------
integration:
  build_status: "NOT_RUN"                  # NOT_RUN | PASS | FAIL
  last_build_at: null
  test_results:
    unit: {pass: 0, fail: 0, skipped: 0}
    integration: {pass: 0, fail: 0, skipped: 0}
    e2e: {pass: 0, fail: 0, skipped: 0}
  defects: []

# -----------------------------------------------------------------------------
# 릴리스 현황
# -----------------------------------------------------------------------------
release:
  candidate_version: null                  # 예: "v1.0.0-rc.1"
  review_status: "NOT_STARTED"             # NOT_STARTED | IN_REVIEW | APPROVED | REJECTED
  rollback_plan: null
  deployed_at: null
  deployed_version: null

# -----------------------------------------------------------------------------
# 운영 모드 (Protocol Operation Modes 참조)
# -----------------------------------------------------------------------------
operation_mode: "SEMI_AUTONOMOUS"          # FULL_AUTONOMOUS | SEMI_AUTONOMOUS | ASSISTED
mode_rationale: "초기 MVP, 중요 결정은 사용자 확인 필요"

# -----------------------------------------------------------------------------
# 핫스팟 소유권 (Protocol Hotspot Ownership 참조)
# -----------------------------------------------------------------------------
hotspot_owners:
  - file: "src/lib/api/trpc-router.ts"
    owner: "backend"
    lock_status: "FREE"                    # FREE | LOCKED
    locked_by: null
    locked_at: null

# -----------------------------------------------------------------------------
# 감사 로그 (모든 상태 변경 기록)
# -----------------------------------------------------------------------------
audit_log:
  - timestamp: "2026-07-25T10:00:00Z"
    action: "PROTOCOL_STARTED"
    actor: "junghyun"
    details: "run_id=proto-20260725-001 시작"
  - timestamp: "2026-07-25T11:00:00Z"
    action: "DECISION_RECORDED"
    actor: "orchestrator"
    details: "dec-20260725-001 (RECOMMEND) AUTO_APPLIED"
  - timestamp: "2026-07-25T11:15:00Z"
    action: "DECISION_RECORDED"
    actor: "orchestrator"
    details: "dec-20260725-002 (MANDATORY) PENDING_USER"

# -----------------------------------------------------------------------------
# 아카이브 (CANCELLED/SUPERSEDED 시)
# -----------------------------------------------------------------------------
archived: false
archived_at: null
archive_reason: null
```

---

## 필드별 상세 명세 (Field Specifications)

### 메타데이터 (Immutable)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `run_id` | string | ✅ | `proto-{YYYYMMDD}-{NNN}` 형식, 전역 고유 |
| `protocol_version` | string | ✅ | 프로토콜 스키마 버전 (SemVer) |
| `created_at` | ISO8601 | ✅ | 생성 시각 |
| `created_by` | string | ✅ | 실행 주체 식별자 |
| `workspace_root` | string | ✅ | 절대 경로 |

### 상태 관리 (Mutable)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `current_state` | enum | ✅ | 16개 상태 코드 중 하나 (`INTAKE`~`DELIVERY` + 예외 4개) |
| `state_entered_at` | ISO8601 | ✅ | 현재 상태 진입 시각 |
| `state_transitions` | array | ✅ | 전체 전이 이력 (감사용, 최대 100개 보관) |

### 결정 레지스터 (Decision Register)

각 결정 레코드 필수 필드:

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `decision_id` | string | ✅ | `dec-{YYYYMMDD}-{NNN}` |
| `timestamp` | ISO8601 | ✅ | 결정 기록 시각 |
| `class` | enum | ✅ | `DISCOVER\|DEFAULT\|RECOMMEND\|MANDATORY\|DEFER` |
| `topic` | string | ✅ | 결정 주제 한 줄 요약 |
| `context` | string | ✅ | 배경 설명 |
| `options` | array | 조건부 | `RECOMMEND`/`MANDATORY`时 필수 |
| `recommendation` | string | 조건부 | `RECOMMEND`时 필수 (옵션 ID) |
| `status` | enum | ✅ | `PENDING_USER\|AUTO_APPLIED\|USER_OVERRIDDEN\|DEFERRED` |
| `user_decision` | string | 선택 | 사용자 선택 옵션 ID |
| `assumptions` | array | ✅ | 결정 근거 가정들 |
| `created_by` | string | ✅ | `orchestrator` 또는 `user` |

### 계약 (Contracts)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `contract_revision` | string | ✅ | SemVer, `CONTRACT_FREEZE` 시 확정 |
| `contract_frozen_at` | ISO8601 | 조건부 | 동결 시 필수 |
| `contracts.api_schema` | object | ✅ | OpenAPI/tRPC 스키마 참조 + 해시 |
| `contracts.event_schemas` | array | ✅ | 이벤트 스키마 목록 (이름, 경로, 버전) |
| `contracts.shared_types` | object | ✅ | 공유 타입 패키지 참조 + 해시 |

### 웨이브 (Waves)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `wave_id` | string | ✅ | `wave-{N}` |
| `name` | string | ✅ | 웨이브 명 |
| `status` | enum | ✅ | `NOT_STARTED\|IN_PROGRESS\|DONE\|BLOCKED` |
| `tasks[]` | array | ✅ | 태스크 배열 (task_id, title, owner, status, depends_on) |
| `started_at` | ISO8601 | 선택 | 시작 시각 |
| `completed_at` | ISO8601 | 선택 | 완료 시각 |

---

## 상태별 필수 필드 매트릭스 (Required Fields by State)

| 상태 | 필수 필드 (최소) |
|------|------------------|
| `INTAKE` | `run_id`, `protocol_version`, `created_at`, `created_by`, `workspace_root`, `current_state`, `state_entered_at`, `intake` |
| `CONTEXT_RECON` | + `context_report` |
| `DISCOVERY` | + `product_scope` |
| `DECISION_LOOP` | + `decision_register` (최소 1개) |
| `RESEARCH` | + `research_records` |
| `ARCHITECTURE` | + `architecture_records` |
| `SPEC_DRAFT` | + `spec_versions` |
| `SPEC_AUDIT` | + `spec_versions[-1].audit_score`, `blocking_gaps` |
| `SPEC_REVIEW` | + `spec_versions[-1].audit_score ≥ 95`, `blocking_gaps = []` |
| `ORCHESTRATION_PLAN` | + `waves` (전체 웨이브 계획) |
| `CONTRACT_FREEZE` | + `contract_revision`, `contract_frozen_at`, `contracts` |
| `IMPLEMENTATION_WAVES` | + `waves` (진행 현황 실시간 갱신) |
| `INTEGRATION` | + `integration` |
| `QA` | + `integration.test_results`, `integration.defects` |
| `RELEASE_REVIEW` | + `release` |
| `DELIVERY` | + `release.deployed_at`, `release.deployed_version` |

---

## 관련 개념

- [[Autonomous Product Discovery-to-Delivery Protocol]] — 상위 프로토콜 개요
- [[Protocol Workflow State Machine]] — 각 상태에서 이 레코드의 어떤 필드가 갱신되는지 정의
- [[Protocol Decision Classification]] — `decision_register`의 `class` 필드 값 정의
- [[Protocol Operation Modes]] — `operation_mode` 필드 값과 동작 차이 정의
- [[Protocol Hotspot Ownership]] — `hotspot_owners` 필드 구조와 락 프로세스 정의

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — §5. 파이프라인 상태 레코드

---

## 변경 이력

- 2026-07-25: src-001에서 분해 생성