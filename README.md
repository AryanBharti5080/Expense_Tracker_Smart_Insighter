# 💰 Expense Tracker with Smart Insighter

## 📌 Overview

A full-stack expense tracking application designed to help users manage daily expenses and gain meaningful insights into their spending behavior.

### 🎯 Key Goals

* Track expenses efficiently
* Organize financial data clearly
* Enable future AI-driven insights

---

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Frontend

* React (JavaScript)
* CSS

---

## 📁 Project Structure

```
Expense_Tracker_Smart_Insighter/
│
├── Backend/
│   └── app/
│       ├── main.py
│       ├── database.py
│       │
│       ├── models/
│       │   ├── user.py
│       │   └── expense.py
│       │
│       ├── schemas/
│       │   ├── user_schema.py
│       │   └── expense_schema.py
│       │
│       ├── routes/
│       │   ├── auth.py
│       │   └── expense.py
│       │
│       ├── services/
│       │   └── ai_service.py
│       │
│       ├── utils/
│       │   └── auth_utils.py
│       │
│       └── __init__.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── DashboardNavbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── Login.css
│   │
│   ├── package.json
│   └── README.md
```

---

## 🏗️ Architecture

* **Architecture Type:** Modular Monolith
* **Design Pattern:** Layered Architecture

### Flow

Frontend (React UI)
↓
API Calls (HTTP/JSON)
↓
FastAPI Backend
↓
Service Layer (Business Logic + AI)
↓
Database (SQLAlchemy ORM)
↓
Response → Frontend Rendering

---

## ⚙️ Features & Modules

### 🔐 Authentication

* User Registration
* User Login
* Password Hashing

### 💸 Expense Management

* Add expenses
* View expenses
* Update expenses
* Delete expenses

### 📊 Dashboard

* Centralized user interface
* Displays expense data
* Prepares ground for analytics

### 🤖 Smart Insighter (In Progress)

* Expense categorization
* Spending pattern analysis
* Predictive insights (planned)

---

## 🖥️ Frontend

### Pages

* **Login.jsx** → User authentication
* **Register.jsx** → User registration
* **Dashboard.jsx** → Main user interface

### Components

* **Navbar.jsx** → General navigation
* **DashboardNavbar.jsx** → Dashboard navigation (logout, profile, etc.)

### Services

* Handles API communication
* Centralizes HTTP request logic

---

## 🔧 Backend

### Authentication (`routes/auth.py`)

* Register user
* Login user
* Password hashing via `auth_utils.py`

### Expense Module (`routes/expense.py`)

* Create, Read, Update, Delete expenses

### Models

* `User`
* `Expense`

### Schemas

* Input validation
* Response formatting

### AI Service (`services/ai_service.py`)

* Placeholder for:

  * Expense categorization
  * Insights generation
  * Predictions

---

## 🔄 Application Flow

### 🔑 Login Flow

1. User enters credentials (Login.jsx)
2. API call to `/login`
3. Backend validates user
4. Token/response returned
5. Stored in frontend (localStorage/session)
6. Redirect to Dashboard

### 💰 Expense Flow

1. User adds/views expense (Dashboard.jsx)
2. API request sent
3. Backend processes request
4. Data stored/retrieved from database
5. Response returned to UI

### 📊 Dashboard Rendering

1. Fetch user expenses
2. Display data
3. Future: show AI insights

---

## 🌐 API Endpoints

### Authentication

* `POST /register`
* `POST /login`

### Expenses

* `POST /expense`
* `GET /expenses`
* `PUT /expense/{id}`
* `DELETE /expense/{id}`

---

## 🧪 Testing

### Frontend

* Jest
* React Testing Library

### Backend

* No tests implemented yet

---

## 📦 Dependencies

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Frontend

* React
* npm packages

---

## 🔍 Code Quality

### Strengths

* Clear separation of frontend and backend
* Modular backend structure
* Component-based frontend

### Areas to Improve

* Centralized API service needs confirmation
* AI module is incomplete
* Limited error handling

---

## 🔐 Security

### Current

* Password hashing implemented

### Missing / Improvements

* JWT-based authentication middleware
* Proper CORS configuration
* Frontend validation

---

## ⚡ Performance

### Current Limitations

* No caching
* Synchronous DB operations

### Improvements

* Use async database queries
* Add pagination for large datasets
* Optimize frontend rendering

---

## 🚀 Development Workflow

### Current

* Manual development

### Recommended

* GitHub Actions (CI/CD)
* Linting and automated testing

---

## 📈 Future Enhancements

### Backend

* Complete JWT authentication
* Advanced AI features:

  * NLP-based categorization
  * Monthly predictions

### Frontend

* State management (Context API / Redux)
* Interactive charts and analytics

### System

* Logging system
* Error handling middleware
* Role-based access control

---

## 📄 License

This project is for educational and development purposes.


### 🔗 Project Overview & Demonstration

The link below provides a comprehensive view of the project, including its end-to-end workflow, core features, and API architecture.
It demonstrates how the system operates in real time, from user interaction to backend processing.

What you can explore:

🎥 Demo Workflow – Step-by-step execution of the application
⚙️ Key Features – Functional highlights and capabilities
🔌 API Flow – How frontend and backend communicate

👉 
