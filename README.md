# 🧭 DevCompass — AI-Powered Developer Career Navigator

DevCompass helps developers understand their skill profile, generate personalized learning roadmaps, analyze resumes, discover courses, and track growth analytics — all powered by an AI/ML engine built on Python and scikit-learn.

---

## ✨ Features

- JWT authentication with profile management and developer skill tags
- AI learning roadmap generator with weekly milestones and technology recommendations
- DSA and coding profile analytics with topic heatmap and practice recommendations
- Resume analyzer for PDF/text input with extracted skills and gap detection
- Course management with modules, lessons, quizzes, coding exercises, and progress tracking
- Smart project recommendations ranked against user skill profile
- Analytics dashboard for roadmap completion, course progress, and coding activity
- Seed command with demo users, sample courses, and featured projects

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Django, Django REST Framework, JWT Auth |
| AI / ML | Python, Pandas, Scikit-learn, NLP resume parsing |
| Background Jobs | Redis, Celery |
| Database | MySQL |
| Deployment | Docker, Docker Compose |

---

## 📂 Project Structure

```text
devcompass/
├── backend/
├── ml-engine/
│   ├── recommendation_models/
│   │   ├── roadmap_engine.py      # Role-aligned milestone plans
│   │   └── project_matcher.py     # Ranks projects against user goals
│   ├── resume_nlp/
│   │   └── parser.py              # Skill extraction and gap detection
│   └── skill_analysis/
│       └── profile_analyzer.py    # Topic heatmaps and coding recommendations
├── docker/
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Obtain JWT token pair |
| POST | `/api/login/refresh` | Refresh access token |
| GET/PUT | `/api/profile` | View or update profile |
| GET | `/api/courses` | List all courses |
| GET | `/api/course/{id}` | Course detail |
| POST | `/api/generate-roadmap` | Generate AI learning roadmap |
| GET | `/api/user-roadmap` | Fetch saved roadmap |
| POST | `/api/analyze-resume` | Analyze PDF or text resume |
| GET | `/api/projects` | Recommended projects |
| GET | `/api/dashboard` | Analytics overview |

---

## ⚙️ Setup

### Quick Start (Docker)

```bash
cp .env.example .env
docker compose up --build
```

| Service | URL |
|---------|-----|
| Backend API | http://localhost:8000/api |
| Django Admin | http://localhost:8000/admin |

**Seeded credentials:**
- Admin: `admin@devcompass.dev` / `AdminPass123!`
- Demo: `demo@devcompass.dev` / `DemoPass123!`

---

### Local Development

**Backend:**

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

Runs at `http://127.0.0.1:8000`

**Celery Worker:**

```bash
cd backend
celery -A devcompass worker --loglevel=info
```

---

## 🔮 Future Improvements

- [ ] LeetCode, Codeforces, and GitHub ingestion adapters
- [ ] Downloadable certificates and completion badges
- [ ] Test suites for roadmap generation, resume parsing, and auth flows
- [ ] Replace heuristic ML logic with tracked models and evaluation datasets
