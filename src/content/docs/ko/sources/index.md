---
title: '원본 소스 인덱스'
description: '수집된 원본 소스 전체 목록'
---

# 원본 소스 (Sources)

모든 수집된 원본 자료 아카이브 (불변)

---

## 소스 목록

| ID | 제목 | 저자 | 연도 | 유형 | 태그 | 수집일 |
|----|------|------|------|------|------|--------|
| [src-001](src-001-attention-is-all-you-need) | Attention Is All You Need | Vaswani et al. | 2017 | paper | foundational, attention, transformer | 2025-07-16 |
| [src-002](src-002-gpt-4-technical-report) | GPT-4 Technical Report | OpenAI | 2023 | paper | gpt-4, multimodal, closed-source | 2025-07-16 |
| [src-003](src-003-scaling-laws-for-neural-language-models) | Scaling Laws for Neural Language Models | Kaplan et al. | 2020 | paper | scaling-laws, kaplan | 2025-07-10 |
| [src-004](src-004-flash-attention-3) | Flash Attention 3 | Dao et al. | 2024 | paper | attention, optimization, h100 | 2025-07-16 |
| [src-005](src-005-training-compute-optimal-large-language-models) | Training Compute-Optimal LLMs | Hoffmann et al. | 2022 | paper | scaling-laws, chinchilla | 2025-07-10 |

---

## 소스 추가 규칙

1. 파일명: `src-{번호:03d}-{짧은-설명}.md`
2. 프론트매터 필수 필드: `source_id`, `title`, `authors`, `venue`, `year`, `url`, `type`, `tags`, `ingested_at`, `ingested_by`, `content_hash`
3. 콘텐츠: 초록, 핵심 그림/표 설명, 주요 수식, 한계점, 인용문
4. 저작권 허용 범위 내 원문 저장 권장