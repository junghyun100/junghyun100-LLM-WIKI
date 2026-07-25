---
source_id: 'src-001'
title: 'Attention Is All You Need'
authors: ['Vaswani et al.']
venue: 'NeurIPS 2017'
year: 2017
url: 'https://arxiv.org/abs/1706.03762'
type: 'paper'
tags: ['foundational', 'attention', 'transformer']
ingested_at: '2025-07-16'
ingested_by: 'claude'
content_hash: 'sha256:placeholder'
---

# Attention Is All You Need — Vaswani et al. (2017)

## 초록
기존 시퀀스 모델(RNN, CNN)은 순차 처리로 병렬화 어려움, 장기 의존성 학습 한계. Transformer는 **어텐션 메커니즘만**으로 시퀀스 모델링, 완전 병렬화 가능, 최신 SOTA 달성.

## 핵심 아이디어
- **Self-Attention**: 입력 시퀀스 내 모든 위치 간 관계 동시 계산
- **Multi-Head Attention**: 여러 representation subspace에서 attention 수행
- **Positional Encoding**: 순서 정보 주입 (sinusoidal 또는 learned)
- **Encoder-Decoder**: 인코더(양방향) + 디코더(자기회귀)

## 주요 수식

### Scaled Dot-Product Attention
```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

### Multi-Head Attention
```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W^O
head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

## 아키텍처 상세
| 구성요소 | 설명 |
|----------|------|
| 인코더 | 6레이어, 각 레이어: Multi-Head Attention + FFN + Residual + LayerNorm |
| 디코더 | 6레이어, Masked Multi-Head Attention + Encoder-Decoder Attention + FFN |
| 모델 차원 | d_model=512, d_k=d_v=64, h=8 heads |
| FFN | 2-layer MLP, hidden=2048, ReLU 활성화 |
| 정규화 | Post-LN (잔차 후 LayerNorm) |

## 벤치마크 결과 (WMT 2014 En-De)
| 모델 | BLEU | 파라미터 | 학습 시간 (GPU 8장) |
|------|------|----------|---------------------|
| Transformer (base) | 27.3 | 65M | 12시간 |
| Transformer (big) | 28.4 | 213M | 3.5일 |

## 한계점 (논문 언급)
- 시퀀스 길이 제약 (positional encoding 범위)
- 메모리/계산 O(n^2) — 장문서 처리 어려움
- 상대적 위치 정보 명시적 부재

## 인용문
> "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."

## 위키 반영 내역
- `wiki/concepts/attention.md` — 어텐션 메커니즘 수학적 기초
- `wiki/entities/transformer.md` — Transformer 아키텍처 엔티티