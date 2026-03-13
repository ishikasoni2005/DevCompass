# DevCompass

DevCompass is an AI-powered developer career navigator that helps users understand their current skill profile, generate personalized learning roadmaps, analyze resumes, discover guided courses, and track analytics across their growth journey.

## Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Recharts
- Backend: Django, Django REST Framework, JWT auth, PostgreSQL
- AI/ML: Python, Pandas, Scikit-learn, PDF/NLP resume analysis
- Background jobs: Redis, Celery
- Deployment: Docker, Docker Compose, Nginx

## Features

- JWT authentication with profile management and developer skill tags
- AI learning roadmap generator with weekly milestones and technology recommendations
- DSA and coding profile analytics using a topic heatmap and practice recommendations
- Resume analyzer for PDF or text resumes with extracted skills and gap detection
- Course management domain with modules, lessons, quizzes, coding exercises, and progress tracking
- Smart project recommendations ranked against the user skill profile
- Analytics dashboard for roadmap completion, course progress, and coding activity
- Seed command with demo users, sample courses, and featured projects

## Project structure

```text
devcompass/
├── backend/
├── frontend/
├── ml-engine/
├── docker/
├── docker-compose.yml
└── README.md
```

## Quick start with Docker

1. Copy the root environment file:

```bash
cp .env.example .env
```

2. Build and start the stack:

```bash
docker compose up --build
```

3. Open the app:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django admin: http://localhost:8000/admin

### Seeded credentials

- Admin: `admin@devcompass.dev` / `AdminPass123!`
- Demo user: `demo@devcompass.dev` / `DemoPass123!`

## Local development

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_devcompass
python manage.py runserver
```

### Celery worker

```bash
cd backend
celery -A devcompass worker --loglevel=info
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Core API endpoints

- `POST /api/register`
- `POST /api/login`
- `POST /api/login/refresh`
- `GET /api/profile`
- `PUT /api/profile`
- `GET /api/courses`
- `GET /api/course/{id}`
- `POST /api/generate-roadmap`
- `GET /api/user-roadmap`
- `POST /api/analyze-resume`
- `GET /api/projects`
- `GET /api/dashboard`

## AI / ML engine overview

- `ml-engine/recommendation_models/roadmap_engine.py` generates role-aligned milestone plans.
- `ml-engine/resume_nlp/parser.py` extracts resume text, matches skills, and surfaces gaps.
- `ml-engine/skill_analysis/profile_analyzer.py` creates topic heatmaps and coding recommendations.
- `ml-engine/recommendation_models/project_matcher.py` ranks project ideas against user goals.

## Production notes

- Docker Compose uses PostgreSQL, Redis, Gunicorn, Celery, and Nginx for a deployable baseline.
- Frontend requests are routed through Nginx at `/api`, which avoids CORS issues in containerized deployments.
- Media uploads from resume analysis are persisted in the `media_data` volume.

## Suggested next improvements

- Add actual LeetCode, Codeforces, and GitHub ingestion adapters
- Persist certificates and downloadable completion badges
- Add test suites for roadmap generation, resume parsing, and frontend auth flows
- Replace heuristic ML logic with tracked models and evaluation data
