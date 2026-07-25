---
title: '도구 & 템플릿'
description: '자동화 스크립트, 프롬프트 템플릿, 평가 가이드'
---

# 도구 & 템플릿

위키 운영을 돕는 자동화 스크립트와 템플릿 모음입니다.

## 자동화 스크립트 (`scripts/`)

| 스크립트 | 용도 | 실행 명령 |
|----------|------|-----------|
| `ingest-helper.ts` | 소스→위키 매핑 제안, 페이지 생성 | `npm run ingest sources/src-XXX.md` |
| `lint-check.ts` | 위키 건강도 점검 (모순, 고아, 메타데이터, 링크) | `npm run lint` |
| `index-gen.ts` | index.md 카탈로그 자동 갱신 | `npm run index:gen` |

## 프롬프트 템플릿 (`prompts/`)

- `ingest.md` — Ingest 작업용 시스템 프롬프트
- `query.md` — Query 작업용 시스템 프롬프트
- `lint.md` — Lint 작업용 시스템 프롬프트

## 평가 가이드

- RAG 평가 체크리스트
- 모델 비교 평가 기준
- 벤치마크 실행 가이드