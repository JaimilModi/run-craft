# 🚀 Run-Craft — Online Code Editor


Run-Craft is a modern **browser-based online code editor and execution
platform** built for developers who want to write, run, and share code
instantly.

It provides a clean UI, real-time execution, authentication, and a
smooth developer experience — all inside the browser.

<p align="center">
  <img src="https://raw.githubusercontent.com/JaimilModi/github-profile-assets/main/run-craft.png" alt="Run-Craft Preview" width="85%">
</p>

<p align="center">
  <a href="https://run-craft.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel">
  </a>
</p>

------------------------------------------------------------------------

## ✨ What is Run‑Craft?

Run‑Craft is not just a frontend project — it is a **fully interactive
online coding environment** that allows users to:

-   Write code in multiple programming languages
-   Execute code securely via remote runtime APIs
-   Save and manage code snippets
-   View syntax-highlighted output
-   Experience a smooth, animated developer interface

It is designed to feel like a lightweight cloud IDE.

------------------------------------------------------------------------

## ⚡ Core Features

### 🧠 Monaco Editor Integration

-   VS Code–like editing experience
-   Intelligent syntax highlighting
-   Multiple language support
-   Clean and distraction-free interface

### ▶️ Real-Time Code Execution

-   Secure execution using external runtime APIs
-   Supports dynamic input/output
-   Fast response handling

### 🔐 Authentication System

-   User authentication powered by Clerk
-   Personalized snippet management
-   Secure access control

### 💾 Snippet Management

-   Save code snippets
-   Delete snippets
-   View individual snippet pages
-   Timestamp tracking

### 🎨 Modern Developer UI

-   Dark themed interface
-   Smooth animations using Framer Motion
-   Responsive layout
-   Minimal, focused design

------------------------------------------------------------------------

## 🏗 Tech Architecture

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)

**Backend / Services**
- Convex (Database & Backend Logic)
- Clerk (Authentication & User Management)
- Runtime Execution API (Code Compilation & Execution)
- LemonSqueezy (Payments & Subscription Management)
------------------------------------------------------------------------

## 📂 Project Structure Overview

## 📂 Project Structure

```bash
run-craft/
├── convex/                         # Backend (Convex server logic)
│   ├── _generated/                 # Auto-generated Convex bindings
│   ├── auth.config.ts              # Clerk + Convex auth config
│   ├── codeExecutions.ts           # Code execution logic
│   ├── http.ts                     # HTTP endpoints
│   ├── lemonSqueezy.ts             # Payment & subscription handling
│   ├── schema.ts                   # Database schema definitions
│   ├── snippets.ts                 # Snippet CRUD operations
│   ├── users.ts                    # User management
│   └── tsconfig.json
│
├── public/                         # Static assets & language icons
│   ├── logo.png
│   ├── bash.png
│   ├── cpp.png
│   ├── csharp.png
│   ├── go.png
│   ├── java.png
│   ├── javascript.png
│   ├── js.png
│   ├── python.png
│   ├── ruby.png
│   ├── rust.png
│   ├── swift.png
│   ├── ts.png
│   ├── typescript.png
│   └── vercel.svg
│
├── src/                            # Frontend (Next.js App Router)
│   ├── app/                        # Pages & routes
│   ├── components/                 # Reusable UI components
│   ├── hooks/                      # Custom React hooks
│   ├── store/                      # Zustand state management
│   ├── types/                      # TypeScript type definitions
│   └── middleware.ts               # Route middleware
│
├── .eslintrc.json                  # ESLint configuration
├── .gitattributes
├── .gitignore
├── README.md
├── next.config.ts                  # Next.js configuration
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

------------------------------------------------------------------------

## 🚀 Getting Started

Clone the repository:

    git clone https://github.com/JaimilModi/run-craft.git
    cd run-craft

Install dependencies:

    npm install

Start development server:

    npm run dev

Visit:

    http://localhost:3000

------------------------------------------------------------------------

## 🔑 Environment Variables

To run this project properly, you must configure:

-   Clerk Authentication Keys
-   Convex Deployment URL
-   Runtime Execution API endpoint

Create a `.env.local` file and add your keys accordingly.

------------------------------------------------------------------------

## 🌍 Vision

Run‑Craft aims to evolve into:

-   A collaborative coding platform
-   A snippet sharing community
-   A fast cloud-based coding playground
-   A developer-first productivity tool

------------------------------------------------------------------------

## 🧩 Why Run‑Craft?

Unlike basic code playgrounds, Run‑Craft focuses on:

-   Clean architecture
-   Modern tooling
-   Scalable backend integration
-   Real project structure (not just a demo editor)

It is built as a serious developer product — not a toy project.

------------------------------------------------------------------------

## 👨‍💻 Author

Built and maintained by **Jaimil Modi**.

------------------------------------------------------------------------

⭐ If you find this project useful, consider starring the repository!
