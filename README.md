# Substack Articles Search Engine

![Diagram](static/app_diagram.png)

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python version](https://img.shields.io/badge/python-3.12-3670A0.svg)](https://www.python.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.18.1-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Qdrant](https://img.shields.io/badge/Qdrant-1.15.1-5A31F4?logo=qdrant&logoColor=white)](https://qdrant.tech/)
[![Cloud Run](https://img.shields.io/badge/Google%20Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![Prefect](https://img.shields.io/badge/Prefect-3.4.17-FF4300?logo=prefect&logoColor=white)](https://www.prefect.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gradio](https://img.shields.io/badge/Gradio-5.45.0-FF4B4B?logo=gradio&logoColor=white)](https://gradio.app/)
</div>

A production-ready Retrieval-Augmented Generation (RAG) project that lets you index, search, and answer questions over Substack (RSS) newsletter articles using semantic search and LLMs.

This repository contains a complete backend for ingestion, indexing, search, and answer generation. It is designed for developers and teams who want a working RAG stack with real-world integrations (Qdrant, Supabase, Prefect, FastAPI) and multi-provider LLM support.

**Goals:**
- Provide a robust pipeline to ingest and store newsletter articles.
- Generate and index embeddings for semantic search.
- Offer REST APIs and an optional Gradio UI for search and question answering.
- Support multiple LLM providers and streaming/non-streaming responses.

**Quick links:**
- FastAPI entry: `src/api/main.py`
- Search logic: `src/api/services/search_service.py`
- Generation: `src/api/services/generation_service.py`
- Ingestion & pipelines: `src/pipelines/`
- Qdrant wrapper: `src/infrastructure/qdrant/qdrant_vectorstore.py`

## Table of Contents

- **Overview**
- **Architecture & Components**
- **Getting Started**
- **Running Locally**
- **Deployment**
- **Integrations**
- **Contributing**
- **License**

## Overview

This project is an application (not a course). It implements a full RAG stack to:

- Fetch articles from RSS/Substack feeds.
- Persist raw articles to Postgres (Supabase).
- Split content into chunks and produce embeddings.
- Store embeddings and metadata in Qdrant for fast vector search.
- Expose search endpoints and generate answers using LLMs.

Use cases: personal newsletter search, knowledge bases built from newsletters, research assistants over Substack content, and demo apps for RAG architectures.

## Architecture & Components

- **Ingestion**: Prefect flows in `src/pipelines/flows/` and tasks in `src/pipelines/tasks/` fetch RSS feeds, parse articles, and store them.
- **Storage**: Article metadata is stored in Supabase/Postgres (`src/infrastructure/supabase/`).
- **Vector Index**: Qdrant is used to store embeddings and payloads; client wrapper in `src/infrastructure/qdrant/`.
- **Search**: `src/api/services/search_service.py` performs hybrid dense + sparse queries, filtering and deduplication.
- **Generation**: `src/api/services/generation_service.py` constructs prompts and calls LLM providers (OpenRouter, OpenAI, Hugging Face) with streaming support.
- **API**: FastAPI app in `src/api/main.py` exposes `/search` and health endpoints and manages lifecycle (vectorstore init).
- **UI**: Optional Gradio interface in `frontend/` for interactive demos.

## Getting Started

Prerequisites:

- Python 3.10+ (project lists 3.12 in badges)
- Qdrant instance (local or hosted)
- Supabase project or Postgres instance
- API keys for chosen LLM providers (OpenRouter/OpenAI/Hugging Face)

Quick setup (zsh):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # and fill with your credentials
```

Start the API (development):

```bash
uvicorn "src.api.main:app" --reload --port 8080
```

Follow `INSTRUCTIONS.md` for detailed environment variables and service configuration.

## Running Ingestion & Indexing

- Use Prefect flows under `src/pipelines/flows/` to run RSS ingestion and embeddings ingestion.
- Example (local Prefect):

```bash
# run the RSS ingestion flow
python -m src.pipelines.flows.rss_ingestion_flow

# run embeddings ingestion
python -m src.pipelines.flows.embeddings_ingestion_flow
```

## Deployment

This project includes deployment resources for containerized deployment (Cloud Run):

- `Dockerfile`, `cloudbuild_fastapi.yaml`, and `deploy_fastapi.sh` provide an opinionated path to Google Cloud Run.
- CI/CD workflows (referenced badges) can be adapted to your cloud provider.

## Integrations

- Qdrant — vector DB for embeddings
- Supabase/Postgres — persistent storage for articles
- Prefect — orchestration for ingestion and embedding jobs
- OpenRouter, OpenAI, Hugging Face — supported LLM providers
- Gradio — optional demo UI

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests. If you want to contribute code, fork the repo and open a pull request following standard GitHub practices.

Recommended workflow:

1. Create a topic branch from `main`.
2. Add tests under `tests/` for new functionality.
3. Run the test suite and ensure formatting/linting.
4. Open a PR describing the change.

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---


