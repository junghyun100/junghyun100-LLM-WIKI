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

## [2026-07-25] ingest | src-001 Autonomous Product Discovery-to-Delivery Protocol 수집 | 영향 2개

**소스**: `sources/src-001-autonomous-product-discovery-delivery-protocol.md` (Junghyun, 2026)

**생성 페이지**:
- `wiki/concepts/2026-07-25-autonomous-product-discovery-delivery-protocol.md` — 프로토콜 개념 페이지 (상태 머신, 결정 분류, 가중 평가 수식, 8단계 워크플로 등)
- `sources/src-001-autonomous-product-discovery-delivery-protocol.md` — 원본 프로토콜 문서 전체 보관

**index.md** 갱신: 개념 1개 추가, 소스 1개 추가, 통계 업데이트 (총 페이지 3개, 총 소스 1개)

**모순**: 없음

---

## [2026-07-25] maintenance | 외부 테스트 소스 정리 및 프로젝트 초기화 | 영향 0개

**정리 내용**:
- 삭제: `sources/src-001~005` (Attention Is All You Need, GPT-4 Technical Report, Scaling Laws, Flash Attention 3, Chinchilla) — 외부 논문/리포트, 본인 작성 아님
- 삭제: `wiki/concepts/2025-07-16-attention.md`, `wiki/entities/2025-07-16-gpt-4.md` — 위 소스 기반 TEST 콘텐츠
- 유지: `src-001` Autonomous Product Discovery-to-Delivery Protocol (본인 작성)
- 스키마/템플릿/자동화 스크립트/프롬프트 모두 유지 및 정비

---

## [2026-07-25] schema | CLAUDE.md v1.0.0 운영 계약서 신규 작성 | 영향 0개

스키마 문서 신규 작성:
- 프론트매터 표준 4유형 정의 (entity, concept, synthesis, comparison)
- 템플릿 4종(`prompts/` 내장형) 정의
- 네이밍/링크/태그 컨벤션 표준화
- 품질 기준 6항목(단일진실원천, 추적가능성, 최신성, 모순금지, 원자성, 교차참조)
- 스키마 진화 프로세스 정의
- 금지사항 7가지, 예외처리 4가지 명시

---

## [2026-07-25] maintenance | Quartz v5 마이그레이션 완료 및 자동화 도구 정비 | 영향 0개

- Astro + Starlight → Quartz v5 완전 이전
- `scripts/lint-check.ts`, `index-gen.ts`, `ingest-helper.ts` 정상 동작 확인
- `prompts/ingest.md`, `query.md`, `lint.md` LLM 시스템 프롬프트 작성
- README.md 프로젝트 전용으로 재작성
- GitHub Pages 배포 워크플로 Node 22 + legacy-peer-deps 구성

---

*다음 예정: 2026-08-01 주간 Lint*