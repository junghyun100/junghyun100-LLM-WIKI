---
title: 'Attention Mechanism'
description: 'Query-Key-Value 어텐션 수학적 기초와 변형 (TEST 콘텐츠)'
type: 'concept'
sources: ['src-001', 'src-004', 'src-019']
tags: ['foundational', 'architecture', 'math', 'attention', 'test']
last_updated: '2025-07-16'
confidence: 'high'
---

# Attention Mechanism (TEST)

> Query-Key-Value 어텐션의 수학적 기초와 주요 변형 — **TEST 콘텐츠**

## 정의
어텐션은 쿼리(Query), 키(Key), 밸류(Value) 벡터 간 유사도 계산으로 시퀀스 내 토큰 간 관계를 모델링하는 메커니즘입니다. Transformer 아키텍처의 핵심 구성요소입니다.

## 수학적 기초
$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

- $Q \in \mathbb{R}^{n \times d_k}$: Query 행렬
- $K \in \mathbb{R}^{m \times d_k}$: Key 행렬
- $V \in \mathbb{R}^{m \times d_v}$: Value 행렬
- $d_k$: 키 차원 (스케일링용)

## 주요 변형

| 변형 | 핵심 아이디어 | 장점 |
|------|---------------|------|
| **Multi-Head** | $h$개 헤드로 병렬 어텐션, concat 후 projection | 다양한 표현 공간 학습 |
| **Flash Attention** | I/O-aware 알고리즘, 블록 단위 연산 | 메모리 효율, 속도 향상 |
| **Flash Attention 2** | 워크 분배 최적화, 시퀀스 병렬화 | 다중 GPU 확장성 |
| **Flash Attention 3** | H100 텐서 코어 활용, 비동기 복사 | 1.5-2배 추가 속도 향상 |
| **Grouped-Query (GQA)** | Key/Value 헤드 수 < Query 헤드 수 | 디코딩 속도 ↑, 품질 유지 |
| **Sliding Window** | 로컬 윈도우 내만 어텐션 | 장문 처리 메모리 절약 |
| **Linear Attention** | 커널 트릭으로 $O(n^2) \to O(n)$ | 극장문 처리 가능 |

## 실무 적용 고려사항

### 장점
- 병렬 연산 용이 (RNN 대비)
- 장거리 의존성 포착
- 해석 가능성 (어텐션 가중치 시각화)

### 단점/한계
- $O(n^2)$ 메모리/연산 복잡도 (시퀀스 길이 $n$)
- 매우 긴 시퀀스에서 비효율적
- 위치 정보 별도 필요 (PE/RoPE)

### 대안
- **RWKV/State Space Models**: RNN 유사 선형 복잡도
- **Retrieval-based**: 관련 토큰만 어텐션 (RAG 유사)
- **Sparse Attention**: 고정 패턴/학습된 희소 패턴

## 관련 개념
- [[Transformer]] — 어텐션 기반 아키텍처 (Entity)
- [[RoPE]] — 회위 인코딩 변형
- [[Flash Attention]] — 최적화 구현체

## 참조 소스
- [src-001](../sources/src-001-attention-is-all-you-need.md) — Attention Is All You Need
- [src-004](../sources/src-004-flash-attention-3.md) — Flash Attention 3
- [src-019](../sources/src-019-flash-attention-2.md) — Flash Attention 2

## 변경 이력
- 2025-07-16: 초기 생성 (TEST용 샘플 페이지)