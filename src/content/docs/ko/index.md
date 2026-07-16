---
title: '전체 인덱스'
description: 'LLM Wiki 전체 콘텐츠 카탈로그 — 엔티티, 개념, 소스 현황 (날짜순 정렬)'
---

# 전체 인덱스 (Index) <span class="badge">Starlight: <a href="https://starlight.astro.build" target="_blank">starlight.astro.build</a></span>

LLM Wiki 전체 콘텐츠 카탈로그입니다. 모든 페이지는 `last_updated` 내림차순(최신순)으로 정렬됩니다.

> **범례**: ✅ high confidence | ⚠️ medium | ❓ low | 🔗 소스 수

---

## 엔티티 (Entities) — 날짜순 최신 우선

| 날짜 | 페이지 | 종류 | 설명 | 소스 | 최종 갱신 | 신뢰도 |
|------|--------|------|------|------|-----------|--------|
| 2025-07-16 | [GPT-4](/wiki/entities/2025-07-16-gpt-4) | model | OpenAI 멀티모달 LLM, ~1.76T 파라미터 | 3개 | 2025-07-16 | ✅ |
| 2025-07-16 | [Transformer](/wiki/entities/2025-07-16-transformer) | paper | Vaswani et al. 2017, Attention Is All You Need | 2개 | 2025-07-16 | ✅ |
| 2025-07-16 | [H100](/wiki/entities/2025-07-16-h100) | tool | NVIDIA Hopper GPU, 트랜스포머 엔진 | 2개 | 2025-07-16 | ✅ |

---

## 개념 (Concepts) — 날짜순 최신 우선

| 날짜 | 페이지 | 설명 | 소스 | 최종 갱신 | 신뢰도 |
|------|--------|------|------|-----------|--------|
| 2025-07-16 | [Attention Mechanism](/wiki/concepts/2025-07-16-attention) | Query-Key-Value 어텐션 수학적 기초와 변형 (Flash Attention 3 포함) | 3개 | 2025-07-16 | ✅ |
| 2025-07-10 | [Scaling Laws](/wiki/concepts/2025-07-10-scaling-laws) | Kaplan & Chinchilla 스케일링 법칙 비교 | 2개 | 2025-07-10 | ✅ |

---

## 원본 소스 (Sources) — 수집일자순

| ID | 제목 | 저자 | 연도 | 유형 | 태그 | 수집일 |
|----|------|------|------|------|------|------|------|--------|
| src-001 | Attention Is All You Need | Vaswani et al. | 2017 | paper | foundational, attention, transformer | 2025-07-16 |
| src-002 | GPT-4 Technical Report | OpenAI | 2023 | paper | gpt-4, multimodal, closed-source | 2025-07-16 |
| src-003 | Scaling Laws for Neural Language Models | Kaplan et al. | 2020 | paper | scaling-laws, kaplan | 2025-07-10 |
| src-004 | Flash Attention 3 | Dao et al. | 2024 | paper | attention, optimization, h100 | 2025-07-16 |
| src-005 | Training Compute-Optimal LLMs | Hoffmann et al. | 2022 | paper | scaling-laws, chinchilla | 2025-07-10 |

---

## 통계 요약

- **총 페이지**: 7개 (엔티티 3, 개념 2, 합성 1, 비교 1 예정)
- **총 소스**: 5개 (논문 5)
- **신뢰도 분포**: high 5, medium 0, low 0
- **최신 갱신**: 2025-07-16

---

> **갱신 규칙**: 모든 `ingest` 워크플로 완료 후 자동 갱신. 수동 수정 시 `last_updated` 필수 갱신.