# Substack Newsletter Search Engine

<div align="center">

![System Architecture](substacknewsletter.png)
![System Architecture](TrimedVersion.mov)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12](https://img.shields.io/badge/python-3.12-3670A0.svg)](https://www.python.org/)

**Production-grade semantic search and question-answering system for Substack newsletters**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Deployment](#-deployment) • [API Docs](#-api-reference)

</div>

---

## 🎯 Overview

A complete **Retrieval-Augmented Generation (RAG)** system that indexes, searches, and generates answers from Substack newsletter articles using state-of-the-art semantic search and LLMs. Built for production with real-world integrations, multi-provider LLM support, and comprehensive observability.

### Key Capabilities

- **🔍 Semantic Search**: Dense + sparse hybrid retrieval with reciprocal rank fusion
- **💬 Question Answering**: Multi-provider LLM support with streaming responses
- **📰 Automated Ingestion**: RSS feed monitoring and article processing pipelines
- **🎯 Production Ready**: Full observability, CI/CD, and cloud deployment configs
- **🔧 Extensible**: Modular architecture supporting custom providers and backends

### Use Cases

- Personal newsletter knowledge bases
- Research assistants for Substack content
- Enterprise newsletter aggregation and search
- Demo applications for RAG architectures

---

## ✨ Features

### Data Pipeline
- **RSS Ingestion**: Orchestrated Prefect flows for feed monitoring and article extraction
- **Intelligent Chunking**: Semantic text splitting optimized for newsletter content
- **Persistent Storage**: Supabase/PostgreSQL for article metadata and full-text
- **Embedding Generation**: Batch processing with rate limiting and retry logic

### Search & Retrieval
- **Hybrid Search**: Dense vector + sparse BM25 with RRF fusion
- **Smart Deduplication**: Point ID and title-based result deduplication
- **Advanced Filtering**: Temporal, author, and metadata-based filtering
- **Result Ranking**: Configurable score normalization and reranking

### LLM Integration
- **Multi-Provider Support**: OpenRouter, OpenAI, Hugging Face
- **Streaming & Batch**: SSE streaming for real-time responses
- **Context Management**: Automatic prompt optimization and truncation
- **Evaluation**: Built-in faithfulness and relevance metrics (Opik)

### Infrastructure
- **Vector Store**: Qdrant with optimized payload indexing
- **Database**: Supabase with full-text search capabilities
- **Orchestration**: Prefect for workflow management
- **Observability**: Structured logging, request tracing, Comet ML tracking

### API & UI
- **FastAPI Backend**: Async endpoints with automatic OpenAPI docs
- **Gradio Interface**: Interactive demo UI for testing
- **CORS Support**: Configurable cross-origin policies
- **Health Checks**: Comprehensive system status endpoints

---

## 🏗️ Architecture
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│ RSS Feeds   │─────▶│   Prefect    │─────▶│  Supabase   │
│ (Substack)  │      │  Pipelines   │      │  (Postgres) │
└─────────────┘      └──────────────┘      └─────────────┘
                            │                      │
                            ▼                      ▼
                     ┌──────────────┐      ┌─────────────┐
                     │  Embeddings  │─────▶│   Qdrant    │
                     │  Generation  │      │  VectorDB   │
                     └──────────────┘      └─────────────┘
                                                   │
                                                   ▼
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │◀────▶│   FastAPI    │◀────▶│  Search     │
│  (Gradio)   │      │   Backend    │      │  Service    │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ LLM Provider │
                     │ (OpenRouter/ │
                     │  OpenAI/HF)  │
                     └──────────────┘
```

### Component Overview

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Ingestion** | Prefect | Orchestrated RSS processing and ETL |
| **Storage** | Supabase/Postgres | Article metadata and full-text |
| **Vector Index** | Qdrant | Semantic search and embeddings |
| **Search** | Custom Service | Hybrid retrieval with deduplication |
| **Generation** | Multi-provider | LLM-powered answer generation |
| **API** | FastAPI | RESTful endpoints and lifecycle management |
| **UI** | Gradio | Interactive demo interface |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+ (recommended 3.12)
- Qdrant instance (local or cloud)
- Supabase project or PostgreSQL database
- LLM provider API keys (OpenRouter/OpenAI/Hugging Face)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/substack-newsletters-search.git
cd substack-newsletters-search

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your credentials
```

### Environment Configuration

Required environment variables:
```bash
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Vector Store
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_key

# LLM Provider (choose one or more)
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
HUGGINGFACE_API_KEY=your_hf_key

# Optional: Observability
COMET_API_KEY=your_comet_key
OPIK_API_KEY=your_opik_key
```

### Running the API
```bash
# Development mode with auto-reload
uvicorn src.api.main:app --reload --port 8080

# Production mode
uvicorn src.api.main:app --host 0.0.0.0 --port 8080 --workers 4
```

API will be available at `http://localhost:8080`

- Interactive docs: `http://localhost:8080/docs`
- OpenAPI schema: `http://localhost:8080/openapi.json`

### Running Ingestion Pipelines
```bash
# RSS ingestion (fetch and store articles)
python -m src.pipelines.flows.rss_ingestion_flow

# Generate and index embeddings
python -m src.pipelines.flows.embeddings_ingestion_flow

# Or use Prefect deployment
prefect deployment run "RSS Ingestion/production"
```

### Running the UI
```bash
cd frontend
python app.py
# Access at http://localhost:7860
```

---

## 📁 Project Structure
```
substack-newsletters-search/
├── src/
│   ├── api/                          # FastAPI application
│   │   ├── main.py                   # Application entry point
│   │   ├── routes/                   # Endpoint definitions
│   │   │   ├── search.py             # Search endpoints
│   │   │   └── health.py             # Health check endpoints
│   │   ├── services/                 # Business logic layer
│   │   │   ├── search_service.py     # Hybrid search implementation
│   │   │   ├── generation_service.py # LLM answer generation
│   │   │   └── providers/            # LLM provider integrations
│   │   │       ├── openrouter.py     # OpenRouter client
│   │   │       ├── openai.py         # OpenAI client
│   │   │       └── huggingface.py    # HuggingFace client
│   │   ├── models/                   # API schemas (Pydantic)
│   │   ├── middleware/               # Request/response middleware
│   │   └── exceptions/               # Custom exception handlers
│   │
│   ├── pipelines/                    # Data processing pipelines
│   │   ├── flows/                    # Prefect workflows
│   │   │   ├── rss_ingestion_flow.py # RSS fetching and parsing
│   │   │   └── embeddings_ingestion_flow.py # Embedding generation
│   │   └── tasks/                    # Reusable Prefect tasks
│   │       ├── fetch_rss.py          # RSS parsing logic
│   │       ├── store_articles.py     # Database persistence
│   │       └── generate_embeddings.py # Embedding creation
│   │
│   ├── infrastructure/               # External service integrations
│   │   ├── qdrant/                   # Vector store client
│   │   │   ├── qdrant_vectorstore.py # Async Qdrant wrapper
│   │   │   └── collection_manager.py # Collection operations
│   │   └── supabase/                 # Database client
│   │       ├── supabase_client.py    # Async Supabase wrapper
│   │       └── models.py             # SQLAlchemy models
│   │
│   ├── models/                       # Domain models
│   │   ├── article.py                # Article entity
│   │   ├── chunk.py                  # Text chunk entity
│   │   └── search_result.py          # Search result entity
│   │
│   ├── utils/                        # Shared utilities
│   │   ├── logger_util.py            # Structured logging
│   │   ├── text_splitter.py          # Semantic chunking
│   │   └── config_loader.py          # Configuration management
│   │
│   ├── configs/                      # Configuration files
│   │   └── newsletter_sources.yaml   # RSS feed definitions
│   │
│   └── config.py                     # Centralized settings
│
├── frontend/                         # Gradio UI
│   ├── app.py                        # Gradio interface
│   └── components/                   # UI components
│
├── tests/                            # Test suite
│   ├── unit/                         # Unit tests
│   │   ├── test_search_service.py
│   │   ├── test_generation_service.py
│   │   └── test_text_splitter.py
│   ├── integration/                  # Integration tests
│   │   ├── test_api_endpoints.py
│   │   ├── test_qdrant_integration.py
│   │   └── test_pipeline_flows.py
│   └── conftest.py                   # Pytest configuration
│
├── .github/                          # GitHub workflows
│   └── workflows/
│       ├── ci.yml                    # Continuous integration
│       └── deploy.yml                # Deployment automation
│
├── Dockerfile                        # Container definition
├── docker-compose.yml                # Local development stack
├── cloudbuild_fastapi.yaml           # Google Cloud Build config
├── deploy_fastapi.sh                 # Cloud Run deployment script
├── prefect-cloud.yaml                # Prefect Cloud deployment
├── prefect-local.yaml                # Prefect local deployment
├── Makefile                          # Development commands
├── pyproject.toml                    # Project metadata and deps
├── requirements.txt                  # Python dependencies
├── .env.example                      # Environment template
└── README.md                         # This file
```

---

## 🔧 Development

### Common Tasks
```bash
# Run tests
make test                    # All tests
make test-unit              # Unit tests only
make test-integration       # Integration tests only

# Code quality
make lint                   # Run linters
make format                 # Format code
make type-check             # Type checking with mypy

# Development
make run-api                # Start API server
make run-ui                 # Start Gradio UI
make run-pipelines          # Execute ingestion flows

# Database
make db-migrate             # Run migrations
make db-seed                # Seed test data
```

### Adding a New LLM Provider

1. Create provider class in `src/api/services/providers/`
2. Implement `BaseProvider` interface
3. Register in `src/api/services/generation_service.py`
4. Add configuration to `src/config.py`
5. Add tests in `tests/unit/test_providers/`

Example:
```python
from src.api.services.providers.base import BaseProvider

class CustomProvider(BaseProvider):
    async def generate(self, prompt: str, **kwargs) -> str:
        # Implementation
        pass
    
    async def generate_stream(self, prompt: str, **kwargs):
        # Streaming implementation
        pass
```

### Code Style

- Follow PEP 8 guidelines
- Use type hints throughout
- Maintain >80% test coverage
- Document public APIs with docstrings
- Use async/await for I/O operations

---

## 📊 API Reference

### Search Endpoint

**POST** `/api/v1/search`

Search for articles using semantic search.

**Request Body:**
```json
{
  "query": "What are the latest trends in AI?",
  "top_k": 10,
  "filters": {
    "author": "Paul Graham",
    "date_after": "2024-01-01"
  }
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "article_123",
      "title": "The Future of AI",
      "author": "Paul Graham",
      "url": "https://example.com/article",
      "score": 0.95,
      "content": "...",
      "published_date": "2024-03-15"
    }
  ],
  "total": 42,
  "query_time_ms": 125
}
```

### Generate Answer Endpoint

**POST** `/api/v1/generate`

Generate an answer using retrieved context.

**Request Body:**
```json
{
  "query": "Summarize the key points about AI safety",
  "context_ids": ["article_123", "article_456"],
  "provider": "openrouter",
  "model": "anthropic/claude-3-opus",
  "stream": true
}
```

**Response (SSE Stream):**
```
data: {"type": "token", "content": "Based"}
data: {"type": "token", "content": " on"}
data: {"type": "token", "content": " the"}
...
data: {"type": "done", "metadata": {"tokens": 156}}
```

### Health Check

**GET** `/health`

System health status.

**Response:**
```json
{
  "status": "healthy",
  "services": {
    "database": "operational",
    "vector_store": "operational",
    "llm_provider": "operational"
  },
  "version": "1.0.0"
}
```

---

## 🚀 Deployment

### Docker Deployment
```bash
# Build image
docker build -t newsletter-search:latest .

# Run container
docker run -p 8080:8080 \
  --env-file .env \
  newsletter-search:latest

# Or use docker-compose
docker-compose up -d
```

### Google Cloud Run
```bash
# Deploy using provided script
./deploy_fastapi.sh

# Or use Cloud Build
gcloud builds submit --config cloudbuild_fastapi.yaml

# Set environment variables
gcloud run services update newsletter-search \
  --update-env-vars QDRANT_URL=...,SUPABASE_URL=...
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s/

# Or use Helm
helm install newsletter-search ./charts/newsletter-search \
  --values values.production.yaml
```

### Prefect Deployment
```bash
# Deploy to Prefect Cloud
prefect deployment apply prefect-cloud.yaml

# Or local server
prefect deployment apply prefect-local.yaml

# Schedule ingestion
prefect deployment run "RSS Ingestion/production" \
  --param schedule="0 */6 * * *"  # Every 6 hours
```

---

## 🔌 Integrations

### Qdrant
- Vector similarity search
- Payload-based filtering
- Batch operations
- Collection management

**Configuration:**
```python
QDRANT_URL = "https://your-cluster.qdrant.io"
QDRANT_API_KEY = "your-api-key"
QDRANT_COLLECTION = "newsletters"
```

### Supabase/PostgreSQL
- Article metadata storage
- Full-text search
- User management (optional)
- Real-time subscriptions

**Schema:**
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author TEXT,
  url TEXT UNIQUE,
  published_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Prefect
- Workflow orchestration
- Scheduled ingestion
- Task retry logic
- Observability dashboard

**Example Flow:**
```python
@flow(name="RSS Ingestion")
def ingest_newsletters():
    feeds = get_feed_urls()
    articles = fetch_articles(feeds)
    store_articles(articles)
    generate_embeddings(articles)
```

### LLM Providers

**OpenRouter:**
- Access to 100+ models
- Unified API interface
- Cost optimization

**OpenAI:**
- GPT-4, GPT-3.5
- Function calling
- Embeddings

**Hugging Face:**
- Open-source models
- Inference API
- Custom deployments

---

## 🧪 Testing
```bash
# Run all tests with coverage
pytest --cov=src --cov-report=html

# Run specific test categories
pytest tests/unit/
pytest tests/integration/
pytest -m "not slow"  # Skip slow tests

# Run with verbose output
pytest -v --tb=short

# Generate coverage report
coverage run -m pytest
coverage html
open htmlcov/index.html
```

### Test Structure

- **Unit Tests**: Isolated component testing with mocks
- **Integration Tests**: Database and API integration
- **E2E Tests**: Full pipeline validation

---

## 📈 Monitoring & Observability

### Logging
- Structured JSON logging
- Request/response tracing
- Error tracking with stack traces
- Performance metrics

### Metrics (Comet ML)
- Search latency
- Embedding generation time
- LLM token usage
- Pipeline execution stats

### Evaluation (Opik)
- Answer faithfulness
- Context relevance
- Hallucination detection
- Quality scoring

---

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Vector search powered by [Qdrant](https://qdrant.tech/)
- Orchestration by [Prefect](https://www.prefect.io/)
- Database by [Supabase](https://supabase.com/)

---

## 📞 Contact

- **Author**: Silas Kwabla Gah
- **GitHub**: [@silsgah](https://github.com/silsgah)
- **LinkedIn**: [Silas Gah](https://www.linkedin.com/in/silas-gah-46b126294)
- **Email**: gahsilas@gmail.com

---

**⭐ If you found this project helpful, please star the repository!**

---

## 🎓 Learning Resources

**Key Concepts Demonstrated:**
- RAG system architecture and implementation
- LLM fine-tuning (SFT + DPO)
- Vector database integration
- MLOps best practices
- Microservices architecture
- CI/CD for ML systems
- Production deployment strategies
- Monitoring and observability

**Skills Showcased:**
- Python (FastAPI, Poetry, type hints)
- Machine Learning (transformers, sentence-transformers)
- MLOps (ZenML, Docker, CI/CD)
- Cloud Infrastructure (AWS, Docker)
- Database Design (MongoDB, Qdrant)
- API Design (REST, async)
- Frontend Development (Next.js)
- System Architecture


*Last Updated: November 2025*
