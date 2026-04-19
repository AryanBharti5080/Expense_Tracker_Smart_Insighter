# 💰 Expense Tracker with Smart Insighter

## 1. Overview
A full-stack expense tracking application that helps users manage daily expenses and gain insights into spending behavior.

**Key Goals:**
- Track expenses efficiently  
- Provide structured financial data  
- Enable future AI-based insights  

---

## 2. Tech Stack

### Backend
- Python, FastAPI  
- SQLAlchemy, Pydantic  
- Uvicorn  

### Frontend
- React (JS)  
- CSS  

---

## 3. Project Structure
Expense_Tracker_Smart_Insighter/
│
├── Backend/
│ └── app/
│ ├── main.py
│ ├── database.py
│ │
│ ├── models/
│ │ ├── user.py
│ │ └── expense.py
│ │
│ ├── schemas/
│ │ ├── user_schema.py
│ │ └── expense_schema.py
│ │
│ ├── routes/
│ │ ├── auth.py
│ │ └── expense.py
│ │
│ ├── services/
│ │ └── ai_service.py
│ │
│ ├── utils/
│ │ └── auth_utils.py
│ │
│ └── init.py
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ └── DashboardNavbar.jsx
│ │ │
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Dashboard.jsx
│ │ │
│ │ ├── services/ # API communication layer
│ │ │
│ │ ├── App.js # Main React component
│ │ ├── index.js # Entry point
│ │ ├── index.css
│ │ └── Login.css
│ │
│ ├── package.json
│ └── README.mdgin, Register, Dashboard
├── services/ # API calls
├── App.js
└── index.js

---

## 4. Architecture

- Modular Monolith  
- Layered design : Frontend → API → Routes → Services → Database.
- Frontend (React UI)
↓
API Calls (HTTP/JSON)
↓
FastAPI Backend
↓
Service Layer (Business + AI Logic)
↓
Database (SQLAlchemy ORM)
↓
Response → Frontend UI Rendering

---


---

## 5. Features & Modules

### Core Features
- 🔐 Features
👤 Authentication
User Registration
User Login
Password hashing
💸 Expense Management
Add expenses
View expenses
Update/Delete expenses
📊 Dashboard
Centralized UI for managing data
Displays expense information
🤖 Smart Insighter (In Progress)
Expense categorization
Spending pattern analysis
Predictive insights (future scope)

### Frontend Modules

#### 1. Pages
- **Login.jsx**
  - User authentication UI
- **Register.jsx**
  - User registration form
- **Dashboard.jsx**
  - Main user interface after login

---

#### 2. Components

- **Navbar.jsx**
  - General navigation
- **DashboardNavbar.jsx**
  - Dashboard-specific navigation (likely includes logout, profile)

---

#### 3. Services Layer
- Handles API calls to backend
- Centralized HTTP request logic

---

### Backend Modules

#### 1. Auth (`routes/auth.py`)
- Registration
- Login
- Password handling via `auth_utils.py`

#### 2. Expense (`routes/expense.py`)
- Create, read, update, delete expenses

#### 3. Models
- `User`
- `Expense`

#### 4. Schemas
- Input validation
- Response formatting

#### 5. AI Service (`services/ai_service.py`)
- Placeholder for:
  - Expense categorization
  - Spending insights
  - Predictions

---

## 6. Code Flow

### Login Flow
Frontend (Login.jsx)
→ API call (/login)
→ Backend validates credentials
→ Token/response returned
→ Stored in frontend (localStorage/session)
→ Redirect to Dashboard

#### Expense Flow

Dashboard.jsx
→ Add/View Expense
→ API call to backend
→ Backend processes request
→ Data stored/retrieved from DB
→ Response sent to UI
### Dashboard Rendering

Dashboard.jsx
→ Fetch user expenses
→ Display list / analytics
→ (Future) AI insights shown

---

## 7. API & Data Layer

### API Type
- REST

### Key Endpoints

#### Authentication
POST /register
POST /login


### Expenses

POST /expense
GET /expenses
PUT /expense/{id}
DELETE /expense/{id}


 ##8. Testing
  Frontend
  App.test.js
  Jest + React Testing Library
  Backend
  No tests detected
  
  9.
  Dependencies
  Backend
  FastAPI → API framework
  SQLAlchemy → ORM
  Pydantic → validation
  Frontend
  React → UI framework
  npm packages → dependency management

  10. Code Quality
  Strengths
  Clean separation (backend vs frontend)
  Modular backend structure
  Component-based frontend
  Issues
  Missing centralized API service (needs confirmation)
  Limited AI implementation
  No clear error handling strategy

  11. Security
  Current
  Password hashing
  Missing / Risks
  Token-based auth enforcement (JWT middleware)
  CORS configuration
  Input validation on frontend

  12. Performance
  Bottlenecks
  No caching
  Synchronous DB calls
  Improvements
  Use async DB operations
  Add pagination for expenses
  Optimize frontend rendering
  
  13. Development Workflow
  Current
  Manual development (no CI/CD detected)
  Recommended
  GitHub Actions
  Linting + testing pipelines
  
  14. Recommendations
  
  Backend
  Implement JWT authentication fully
  Expand AI service:
  NLP-based categorization
  Monthly predictions
  
  Frontend
  Add state management (Context API / Redux)
  Improve dashboard UI with charts
  
  System
  Add logging
  Add error handling middleware
  Introduce role-based access (future)

