# 🚀 Complete Setup Guide: Substack Articles Search Engine

This guide walks you through setting up and running the entire project from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Service Setup](#service-setup)
4. [Environment Configuration](#environment-configuration)
5. [Initial Setup Commands](#initial-setup-commands)
6. [Running the Application](#running-the-application)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Software

| Software | Version | Purpose | Installation |
|----------|---------|---------|--------------|
| **Python** | 3.12+ | Programming language | [Download](https://www.python.org/downloads/) |
| **uv** | Latest | Package manager | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| **Git** | Latest | Version control | `brew install git` (macOS) or [Download](https://git-scm.com/) |

### Required Accounts (Free Tiers Available)

| Service | Purpose | Sign Up |
|---------|---------|---------|
| **Supabase** | PostgreSQL database | [supabase.com](https://supabase.com) |
| **Qdrant** | Vector database | [qdrant.tech](https://qdrant.tech) |
| **OpenRouter** | LLM provider (free tier) | [openrouter.ai](https://openrouter.ai) |
| **Prefect** | Workflow orchestration | [prefect.io](https://prefect.io) |

### Optional Services

| Service | Purpose | When Needed |
|---------|---------|-------------|
| **OpenAI** | Alternative LLM provider | If not using OpenRouter |
| **Hugging Face** | Alternative LLM provider | If not using OpenRouter |
| **Opik** | LLM evaluation | For quality metrics |
| **Google Cloud** | Deployment | For production deployment |
| **Docker** | Containerization | For deployment |

---

## 2. Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/benitomartin/substack-newsletters-search-course.git
cd substack-newsletters-search-course
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (including dev and test)
uv sync --all-groups

# Activate virtual environment
source .venv/bin/activate
```

### Step 3: Create Environment File

```bash
# Create .env file (you'll configure it in the next section)
touch .env
```

---

## 3. Service Setup

### 📍 Quick Reference: Where to Find Supabase Connection Info

**Navigation Path:**
```
Supabase Dashboard → Your Project → ⚙️ Settings → Database
```

**What You're Looking For:**
- A connection string that starts with `postgresql://`
- OR individual fields: Host, Port, Database, User
- A "Database password" field (separate from connection string)

**Connection String Format:**
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

**Transaction Pool Connection (Recommended):**
- Port: `6543`
- Host: Usually contains `.pooler.supabase.com`
- Example: `aws-0-us-east-1.pooler.supabase.com`

**Direct Connection (Alternative):**
- Port: `5432`
- Host: Usually contains `.supabase.co` (not pooler)
- Example: `db.abcdefghijklmnop.supabase.co`

---

## 3. Service Setup

### 🗄️ Step 1: Supabase Setup

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for free account
   - Create a new project (wait for it to finish provisioning)

2. **Get Database Credentials - Method 1: Settings Page (Recommended)**
   
   **Step-by-step:**
   - In your Supabase project dashboard
   - Click the **⚙️ Settings** icon (gear icon) in the left sidebar
   - Click **"Database"** in the settings menu
   - Scroll down to find **"Connection string"** or **"Connection pooling"** section
   - Look for tabs: **"URI"**, **"Transaction"**, **"Session"**
   - Click on the **"Transaction"** tab (this is the Transaction Pool method)
   - You'll see a connection string like:
     ```
     postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
   - **Copy this connection string**

3. **Get Database Credentials - Method 2: Project Settings**
   
   If you don't see the connection string in Database settings:
   - Go to **Settings** → **"Project Settings"** (or **"General"**)
   - Look for **"Database"** section
   - Find **"Connection string"** or **"Connection info"**
   - Select **"Transaction Pool"** or **"Pooler"** connection method
   - Copy the connection string

4. **Get Database Password**
   
   **Important**: The password is NOT in the connection string. You need to get it separately:
   - Go to **Settings** → **"Database"**
   - Look for **"Database password"** section
   - If you haven't set one, click **"Reset database password"**
   - **Copy and save this password** (you'll need it for `.env`)

5. **Extract Connection Details from Connection String**
   
   Once you have the connection string, extract the parts:
   
   **Example connection string:**
   ```
   postgresql://postgres.abcdefghijklmnop:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   
   **Extract these values:**
   - **User**: `postgres.abcdefghijklmnop` (everything between `postgresql://` and `:`)
   - **Password**: `[YOUR_PASSWORD]` (the password you got from step 4)
   - **Host**: `aws-0-us-east-1.pooler.supabase.com` (the domain name)
   - **Port**: `6543` (usually 6543 for Transaction Pool)
   - **Database**: `postgres` (usually just "postgres")
   
   **If you can't find the connection string, you can also find these values separately:**
   - **Host**: Look for "Host" or "Connection host" in Database settings
   - **Port**: Usually `6543` for Transaction Pool, `5432` for Direct connection
   - **Database**: Usually `postgres`
   - **User**: Usually starts with `postgres.` followed by your project reference
   - **Password**: From Database password section (see step 4)

6. **Alternative: Use Connection Info Section**
   
   In Supabase Dashboard:
   - Go to **Settings** → **"Database"**
   - Look for **"Connection info"** or **"Connection parameters"**
   - You might see individual fields for:
     - Host
     - Port
     - Database name
     - User
   - Use these values directly in your `.env` file

### 🧠 Step 2: Qdrant Setup

1. **Create Qdrant Account**
   - Go to [cloud.qdrant.io](https://cloud.qdrant.io)
   - Sign up for free account
   - Create a new cluster (free tier available)

2. **Get API Credentials**
   - In your Qdrant dashboard
   - Go to **"API Keys"** section
   - Create a new API key
   - Copy the **API Key** and **Cluster URL**

3. **Note Your Collection Name**
   - Default: `substack_collection`
   - You can change this in `.env` if needed

### ⚡ Step 3: Prefect Setup

**Option A: Prefect Cloud (Recommended for Production)**

1. **Create Prefect Account**
   - Go to [app.prefect.cloud](https://app.prefect.cloud)
   - Sign up for free account (500 minutes/month free)

2. **Get API Credentials**
   - In Prefect Cloud dashboard
   - Go to **"API Keys"**
   - Create a new API key
   - Copy the **API Key**, **Workspace**, and **API URL**

**Option B: Prefect Local Server (Recommended for Development)**

1. **Install Prefect**
   ```bash
   # Already installed via uv sync
   ```

2. **Start Local Server**
   ```bash
   prefect server start
   # Server runs at http://127.0.0.1:4200
   ```

3. **Create Work Pool**
   ```bash
   prefect work-pool create --type process default-work-pool
   ```

4. **Start Worker**
   ```bash
   prefect worker start --pool default-work-pool
   ```

### 🤖 Step 4: OpenRouter Setup

1. **Create OpenRouter Account**
   - Go to [openrouter.ai](https://openrouter.ai)
   - Sign up for free account
   - Go to **"Keys"** section
   - Create a new API key
   - Copy the **API Key**

2. **Note**: OpenRouter has generous free tier with many free models!

### 🔑 Step 5: Optional Services

**OpenAI (Optional)**
- Go to [platform.openai.com](https://platform.openai.com)
- Create API key
- Add to `.env` if you want to use OpenAI instead of OpenRouter

**Hugging Face (Optional)**
- Go to [huggingface.co](https://huggingface.co)
- Create API key in Settings
- Add to `.env` if you want to use Hugging Face models

**Opik (Optional - for Evaluation)**
- Go to [opik.ai](https://opik.ai)
- Sign up and create project
- Get API key and project name

---

## 4. Environment Configuration

Create a `.env` file in the project root with the following variables:

```bash
# ============================================
# SUPABASE DATABASE CONFIGURATION
# ============================================
SUPABASE_DB__TABLE_NAME=substack_articles
SUPABASE_DB__HOST=your_supabase_host_here
SUPABASE_DB__NAME=postgres
SUPABASE_DB__USER=your_supabase_user_here
SUPABASE_DB__PASSWORD=your_supabase_password_here
SUPABASE_DB__PORT=6543

# ============================================
# QDRANT VECTOR DATABASE CONFIGURATION
# ============================================
QDRANT__URL=your_qdrant_cluster_url_here
QDRANT__API_KEY=your_qdrant_api_key_here
QDRANT__COLLECTION_NAME=substack_collection

# ============================================
# PREFECT ORCHESTRATION CONFIGURATION
# ============================================
# For Prefect Cloud:
PREFECT__API_KEY=your_prefect_api_key_here
PREFECT__WORKSPACE=your_prefect_workspace_here
PREFECT__API_URL=https://api.prefect.cloud/api/accounts/[ACCOUNT_ID]/workspaces/[WORKSPACE_ID]

# For Prefect Local (leave these empty):
# PREFECT__API_KEY=
# PREFECT__WORKSPACE=
# PREFECT__API_URL=http://127.0.0.1:4200/api

# ============================================
# LLM PROVIDER CONFIGURATION
# ============================================
# OpenRouter (Default - Recommended)
OPENROUTER__API_KEY=your_openrouter_api_key_here
OPENROUTER__API_URL=https://openrouter.ai/api/v1

# OpenAI (Optional - if not using OpenRouter)
# OPENAI__API_KEY=your_openai_api_key_here

# Hugging Face (Optional)
# HUGGING_FACE__API_KEY=your_huggingface_api_key_here

# ============================================
# OPIK EVALUATION (Optional)
# ============================================
# OPIK__API_KEY=your_opik_api_key_here
# OPIK__PROJECT_NAME=substack-pipeline

# ============================================
# FASTAPI CONFIGURATION
# ============================================
ALLOWED_ORIGINS=http://localhost:7860,http://127.0.0.1:7860

# ============================================
# GRADIO UI CONFIGURATION (Optional)
# ============================================
# BACKEND_URL=http://localhost:8080
```

### Environment Variable Format

- Use double underscores (`__`) for nested settings
- Example: `SUPABASE_DB__HOST` maps to `settings.supabase_db.host`
- All values should be strings (no quotes needed)

---

## 5. Initial Setup Commands

### Step 1: Create Supabase Database Schema

```bash
make supabase-create
```

This creates the `substack_articles` table in your Supabase database.

**Verify**: Check your Supabase dashboard → Table Editor → You should see `substack_articles` table.

### Step 2: Create Qdrant Collection

```bash
make qdrant-create-collection
```

This creates the vector collection in Qdrant with:
- Dense vectors (768-dim)
- Sparse vectors (BM25)
- Quantization enabled

**Verify**: Check your Qdrant dashboard → Collections → You should see `substack_collection`.

### Step 3: Create Qdrant Indexes

```bash
make qdrant-create-index
```

This creates indexes for:
- HNSW (for fast vector search)
- `feed_author` (keyword index)
- `feed_name` (keyword index)
- `title` (text index with stemmer)

**Note**: Run this after bulk ingestion for better performance.

### Step 4: Ingest RSS Articles (First Time)

```bash
make ingest-rss-articles-flow
```

This will:
- Fetch articles from 30+ Substack newsletters
- Parse and convert to Markdown
- Store in Supabase database

**Time**: ~5-10 minutes depending on number of articles

**Verify**: Check Supabase → Table Editor → `substack_articles` → Should see articles.

### Step 5: Generate Embeddings and Ingest to Qdrant

```bash
# Ingest all articles
make ingest-embeddings-flow

# OR ingest articles from a specific date
make ingest-embeddings-flow FROM_DATE=2024-01-01
```

This will:
- Read articles from Supabase
- Split into chunks (4000 chars)
- Generate dense + sparse embeddings
- Store in Qdrant

**Time**: ~10-30 minutes depending on number of articles

**Verify**: Check Qdrant dashboard → Collections → `substack_collection` → Should see points.

### Step 6: Enable HNSW Index (After Bulk Upload)

```bash
make qdrant-create-index
```

**Important**: Run this after bulk ingestion to enable fast search.

---

## 6. Running the Application

### Option A: FastAPI Backend Only

```bash
make run-api
```

**Access**: 
- API: http://localhost:8080
- Docs: http://localhost:8080/docs
- Health: http://localhost:8080/health

### Option B: Gradio UI (Recommended for Testing)

```bash
make run-gradio
```

**Access**: http://localhost:7860

The Gradio UI provides:
- Article search interface
- AI Q&A interface
- Model selection
- Streaming/non-streaming modes

### Option C: Both (Separate Terminals)

**Terminal 1:**
```bash
make run-api
```

**Terminal 2:**
```bash
make run-gradio
```

---

## 7. Verification

### Test 1: Health Check

```bash
curl http://localhost:8080/health
```

**Expected**: `{"status": "healthy"}`

### Test 2: Search Articles (No LLM)

```bash
curl -X POST "http://localhost:8080/search/unique-titles" \
  -H "Content-Type: application/json" \
  -d '{
    "query_text": "RAG systems",
    "limit": 5
  }' | jq
```

**Expected**: List of article titles

### Test 3: Ask Question (LLM Required)

```bash
curl -X POST "http://localhost:8080/search/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "query_text": "What are the latest trends in RAG?",
    "provider": "openrouter",
    "limit": 5
  }' | jq
```

**Expected**: Generated answer with sources

### Test 4: Streaming Question

```bash
curl -X POST "http://localhost:8080/search/ask/stream" \
  -H "Content-Type: application/json" \
  -d '{
    "query_text": "What is vector search?",
    "provider": "openrouter",
    "limit": 5
  }'
```

**Expected**: Streaming text chunks

---

## 8. Troubleshooting

### Issue: "Database connection failed"

**Solution**:
1. Check Supabase credentials in `.env`
2. Verify Supabase project is active
3. Check if using Transaction Pool connection (port 6543)
4. Test connection: `make supabase-create`

### Issue: "Can't find Supabase connection string"

**Solution - Step by Step:**

1. **Make sure you're in the right place:**
   - Go to your Supabase project dashboard (not the organization dashboard)
   - You should see your project name at the top

2. **Try these locations:**
   
   **Location A: Settings → Database**
   - Click ⚙️ **Settings** (left sidebar)
   - Click **"Database"**
   - Scroll down - look for:
     - "Connection string" section
     - "Connection pooling" section
     - "Connection info" section
     - Tabs: "URI", "Transaction", "Session"
   
   **Location B: Project Settings**
   - Click ⚙️ **Settings** → **"Project Settings"** or **"General"**
   - Look for "Database" or "Connection" section
   
   **Location C: SQL Editor**
   - Sometimes connection info is shown in the SQL Editor
   - Click **"SQL Editor"** in left sidebar
   - Look for connection details in the interface

3. **If you still can't find it, use individual fields:**
   
   Look for these separate fields in Database settings:
   - **Host**: Usually something like `aws-0-[region].pooler.supabase.com`
   - **Port**: `6543` (for Transaction Pool) or `5432` (for Direct)
   - **Database**: Usually `postgres`
   - **User**: Usually `postgres.[project-ref]`
   - **Password**: In "Database password" section (may need to reset)

4. **Get Password separately:**
   - Go to **Settings** → **"Database"**
   - Find **"Database password"** section
   - If you don't see it, click **"Reset database password"**
   - Copy the password immediately (you won't see it again!)

5. **Still stuck?**
   - Check Supabase documentation: https://supabase.com/docs/guides/database/connecting-to-postgres
   - Or use the "Direct connection" method (port 5432) instead of Transaction Pool
   - Make sure your project has finished provisioning (can take a few minutes)

### Issue: "Qdrant connection failed"

**Solution**:
1. Check Qdrant URL and API key in `.env`
2. Verify Qdrant cluster is running
3. Check API key permissions
4. Test connection: `make qdrant-create-collection`

### Issue: "No articles found"

**Solution**:
1. Run RSS ingestion: `make ingest-rss-articles-flow`
2. Check Supabase table: Should see articles
3. Verify feeds in `src/configs/feeds_rss.yaml`

### Issue: "No search results"

**Solution**:
1. Run embeddings ingestion: `make ingest-embeddings-flow`
2. Check Qdrant collection: Should see points
3. Run index creation: `make qdrant-create-index`

### Issue: "LLM API error"

**Solution**:
1. Check API key in `.env`
2. Verify API key is valid
3. Check API quota/limits
4. Try different provider (OpenRouter, OpenAI, Hugging Face)

### Issue: "Prefect flow not running"

**Solution**:
1. Check Prefect credentials in `.env`
2. Verify Prefect server is running (local) or accessible (cloud)
3. Check worker is running: `prefect worker start --pool default-work-pool`
4. View logs in Prefect UI

### Issue: "Import errors"

**Solution**:
```bash
# Reinstall dependencies
uv sync --all-groups

# Activate virtual environment
source .venv/bin/activate
```

### Issue: "Port already in use"

**Solution**:
```bash
# Change port in .env or code
# FastAPI default: 8080
# Gradio default: 7860
```

---

## 9. Next Steps

### Schedule Automated Ingestion

**Prefect Cloud:**
```bash
make deploy-cloud-flows
```

**Prefect Local:**
```bash
make deploy-local-flows
```

Then schedule flows in Prefect UI:
- RSS ingestion: Daily at 2 AM
- Embeddings: Daily at 3 AM

### Customize Configuration

1. **Add More Newsletters**: Edit `src/configs/feeds_rss.yaml`
2. **Change Embedding Model**: Edit `QDRANT__DENSE_MODEL_NAME` in `.env`
3. **Adjust Chunk Size**: Edit `TEXT_SPLITTER__CHUNK_SIZE` in `.env`
4. **Modify LLM Models**: Edit `src/api/models/provider_models.py`

### Deploy to Production

1. **Google Cloud Run**: See `deploy_fastapi.sh`
2. **Docker**: Use provided `Dockerfile`
3. **Environment**: Set production values in `.env`

---

## 10. Quick Reference

### Essential Commands

```bash
# Setup
make supabase-create              # Create database
make qdrant-create-collection     # Create vector collection
make qdrant-create-index          # Create indexes

# Data Ingestion
make ingest-rss-articles-flow     # Fetch articles
make ingest-embeddings-flow       # Generate embeddings

# Run Services
make run-api                      # Start FastAPI
make run-gradio                   # Start Gradio UI

# Testing
make all-tests                    # Run all tests
curl http://localhost:8080/health # Health check
```

### Configuration Files

- `.env` - Environment variables (create this)
- `src/configs/feeds_rss.yaml` - Newsletter feeds
- `src/config.py` - Application settings
- `src/api/models/provider_models.py` - LLM model config

### Important URLs

- FastAPI Docs: http://localhost:8080/docs
- Gradio UI: http://localhost:7860
- Prefect UI (Local): http://127.0.0.1:4200
- Prefect Cloud: https://app.prefect.cloud

---

## ✅ Setup Checklist

- [ ] Python 3.12+ installed
- [ ] uv installed
- [ ] Repository cloned
- [ ] Dependencies installed (`uv sync --all-groups`)
- [ ] Supabase account created and credentials obtained
- [ ] Qdrant account created and credentials obtained
- [ ] OpenRouter account created and API key obtained
- [ ] Prefect account created (cloud or local server)
- [ ] `.env` file created and configured
- [ ] Supabase database created (`make supabase-create`)
- [ ] Qdrant collection created (`make qdrant-create-collection`)
- [ ] RSS articles ingested (`make ingest-rss-articles-flow`)
- [ ] Embeddings generated (`make ingest-embeddings-flow`)
- [ ] Indexes created (`make qdrant-create-index`)
- [ ] FastAPI running (`make run-api`)
- [ ] Gradio UI running (`make run-gradio`)
- [ ] Health check passing
- [ ] Test query working

---

## 🎉 You're All Set!

Your Substack Articles Search Engine is now running! 

- **Search articles**: Use the Gradio UI or API
- **Ask questions**: Get AI-powered answers from your newsletter collection
- **Customize**: Modify feeds, models, and configurations as needed

For more details, see:
- [README.md](README.md) - Project overview
- [INSTRUCTIONS.md](INSTRUCTIONS.md) - Detailed documentation
- [Makefile](Makefile) - All available commands

Happy searching! 🚀


