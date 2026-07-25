---
title: 'Autonomous Product Discovery-to-Delivery Protocol'
description: '제품 아이디어를 구조화된 탐색→결정→사양→구현→배포로 자동화하는 오케스트레이션 프로토콜 — 개요 및 서브컨셉 맵'
type: 'concept'
sources: ['src-001']
tags: ['protocol', 'product-development', 'ai-orchestration', 'autonomous-workflow', 'specification', 'architecture']
last_updated: '2026-07-25'
confidence: 'high'
---

# Autonomous Product Discovery-to-Delivery Protocol (개요)

> **버전**: 1.0  
> **작성일**: 2026-07-25  
> **작성자**: Junghyun  
> **소스**: [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md)

---

## 정의

**Autonomous Product Discovery-to-Delivery Protocol**은 짧은 제품 아이디어(예: *"미니어처 건설 비디오 생성 서비스 만들고 싶어"*)를 **구조화된 제품 탐색 → 결정 중심 사용자 가이드 → 현재 기술 조사 → 아키텍처/기술 선택 → 구현 준비 사양 → 오케스트레이션 계획 → 위임 구현 → 통합·QA·배포**까지 자동화된 오케스트레이션으로 연결하는 **재사용 가능한 프로토콜**입니다.

이 프로토콜은 다음 두 역할을 동시에 수행하도록 설계되었습니다:

1. **인간이 읽을 수 있는 운영 매뉴얼**
2. **AI 오케스트레이터가 따를 수 있는 마스터 프롬프트**

모든 제품 유형(웹사이트, 애플리케이션, 자동화 시스템, API, AI 파이프라인, 내부 도구, 모바일 제품, 데이터 시스템, 콘텐츠 제작 시스템)에 **제품 불가지각(product-agnostic)**적으로 적용 가능합니다.

---

## 프로토콜 구성 요소 (서브컨셉)

이 프로토콜은 8개 핵심 메커니즘으로 구성되며, 각 메커니즘은 독립된 위키 페이지로 관리됩니다:

| # | 서브컨셉 | 설명 | 위키 링크 |
|---|-----------|------|-----------|
| 1 | **워크플로 상태 머신** | 16단계 상태 전이, 예외 상태, 전이 규칙, 불변식 | [[Protocol Workflow State Machine]] |
| 2 | **결정 분류 체계** | 5클래스(DISCOVER/DEFAULT/RECOMMEND/MANDATORY/DEFER), 자동해결 규칙, 결정 로그 스키마 | [[Protocol Decision Classification]] |
| 3 | **가중 스택 평가** | 10차원 가중치, 채점 수식, 기술 선택 의사결정, 평가 시트 템플릿 | [[Protocol Weighted Stack Evaluation]] |
| 4 | **사양 준비도 게이트** | 9영역 가중치/최소점수, 통과 조건(95/100), 블로킹 갭 예시 | [[Protocol Specification Readiness Gate]] |
| 5 | **파이프라인 상태 레코드** | 전체 YAML 스키마 (run_id, 상태, 결정레지스터, 계약, 웨이브, 릴리스), 필드 정의 | [[Protocol Pipeline State Record]] |
| 6 | **운영 모드** | 3모드(FULL_AUTONOMOUS/SEMI_AUTONOMOUS/ASSISTED) 선택 가이드, 8가지 필수결정 트리거 | [[Protocol Operation Modes]] |
| 7 | **핫스팟 단일 소유권** | 6개 핫스팟 파일, 동시편집 금지, 변경요청 프로세스, 락/위반 처리 | [[Protocol Hotspot Ownership]] |
| 8 | **핵심 개념 참조** | 관련 상위/인접 개념 매핑, 변형/확장 레벨 | 본 문서 하단 참조 |

---

## 주요 변형/확장 (Level 1~3)

| 변형 | 설명 |
|------|------|
| **Level 1: Master Prompt** | 이 Markdown을 단일 AI 태스크에서 마스터 프롬프트로 직접 사용 |
| **Level 2: Codex/Agent Skill** | 프로토콜에서 스킬 생성 → 반복 호출, 상태 규칙, 도구 정책 내장 |
| **Level 3: Skill + Task Management** | 자동 태스크 생성/대기/통합/리포팅까지 지원 |

> Markdown은 스킬/플러그인 생성 후에도 **진실의 원천(source of truth)으로 유지**되어야 함

---

## 관련 개념 (상위/인접)

- [[Protocol Workflow State Machine]] — 16단계 상태 전이, 예외 상태, 전이 규칙, 불변식
- [[Protocol Decision Classification]] — 5클래스 결정 분류, 자동해결 규칙, 결정 로그 스키마
- [[Protocol Weighted Stack Evaluation]] — 10차원 가중 평가 수식, 채점 가이드, 평가 시트
- [[Protocol Specification Readiness Gate]] — 9영역 사양 품질 게이트, 95/100 통과 조건
- [[Protocol Pipeline State Record]] — 전체 파이프라인 상태 YAML 스키마 (run_id, 계약, 웨이브, 릴리스)
- [[Protocol Operation Modes]] — 3가지 운영 모드, 8가지 필수 결정 트리거
- [[Protocol Hotspot Ownership]] — 6개 핫스팟 파일 단일 소유권, 변경 요청 프로세스
- [[Specification-Driven Development]] — 사양 우선 개발 패러다임
- [[AI-Orchestrated Development]] — AI가 기획부터 배포까지 오케스트레이션
- [[Contract-First Development]] — 계약 동결 후 병렬 구현
- [[Decision-Driven Architecture]] — 결정 기록을 아키텍처 기반으로
- [[Specification Readiness Gate]] — 구현 전 품질 게이트

---

## 참조 소스

- [src-001](../sources/src-001-autonomous-product-discovery-delivery-protocol.md) — 원본 프로토콜 문서 전체

---

## 변경 이력

- 2026-07-25: 초기 생성 (src-001 ingest 완료)
- 2026-07-25: 8개 서브컨셉으로 분해, 메인 페이지를 개요/링크맵으로 재구성