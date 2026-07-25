---
source_id: 'src-002'
title: 'GPT-4 Technical Report'
authors: ['OpenAI']
venue: 'OpenAI Blog / ArXiv'
year: 2023
url: 'https://arxiv.org/abs/2303.08774'
type: 'paper'
tags: ['gpt-4', 'multimodal', 'closed-source', 'benchmark']
ingested_at: '2025-07-16'
ingested_by: 'claude'
content_hash: 'sha256:placeholder'
---

# GPT-4 Technical Report — OpenAI (2023)

## 개요
GPT-4는 OpenAI의 대형 멀티모달 모델로, 텍스트와 이미지 입력을 받아 텍스트 출력. GPT-3.5 대비 추론 능력, 지시 따름, 멀티모달 이해 대폭 향상.

## 스펙 (공개/추정)
| 항목 | 값 | 비고 |
|------|-----|------|
| 파라미터 수 | ~1.76T (추정) | MoE 구조 추정, 공식 미공개 |
| 컨텍스트 길이 | 8K / 32K / 128K | 버전별 상이 |
| 모달리티 | 텍스트 + 이미지 → 텍스트 | 비디오/오디오 미지원 |
| 학습 데이터 | ~2023년 9월까지 | 웹, 책, 코드 등 |
| 출시일 | 2023-03-14 | API 우선 공개 |

## 핵심 특징
- **멀티모달**: 이미지 입력 이해 (차트, 다이어그램, 스크린샷 등)
- **지시 따름**: RLHF + RLAIF로 향상
- **안전성**: Constitutional AI, 레드팀 테스트 강화
- **도구 사용**: 함수 호출(Function Calling) 네이티브 지원

## 주요 벤치마크
| 벤치마크 | GPT-4 | GPT-3.5 | 인간 기준 |
|----------|-------|---------|-----------|
| MMLU (5-shot) | 86.4% | 70.0% | 89.8% |
| GSM8K (0-shot CoT) | 92.0% | 57.1% | - |
| HumanEval (0-shot) | 67.0% | 48.1% | - |
| MATH (4-shot) | 42.5% | 34.1% | - |
| Codex (APPS) | - | - | - |

## 한계 (보고서 명시)
- 환각 여전히 존재 (특히 전문 도메인)
- 최신 지식 부재 (cutoff: 2023-09)
- 편향/공정성 이슈 잔존
- 비용 높음 (API 가격 GPT-3.5 대비 15-30배)

## 아키텍처 힌트 (공식 미공개, 추정)
- Mixture of Experts (MoE) 구조 추정
- Expert 수: 16개, 활성 Expert: 2개 (top-2 routing)
- 총 파라미터 ~1.76T, 활성 파라미터 ~280B

## 위키 반영 내역
- `wiki/entities/gpt-4.md` — GPT-4 엔티티 페이지