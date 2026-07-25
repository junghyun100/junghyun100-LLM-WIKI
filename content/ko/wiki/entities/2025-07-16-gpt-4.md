---
title: 'GPT-4'
description: 'OpenAI 멀티모달 LLM, 1.76T 파라미터 추정 (TEST 콘텐츠)'
type: 'entity'
entity_type: 'model'
sources: ['src-002', 'src-015', 'src-021']
tags: ['openai', 'multimodal', 'closed-source', '2023', 'test']
last_updated: '2025-07-16'
confidence: 'high'
---

# GPT-4 (TEST)

> OpenAI의 멀티모달 LLM, 1.76T 파라미터 추정 — **TEST 콘텐츠**

## 개요
- **종류**: model
- **개발사**: OpenAI
- **공개일**: 2023-03-14
- **라이선스**: Proprietary (API만 제공)
- **주요 특징**: 텍스트+이미지 입력, 텍스트 출력, 128K 컨텍스트

## 상세 스펙
| 항목 | 값 |
|------|-----|
| 파라미터 수 | ~1.76T (추정) |
| 컨텍스트 길이 | 8K / 32K / 128K (버전별) |
| 모달리티 | 텍스트 입력+출력, 이미지 입력 |
| 학습 데이터 | ~2023년 9월까지 |
| 벤치마크 | MMLU 86.4%, HumanEval 67% |

## 아키텍처/설계 특징
- MoE(Mixture of Experts) 아키텍처 추정
- 멀티모달 인코더 통합 (이미지 → 텍스트)
- RLHF + RLAIF 혼합 정렬

## 강점 / 약점
| 강점 | 약점 |
|------|------|
| 복잡한 추론 능력 우수 | 폐쇄형(웨이트 비공개) |
| 멀티모달 이해 탁월 | API 비용 높음 |
| 긴 컨텍스트 지원 | 실시간 정보 없음 (컷오프) |

## 관련 엔티티
- [[OpenAI]] — 개발 조직
- [[GPT-3.5]] — 직전 세대 모델
- [[Claude 3]] — 경쟁 모델 (Anthropic)

## 참조 소스
- [src-002](../sources/src-002-gpt-4-technical-report.md) — GPT-4 Technical Report
- [src-015](../sources/src-015-gpt-4-system-card.md) — System Card
- [src-021](../sources/src-021-gpt-4-blog.md) — OpenAI Blog

## 변경 이력
- 2025-07-16: 초기 생성 (TEST용 샘플 페이지)