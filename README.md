# 🧠 Mathtrix — Lightweight Online Testing Platform

**Mathtrix** is a modern web platform for online test-taking, similar to Moodle. It allows users to register, log in, complete structured tests, view results, and manage profiles. The system is built with a clean separation of frontend and backend logic.

---

## 🎨 Frontend (React + Firebase)

A fast, responsive single-page application using React, Tailwind CSS, and Firebase for user authentication, data storage, and test processing.

### ⚙️ Key Features
- Firebase Authentication (email/password)
- Test creation, session flow, and result preview
- Protected routes, user roles, and access control
- Image uploads via TinyCloud
- Form validation with `zod`
- Data fetching & caching via `react-query`
- Context API and custom hooks for state management

### 🗂 Project Structure Highlights
- `api/` — handles requests (auth, tests, user)
- `components/` — UI modules and custom widgets
- `firebase/` — configuration for Firebase services
- `hooks/` — custom business-logic React hooks
- `layouts/` — page-level wrappers and route guards
- `pages/` — views for login, test, dashboard, results
- `router/` — route definitions with protected access
- `lib/` — form validators and shared utilities

### 📦 Tech Stack
- React + TypeScript
- Tailwind CSS + Shadcn UI
- Firebase (Auth, Firestore, Storage)
- Axios, Zod, React Hook Form, React Router DOM
- TinyMCE (via TinyCloud) for rich-text input

---

## 🛠 Backend (Spring Boot + MongoDB)

A secure RESTful backend for managing users and test records using Java, Spring Boot, and MongoDB.

### ⚙️ Key Features
- MongoDB integration via Spring Data
- RESTful endpoints for user and test data
- CORS configuration for frontend communication

### 🗂 Project Structure Highlights
- `UserController` — defines HTTP routes
- `UserService` — handles core logic
- `UserRepository` — database access layer
- `UserEntity` — MongoDB document model
- `WebSecurityConfig` — simple CORS setup

### 📦 Tech Stack
- Java 17
- Spring Boot
- MongoDB Atlas (cloud)
- Maven (dependency management)

---

## 🚀 Quick Start

### Frontend

```bash
pnpm i
pnpm run dev
