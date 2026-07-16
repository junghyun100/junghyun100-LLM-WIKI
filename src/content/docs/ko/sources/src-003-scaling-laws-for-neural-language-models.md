---
source_id: 'src-003'
title: 'Scaling Laws for Neural Language Models'
authors: ['Kaplan et al.']
venue: 'ArXiv 2020'
year: 2020
url: 'https://arxiv.org/abs/2001.08361'
type: 'paper'
tags: ['scaling-laws', 'kaplan', 'training-dynamics']
ingested_at: '2025-07-10'
ingested_by: 'claude'
content_hash: 'sha256:placeholder'
---

# Scaling Laws for Neural Language Models — Kaplan et al. (2020)

## 핵심 발견
언어 모델의 테스트 손실(L)은 모델 크기(N), 데이터셋 크기(D), 컴퓨트(C)에 대해 **멱법칙(power-law)**을 따른다:

```
L(N, D) = E + A/N^α + B/D^β

where α ≈ 0.076, β ≈ 0.095
```

## 주요 법칙
1. **모델 크기 스케일링**: N이 커질수록 손실 감소 (지수 α ≈ 0.076)
2. **데이터 크기 스케일링**: D가 커질수록 손실 감소 (지수 β ≈ 0.095)
3. **최적 배분**: 주어진 컴퓨트 C에 대해 N ∝ C^0.5, D ∝ C^0.5로 배분 최적

## 시사점
- **더 큰 모델 + 더 많은 데이터**가 항상 유리 (수렴점 없음)
- 컴퓨트 예산의 ~50%를 모델 크기에, ~50%를 데이터에 투자 권장
- "Chinchilla 법칙"(Hoffmann et al., 2022)과 대조: Kaplan은 모델 크기 편향, Chinchilla는 데이터 편향

## 한계
- 특정 아키텍처(Transformer, 고정 옵티마이저) 가정
- 하드웨어 제약, 메모리 대역폭 미고려
- 평가 지표가 로스(perplexity) 위주

## 위키 반영 내역
- `wiki/concepts/scaling-laws.md` — 스케일링 법칙 수식 및 의미
- `wiki/synthesis/llm-scaling-laws.md` — Kaplan vs Chinchilla 비교