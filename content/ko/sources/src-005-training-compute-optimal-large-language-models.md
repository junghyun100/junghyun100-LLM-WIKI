---
source_id: 'src-005'
title: 'Training Compute-Optimal Large Language Models'
authors: ['Hoffmann et al.']
venue: 'ArXiv 2022 / DeepMind'
year: 2022
url: 'https://arxiv.org/abs/2203.15556'
type: 'paper'
tags: ['scaling-laws', 'chinchilla', 'compute-optimal']
ingested_at: '2025-07-10'
ingested_by: 'claude'
content_hash: 'sha256:placeholder'
---

# Training Compute-Optimal Large Language Models — Hoffmann et al. (2022)

## 핵심 발견: Chinchilla 법칙
Kaplan et al. (2020)과 달리, **주어진 컴퓨트 예산에서 모델 크기(N)와 학습 토큰 수(D)를 동등하게 스케일링**해야 최적.

```
최적 배분: N ∝ C^0.5,  D ∝ C^0.5
```

기존 Kaplan: N에 더 많이 투자 (N ∝ C^0.73, D ∝ C^0.27)

## 실험 결과
| 모델 | 파라미터 | 학습 토큰 | 컴퓨트 (FLOPs) | MMLU |
|------|----------|-----------|----------------|------|
| Gopher | 280B | 300B | 6.1×10^23 | 60.0% |
| Chinchilla | 70B | 1.4T | 5.8×10^23 | **67.5%** |

→ **4배 작은 모델, 4.7배 더 많은 데이터**로 **더 좋은 성능** 달성

## 실무 가이드라인
| 컴퓨트 예산 | 추천 모델 크기 | 추천 학습 토큰 |
|-------------|----------------|----------------|
| 10^21 FLOPs | ~400M | ~8B |
| 10^22 FLOPs | ~1.3B | ~26B |
| 10^23 FLOPs | ~7B | ~140B |
| 10^24 FLOPs | ~70B | ~1.4T |

## Kaplan vs Chinchilla 비교
| 측면 | Kaplan (2020) | Chinchilla (2022) |
|------|---------------|-------------------|
| 최적 N 스케일링 | C^0.73 | C^0.50 |
| 최적 D 스케일링 | C^0.27 | C^0.50 |
| 모델 크기 선호 | 대형 모델 | 균형 |
| 데이터 중요도 | 낮음 | **매우 높음** |

## 위키 반영 내역
- `wiki/concepts/scaling-laws.md` — Chinchilla 법칙 수식 및 의미
- `wiki/synthesis/llm-scaling-laws.md` — Kaplan vs Chinchilla 상세 비교