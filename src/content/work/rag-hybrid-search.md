---
title: "Production RAG pipeline on PostgreSQL + pgvector"
description: "End-to-end retrieval-augmented generation pipeline for a knowledge-heavy SaaS. Chunking, embeddings, hybrid search (BM25 + vector + RRF), Cohere reranker, eval harness, and cost guardrails — running entirely on Postgres + pgvector, no managed vector DB."
category: ai
stack:
  - "Laravel"
  - "PostgreSQL"
  - "pgvector"
  - "OpenAI Embeddings"
  - "Cohere Rerank"
  - "Anthropic Claude"
  - "Eval harness (Pest)"
outcome: "Answer accuracy passed eval bar; vector infra cost cut vs managed DB"
order: 4
featured: false
---
