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


#### Expenses

POST /expense
GET /expenses
PUT /expense/{id}
DELETE /expense/{id}


---

### Data Models

#### User
```python
id: int
name: str
email: str
password: str
##Expense
id: int
amount: float
category: str
description: str
date: datetime
user_id: int
