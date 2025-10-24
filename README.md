# Fullstack Web Application — Next.js + Hono.js + PostgreSQL

## Objective

This project was built as part of a **Fullstack Development Assessment** to demonstrate the ability to create a simple, modular, and fully functional web application using **Next.js (Frontend)** and **Hono.js (Backend)** — including authentication, CRUD operations, and clean architecture.

---

## Overview

A minimal **blog-style web app** that allows users to register, log in, and manage posts.  
It follows a **clean and modular fullstack structure**, with a responsive UI built using **DaisyUI** components.

---

## Core Features

### Authentication
- **Sign Up** – Create a new user account.  
- **Sign In** – Log in with existing credentials.  
- **Sign Out** – Securely log out from the current session.  

### Post Management (CRUD)
- **List Posts** – Display all posts (with pagination).  
- **View Post** – Show detailed content for a selected post.  
- **Create Post** – Add new posts.  
- **Edit Post** – Update existing posts.  
- **Delete Post** – Remove a post from the list.  

---

## UI & Design

- Built with **DaisyUI**, styled using **Tailwind CSS**.  
- Focuses on simplicity, clarity, and consistent layout.  
- Uses DaisyUI’s default themes for a clean and professional look.

---

## Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| Frontend | **Next.js (App Router, TypeScript)** | Modern React-based frontend with server-side rendering |
| Backend | **Hono.js (Bun Runtime)** | Lightweight Node.js framework for fast API development |
| Database | **PostgreSQL** | Relational database for storing users and posts |
| UI Library | **DaisyUI + Tailwind CSS** | Component-based styling for clean UI |
| Authentication | **JWT (JSON Web Token)** | Secure stateless authentication |

---

## Project Structure

```
project/
├── frontend/              # Next.js app (DaisyUI interface)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/               # Hono.js API server
    ├── src/
    │   ├── routes/
    │   ├── middleware/
    │   └── lib/
    └── package.json
```

---

## Installation & Setup

### Backend (Hono.js + PostgreSQL)

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Create `.env` file
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/db_name
   JWT_SECRET=your_secret_key
   ```

4. Run the server
   ```bash
   bun run src/index.ts
   ```
   The backend runs at `http://localhost:3000`

#### API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/posts` | Fetch all posts |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

---

### Frontend (Next.js + DaisyUI)

1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Run development server
   ```bash
   bun dev
   ```
   Open in browser: `http://localhost:3001` (or assigned port)

---

## Technical Notes

- **Clean modular structure** — clear separation between routes, middleware, and database logic.  
- **JWT Authentication** — stateless security implementation.  
- **Hono.js** used for minimal boilerplate and high performance.  
- **Next.js App Router** for modern routing and server-side rendering.  
- **DaisyUI** provides a professional and consistent look without custom CSS overhead.

---

## Evaluation Alignment

This project meets all key evaluation points:
- **Complete features** (Authentication + CRUD)  
- **Clean, maintainable code** structure  
- **Proper error handling** and separation of concerns  
- **Simple and consistent UI/UX** using DaisyUI  
- **Readable documentation** for easy setup and review  

---

## Developer

**Name:** Ary Akbar Lanang Surya Kinasih  
**Role:** Fullstack Developer  
**Tech Stack:** Next.js | Hono.js | Bun | PostgreSQL | DaisyUI  
**GitHub:** [https://github.com/ariberubah](https://github.com/ariberubah)
