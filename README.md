# 🧭 DevCompass – AI Powered Developer Career Navigator

DevCompass is an **AI-powered platform that helps developers navigate their journey to becoming skilled software engineers**.  
It analyzes a user's **skills, coding activity, projects, and career goals** to generate **personalized learning roadmaps, structured courses, project recommendations, and interview preparation strategies**.

DevCompass acts as a **digital career mentor for developers**, guiding them step-by-step toward mastering technologies and preparing for real-world technical interviews.

---

# 🚀 Features

## 🧠 Personalized Learning Roadmaps
Generate **custom learning paths** based on:
- Current skills
- Career goals (Backend, AI, Full Stack, etc.)
- Experience level

Roadmaps include **weekly milestones, technologies to learn, and practice tasks**.

---

## 📊 DSA Skill Analysis
Analyze coding performance and identify **weak areas in Data Structures and Algorithms**.

Features:
- Topic-wise skill breakdown
- Recommended practice problems
- Personalized improvement suggestions

---

## 📚 Course Management System
DevCompass includes a **built-in course platform** where users can learn through structured modules.

### Course Structure

Course
└ Module
└ Lesson
└ Quiz
└ Coding Exercise


### Capabilities

- 📖 Structured technical courses
- 🎥 Video lessons and tutorials
- 📝 Coding assignments
- ❓ Quizzes for evaluation
- 📊 Progress tracking
- 🏆 Course completion certificates

Courses may include:

- Data Structures & Algorithms  
- Backend Development  
- Frontend Development  
- System Design  
- Machine Learning  

---

## 🤖 AI-Powered Recommendations
The platform suggests:

- Learning resources
- Courses
- Projects
- Technologies to learn next

Recommendations are based on **user skill gaps and career goals**.

---

## 📄 Resume & Portfolio Analyzer
Upload a **resume or connect GitHub profile** to receive:

- Extracted skills
- Missing technology suggestions
- Portfolio improvement tips
- Resume optimization feedback

---

## 💡 Smart Project Suggestions
DevCompass recommends projects depending on a user's experience level.

### Example Suggestions

**Beginner**
- To-Do List App
- REST API with authentication

**Intermediate**
- Real-time chat application
- Blog platform with CMS

**Advanced**
- Distributed system
- Real-time collaboration platform

---

## 📈 Learning Analytics Dashboard
Track learning progress using visual analytics.

Dashboard includes:

- Skill improvement graphs
- Course completion progress
- Roadmap milestones
- Coding activity statistics

---

# 🏗 System Architecture

Frontend (React.js)
|
|
REST API Layer
|
|
Backend Services (Django)
├── User Service
├── Roadmap Generator
├── Course Management Service
├── Recommendation Engine
├── Resume Analyzer
├── Analytics Service
|
|
Database (PostgreSQL)
|
|
ML Engine (Python)



---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Recharts (analytics visualization)

---

## Backend
- Django
- Django REST Framework
- JWT Authentication
- Celery (background tasks)

---

## Database
- PostgreSQL
- Redis (caching & task queues)

---

## AI / Machine Learning
- Python
- Scikit-learn
- PyTorch
- NLP models for resume analysis

---

## Data Analysis
- Pandas
- NumPy
- Matplotlib

---

# 📂 Project Structure

devcompass
│
├── backend
│ ├── devcompass
│ ├── users
│ ├── roadmap
│ ├── courses
│ ├── recommendations
│ ├── analytics
│ ├── resume_analyzer
│ └── requirements.txt
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ ├── hooks
│ │ └── utils
│
├── ml-engine
│ ├── skill_analysis
│ ├── resume_nlp
│ └── recommendation_models
│
├── docker
│
└── README.md


---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/devcompass.git
cd devcompass


2️⃣ Backend Setup
cd backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
3️⃣ Frontend Setup
cd frontend

npm install
npm run dev
4️⃣ Start Redis (optional)
redis-server
🔑 API Endpoints
Authentication
POST /api/register
POST /api/login
User
GET /api/profile
PUT /api/profile
Courses
GET /api/courses
GET /api/course/{id}
Roadmaps
POST /api/generate-roadmap
GET /api/user-roadmap
Resume Analyzer
POST /api/analyze-resume
Recommendations
GET /api/projects
Analytics
GET /api/dashboard
🎯 Target Users
Computer Science Students
Self-taught Developers
Developers preparing for technical interviews
Engineers seeking structured learning paths
📌 Future Improvements
🔗 GitHub profile skill analysis
🤖 AI interview simulator
📊 Skill graph visualization
🧑‍💻 Real-time coding activity tracking
🌍 Community learning & collaboration
🎓 Marketplace for expert-created courses
🤝 Contributing
Contributions are welcome.
Steps to contribute:
Fork the repository
Create a feature branch
Commit your changes
Submit a Pull Request

