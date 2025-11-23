# Substack Articles Search Engine — Quick Overview

A compact overview and diagram for the Substack Articles Search Engine project. Use this file as a short landing summary for developers.

## Elevator pitch

A production-ready Retrieval-Augmented Generation (RAG) backend that ingests Substack RSS feeds, generates embeddings, indexes them in Qdrant, and exposes semantic search and LLM-powered QA via a FastAPI backend. Supports multiple LLM providers (OpenRouter, OpenAI, Hugging Face), Prefect orchestration, and Supabase/Postgres storage.

## Mermaid Architecture (copy into GitHub README or Mermaid Live Editor)

```mermaid
flowchart LR
  subgraph Ingestion
    Feeds[RSS / Substack Feeds]
    Prefect[Prefect Flows<br/>(src/pipelines/flows/)]
    Ingest[Ingestion Worker / Parser]
    Feeds --> Prefect --> Ingest
  end

  subgraph StorageIndex["Storage & Indexing"]
    Postgres[Supabase / Postgres<br/>(src/infrastructure/supabase/)]
    Splitter[Text Splitter<br/>(src/utils/text_splitter.py)]
    EmbGen[Embeddings Generator]
    Qdrant[Qdrant Vector DB<br/>(src/infrastructure/qdrant/)]
    Ingest --> Postgres
    Ingest --> Splitter --> EmbGen --> Qdrant
  end

  subgraph API["API & Generation"]
    FastAPI[FastAPI<br/>(src/api/main.py)]
    SearchSvc[Search Service<br/>(src/api/services/search_service.py)]
    GenSvc[Generation Service<br/>(src/api/services/generation_service.py)]
    FastAPI --> SearchSvc
    FastAPI --> GenSvc
    SearchSvc --> Qdrant
    GenSvc --> SearchSvc
  end

  subgraph Providers["LLM Providers"]
    OR(OpenRouter)
    OA(OpenAI)
    HF(Hugging Face)
    GenSvc --> OR
    GenSvc --> OA
    GenSvc --> HF
  end

  Gradio[Gradio UI<br/>(frontend/)] --> FastAPI
  CI[Docker / Cloud Run / CI] --> FastAPI
  CI --> Prefect
``` 

## How to render the PlantUML

1. Open `architecture.puml` with the PlantUML VS Code extension or any PlantUML renderer.
2. Export as SVG or PNG for documentation: `PlantUML: Export Current Diagram`.

## Next steps

- If you want, I can render the PlantUML to an SVG and add it to `static/`.
- I can also create a small PNG/SVG with a legend and icons if you prefer.
