# Substack Articles Search Engine

![Diagram](static/app_diagram.png)

<div align="center">

<!-- Project Status -->

[![Build Status](https://github.com/silsgah/substack-newsletters-search/actions/workflows/ci.yml/badge.svg)](https://github.com/silsgah/substack-newsletters-search/actions/workflows/ci.yml)
[![Build Status](https://github.com/silsgah/substack-newsletters-search/actions/workflows/cd.yml/badge.svg)](https://github.com/silsgah/substack-newsletters-search/actions/workflows/cd.yml)
![Status](https://img.shields.io/badge/status-active-success.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/silsgah/substack-newsletters-search)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python version](https://img.shields.io/badge/python-3.12.8-blue.svg)](https://www.python.org/downloads/)
[![uv](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/uv/main/assets/badge/v0.json)](https://github.com/astral-sh/uv)

<!-- Providers -->

[![Supabase](https://img.shields.io/badge/Supabase-2.18.1-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Qdrant](https://img.shields.io/badge/Qdrant-1.15.1-5A31F4?logo=qdrant&logoColor=white)](https://qdrant.tech/)
[![Cloud Run](https://img.shields.io/badge/Google%20Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![Prefect](https://img.shields.io/badge/Prefect-3.4.17-FF4300?logo=prefect&logoColor=white)](https://www.prefect.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gradio](https://img.shields.io/badge/Gradio-5.45.0-FF4B4B?logo=gradio&logoColor=white)](https://gradio.app/)

</div>

<p align="center">
  <em>A RAG application for searching articles and getting answers on relevant topics from your favorite Substack newsletters</em>
</p>

## 📚 Table of Contents

- [Substack Articles Search Engine](#substack-articles-search-engine)
  - [📚 Table of Contents](#-table-of-contents)
  - [👤 Author](#-author)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [🎯 Why Take This Course?](#-why-take-this-course)
  - [👥 Who Is This Course For?](#-who-is-this-course-for)
  - [🧑‍🎓 What You Will Learn](#-what-you-will-learn)
  - [🎓 Prerequisites](#-prerequisites)
  - [💵 Does this course cost anything?](#-does-this-course-cost-anything)
  - [📚 Course Outline](#-course-outline)
  - [🚀 Getting Started](#-getting-started)
  - [🔌 Services Providers](#-services-providers)
  - [🪪 License](#-license)
  
## 👤 Author

**Silas Kwabla Gah** | ML Engineer

- 🔗 [LinkedIn](https://www.linkedin.com/in/silas-gah-46b126294)
- 🐙 [GitHub](https://github.com/silsgah)
- 📧 Email: gahsilas@gmail.com

---

## 🙏 Acknowledgments

This project is based on the excellent course created by:

- **Benito Martin** - [LinkedIn](https://www.linkedin.com/in/benitomartin/) | [AI Echoes Newsletter](https://aiechoes.substack.com/)
- **Miguel Otero Pedrido** - [LinkedIn](https://www.linkedin.com/in/migueloteropedrido/) | [YouTube](https://www.youtube.com/@TheNeuralMaze) | [The Neural Maze Newsletter](https://theneuralmaze.substack.com/)

Their comprehensive course materials provided the foundation for this implementation.

## 🎯 Why Take This Course?

Unlike basic tutorials, this course provides a comprehensive, hands-on guide to building a complete end-to-end Retrieval-Augmented Generation (RAG) system using modern tools and best practices. You’ll see how to:

- Automate data pipelines for ingesting and processing newsletter content
- Integrate multiple cloud and open-source services (Supabase, Qdrant, Prefect, FastAPI)
- Build a robust backend for keyword and LLM-powered search
- Deploy and interact with your system using Google Cloud, a Gradio UI and REST API

## 👥 Who Is This Course For?

| Audience              | Why Join?                                             |
|-----------------------|-------------------------------------------------------|
| ML/AI Engineers       | Build scalable RAG and LLM-powered search systems     |
| Software Engineers    | Learn modern backend, API, and cloud deployment skills|
| Data Engineers        | Automate data pipelines and vector search workflows   |
| AI Enthusiasts        | Get hands-on with real-world, production-grade tools  |

## 🧑‍🎓 What You Will Learn

By the end of this course, you will have a fully functional RAG system and the skills to build production-ready applications to search over your favorite newsletters. You will:

- Ingest articles from RSS feeds and store them in Supabase
- Generate and index embeddings in Qdrant, including payload indexes for filtering with optimized index configuration with quantization and hybrid search
- Orchestrate and schedule workflows with Prefect (local and cloud)
- Build and expose RESTful search endpoints using FastAPI
- Integrate multiple LLM providers (OpenRouter, OpenAI, Hugging Face)
- Deploy your backend to Google Cloud Run for global access
- Create an interactive Gradio UI for end-users

![Gradio UI](static/gradio_app.png)

## 🎓 Prerequisites

- Python (Intermediate)
- Basic understanding of REST APIs
- Familiarity with AI/LLM concepts is helpful
- Modern laptop/PC (no GPU required; free tiers are sufficient)

## 💵 Does this course cost anything?

- No, this course is completely free to access and learn from. Starring and sharing the repository is appreciated!
- Google Cloud Run monthly free tier is sufficient for deployment
- Prefect cloud monthly free tier is sufficient for orchestration once your flow is deployed but it is recommended to use prefect local server for development as it is unlimited.
- Supabase and Qdrant monthly free tiers are sufficient for hosting the Postgres and vector databases
- OpenRouter daily requests on free LLM models is sufficient for LLM calls but you can also use OpenAI or Hugging Face as backup LLM providers as the project supports multiple LLM providers.
- Any other tools used in this course like FastAPI, Docker, Gradio, or Opik are completely free to use.

## 📚 Course Outline

| Lesson | Topic                                                        | Substack Article                 | Description                                             |
|--------|--------------------------------------------------------------|--------------------------------|---------------------------------------------------------|
| 1      | Setup, Configuration & Articles Ingestion                    | [Lesson 1](https://aiechoes.substack.com/p/building-a-substack-articles-search)          | Supabase Postgres setup and ingesting articles           |
| 2      | Vector Embeddings & Semantic Search Infrastructure           | [Lesson 2](https://aiechoes.substack.com/p/building-a-substack-articles-search-6d1)        | Qdrant configuration and semantic search                 |
| 3      | FastAPI Backend & Multi-Provider LLM Support                 | [Lesson 3](https://aiechoes.substack.com/p/building-a-substack-articles-search-9dd)        | FastAPI backend, OpenRouter, OpenAI, Hugging Face        |
| 4      | Cloud Run Deployment & Gradio UI                             | [Lesson 4](https://aiechoes.substack.com/p/building-a-substack-articles-search-21a)          | Google Cloud Run deployment and Gradio UI                |
| 5      | Video Application Overview                                                   | [Lesson 5](https://theneuralmaze.substack.com/p/how-to-build-production-ready-rag)                | Video demo showcasing the entire pipeline                 |

## 🚀 Getting Started

Follow the [INSTRUCTIONS.md](INSTRUCTIONS.md) in the documentation to set up your environment, install dependencies, and configure services.

All components are explained in detail in the documentation but if you have any questions, feel free to open an issue or reach out!

## 🔌 Services Providers

This project integrates several best-in-class open-source and cloud services to provide a scalable, production-ready RAG pipeline:

| Service  | Description                           | Docs/Links                                                                  |
| -------- | ------------------------------------- | --------------------------------------------------------------------------- |
| Supabase | PostgreSQL database for articles      | [Supabase](https://supabase.com/docs)                                       |
| Qdrant   | Vector DB for embeddings              | [Qdrant](https://qdrant.tech/documentation/database-tutorials/bulk-upload/) |
| Prefect  | Orchestration for ingestion/embedding | [Prefect](https://docs.prefect.io/)                                         |
| OpenRouter                                    | LLM Provider                        | [OpenRouter](https://www.openrouter.com/)                                   |
| OpenAI, Hugging Face (backup)                 | LLM Provider (backup)               | [OpenAI](https://platform.openai.com/docs/) / [Hugging Face](https://huggingface.co/docs) |
| Docker   | Containerization                      | [Docker](https://docs.docker.com/)                                          |
| FastAPI  | API for querying/search               | [FastAPI](https://fastapi.tiangolo.com/)                                    |
| Google Cloud SDK | Command-line interface for Google Cloud services | [Google Cloud SDK](https://cloud.google.com/sdk/docs)    |
| Gradio   | UI                           | [Gradio](https://gradio.app/get_started)                                    |
| Opik AI  | LLM evaluation               | [Opik](https://opik.ai/)                                                    |
| Google Cloud Run | Deployment and hosting        | [Cloud Run](https://cloud.google.com/run/docs)                              |

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
