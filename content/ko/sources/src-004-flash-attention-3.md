---
source_id: 'src-004'
title: 'Flash Attention 3: Fast and Accurate Attention with Asynchrony and Low Precision'
authors: ['Dao et al.']
venue: 'ArXiv 2024'
year: 2024
url: 'https://arxiv.org/abs/2407.08608'
type: 'paper'
tags: ['attention', 'optimization', 'h100', 'flash-attention']
ingested_at: '2025-07-16'
ingested_by: 'claude'
content_hash: 'sha256:placeholder'
---

# Flash Attention 3 — Dao et al. (2024)

## 개요
Flash Attention 2 대비 **1.5-2배 속도 향상**, H100 Hopper 아키텍처 최적화(비동기 복사, FP8/Tensor Core 활용, Warp Specialization).

## 핵심 혁신
| 기술 | 설명 | 효과 |
|------|------|------|
| **Asynchronous Copy** | TMA(①)로 Global↔Shared 메모리 비동기 전송 | 연산-메모리 오버랩, 대기 시간 제거 |
| **FP8 / Tensor Core** | Hopper FP8 MMA 명령어 활용 | 처리량 2배, 메모리 대역폭 2배 |
| **Warp Specialization** | Warp를 Producer/Consumer로 역할 분담 | 파이프라인 효율 극대화 |
| **Block-sparse / 변수 길이** | 가변 길이 시퀀스 지원 | 실무 유연성 향상 |

## 성능 (H100, 8K 컨텍스트)
| 구성 | FlashAttn-2 | FlashAttn-3 | 속도비 |
|------|-------------|-------------|--------|
| BF16 | 380 TFLOPs | 620 TFLOPs | **1.63x** |
| FP8 | - | 1.2 PFLOPs | - |

## 요구사항
- H100 (Hopper) GPU 필수
- CUDA 12.3+, cuDNN 8.9+

## 위키 반영 내역
- `wiki/concepts/attention.md` — Flash Attention 3 섹션 추가
- `wiki/entities/h100.md` — H100 GPU 엔티티 신규 생성