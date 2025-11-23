# Project Commands & Setup Guide

This guide details all the necessary commands to set up, run, and maintain the RAGLLM Newsletter System.

## Prerequisites

- **Python**: 3.12 or higher
- **Node.js**: 18 or higher (for frontend)
- **Docker**: Optional, for containerized deployment

## 1. Backend Setup (FastAPI)

The backend is located in the root directory.

### Environment Setup

It is highly recommended to use a virtual environment.

```bash
# Create a virtual environment named .venv
python3 -m venv .venv

# Activate the virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate
```

### Install Dependencies

With the virtual environment activated:

```bash
pip install -r requirements.txt
```

### Running the Server

Start the FastAPI development server:

```bash
# Run with auto-reload enabled (best for development)
uvicorn src.api.main:app --reload --port 8080
```

The API will be available at `http://localhost:8080`.
API Documentation (Swagger UI): `http://localhost:8080/docs`

### Linting & Testing

```bash
# Run linting (using Ruff)
ruff check .

# Run tests (using Pytest)
pytest
```

## 2. Frontend Setup (Next.js)

The frontend is located in the `frontend-next` directory.

### Installation

```bash
# Navigate to the frontend directory
cd frontend-next

# Install dependencies
npm install
```

### Running the Frontend

```bash
# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Linting

```bash
npm run lint
```

## 3. Docker Deployment

You can run the entire backend using Docker.

### Build the Image

```bash
# Build the Docker image (run from the project root)
docker build -t ragllm-backend .
```

### Run the Container

```bash
# Run the container, mapping port 8080
docker run -p 8080:8080 ragllm-backend
```

## 4. Troubleshooting

### Port Already in Use

If you see `[Errno 48] Address already in use`, it means another process is using port 8080.

**Find and kill the process:**

```bash
# Find the process ID (PID)
lsof -ti:8080

# Kill the process
lsof -ti:8080 | xargs kill -9
```
lsof -t -i:8080 | xargs kill -9
### Module Not Found Errors

If you see `ModuleNotFoundError`, ensure your virtual environment is activated and dependencies are installed:

```bash
source .venv/bin/activate
pip install -r requirements.txt
```
