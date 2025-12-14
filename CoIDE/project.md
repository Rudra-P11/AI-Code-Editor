VibeCode Editor - Comprehensive Web Development Guide
🚀 Complete Guide to Building VibeCode: A Production-Grade Web IDE
Table of Contents
Project Overview & Requirements
Architecture & Design Decisions
Setting Up the Project from Scratch
Database Design with Prisma
Authentication with NextAuth
Folder Structure & Organization
React & TypeScript Fundamentals
Component-Based Development
API Design & Endpoints
Real-time Code Execution (WebContainers)
AI Integration (Ollama)
Deployment & Production Considerations
Interview Questions & Answers
1. PROJECT OVERVIEW & REQUIREMENTS
What is VibeCode?
VibeCode is a cloud-based IDE (Integrated Development Environment) that runs entirely in the browser. It allows developers to:

Write code in multiple languages and frameworks
See live previews without leaving the browser
Get AI-powered code suggestions
Chat with an AI assistant for help
Save and manage multiple projects
Share their work with others
Real-World Use Cases
Online Coding Interviews - Practice and demonstrate coding skills
Teaching Programming - Teachers create lessons with live code examples
Code Collaboration - Teams review and edit code together
Quick Prototyping - Rapidly test ideas without setup
Learning Platform - Beginners learn web development in browser
Key Requirements
Functional Requirements (What it does)
User authentication (Login/Signup via Google, GitHub)
Create and manage coding projects
Write code with syntax highlighting
Execute code in real browser environment
AI-powered code suggestions
AI chat assistant
File management (create, rename, delete files)
Dark/Light mode toggle
Save progress automatically
Non-Functional Requirements (How well it performs)
Fast load times (< 2 seconds)
Handle 10,000+ concurrent users
99.9% uptime
Secure credential handling
Responsive mobile design
Real-time code execution
Low latency in AI responses
2. ARCHITECTURE & DESIGN DECISIONS
High-Level Architecture
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Components (UI Layer)                         │   │
│  │  - Login Page                                        │   │
│  │  - Dashboard (Project List)                          │   │
│  │  - Playground (Code Editor)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management (Zustand, React Hooks)            │   │
│  │  - User authentication state                        │   │
│  │  - Project data                                     │   │
│  │  - Code content                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  External Services (API Clients)                    │   │
│  │  - REST API calls (fetch/axios)                     │   │
│  │  - WebSocket connections                           │   │
│  │  - WebContainer runtime                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                    HTTP/HTTPS
                          │
┌─────────────────────────────────────────────────────────────┐
│                   SERVER (Next.js)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes (/api/*)                                │   │
│  │  - Authentication endpoints                         │   │
│  │  - Project CRUD operations                          │   │
│  │  - Code execution                                   │   │
│  │  - Chat/AI endpoints                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic & Services                          │   │
│  │  - Authentication service                           │   │
│  │  - Project service                                  │   │
│  │  - File service                                     │   │
│  │  - AI service                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database ORM (Prisma)                              │   │
│  │  - Query builder                                    │   │
│  │  - Schema validation                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                      Database
                      MongoDB Atlas
Why This Architecture?
Separation of Concerns - Each layer has a specific responsibility
Scalability - Easy to add new features without breaking existing code
Maintainability - Clear structure makes debugging easier
Testability - Each component can be tested independently
Security - Sensitive operations happen on the server, not client
3. SETTING UP THE PROJECT FROM SCRATCH
Step 1: Initialize Next.js Project
# Using create-next-app
npx create-next-app@latest vibecode-editor --typescript --tailwind --eslint

# Navigate to project
cd vibecode-editor
Why Next.js?

Server-Side Rendering (SSR) - Better SEO and initial page load
API Routes - Backend without separate server
File-based Routing - Simple, intuitive routing
Built-in Optimization - Image, font, script optimization
Full-Stack Framework - Frontend + Backend in one
Step 2: Install Dependencies
# Core dependencies
npm install react react-dom next typescript

# UI Components
npm install @radix-ui/react-* shadcn-ui tailwindcss

# Authentication
npm install next-auth

# Database & ORM
npm install @prisma/client prisma

# Code Editor
npm install @monaco-editor/react

# Real-time code execution
npm install @webcontainer/api

# Terminal in browser
npm install xterm xterm-addon-fit xterm-addon-search

# AI & Chat
npm install openai axios

# Utilities
npm install zustand sonner date-fns clsx tailwind-merge

# Icons
npm install lucide-react
What each does:

@radix-ui - Accessible UI component primitives
shadcn-ui - Pre-built components using Radix
next-auth - Authentication without building from scratch
@prisma/client - Type-safe database client
@monaco-editor/react - VS Code editor in browser
@webcontainer/api - Run Node.js in browser
xterm - Terminal emulator
zustand - Lightweight state management
sonner - Toast notifications
Step 3: Configure TypeScript
tsconfig.json:

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
Why these settings?

strict: true - Catches errors early
noUnusedLocals - Removes dead code
jsx: "react-jsx" - Latest JSX transform
paths - Import shortcuts (@/components instead of ../../)
4. DATABASE DESIGN WITH PRISMA
Understanding Databases
A database is organized storage for your application data. Think of it like a filing cabinet:

Table = Drawer (contains related data)
Row = File (single record)
Column = Property (attribute of record)
Example: Users Table

┌────┬───────────┬────────────┬─────────────────┐
│ id │   name    │   email    │   createdAt     │
├────┼───────────┼────────────┼─────────────────┤
│ 1  │ John Doe  │ john@...   │ 2024-01-01      │
│ 2  │ Jane Smith│ jane@...   │ 2024-01-02      │
└────┴───────────┴────────────┴─────────────────┘
What is Prisma?
Prisma is an ORM (Object-Relational Mapping) tool that:

Creates a schema (blueprint of database structure)
Generates code (types and query functions)
Validates data (type safety)
Handles migrations (version control for database)
Without Prisma (Raw SQL):

-- Manual SQL queries, error-prone
SELECT * FROM users WHERE email = 'john@example.com';
INSERT INTO users (name, email) VALUES ('Jane', 'jane@example.com');
With Prisma (Type-safe):

// Type-safe, auto-complete, error checking
const user = await db.user.findUnique({
  where: { email: 'john@example.com' }
});

const newUser = await db.user.create({
  data: { name: 'Jane', email: 'jane@example.com' }
});
VibeCode Database Schema
prisma/schema.prisma:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// User model - stores user account information
model User {
  id       String    @id @default(cuid()) @map("_id")
  name     String?
  email    String    @unique
  image    String?
  
  // Relations to other models
  accounts Account[]  // OAuth accounts linked to user
  myPlayground Playground[]  // Projects created by user
  staredPlayground StarMark[]  // Bookmarked projects
  chatMessages ChatMessage[]  // Chat history
  
  role     UserRole  @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// OAuth account mapping - tracks where user logged in from
model Account {
  id                String  @id @default(cuid()) @map("_id")
  userId            String  @map("user_id")
  type              String  // "oauth" or "credentials"
  provider          String  // "github" or "google"
  providerAccountId String  // ID from OAuth provider
  
  // Sensitive tokens (never expose to client)
  refreshToken      String? @map("refresh_token")
  accessToken       String? @map("access_token")
  expiresAt         Int?    @map("expires_at")
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@index([userId])
}

// Template selection - which framework user chose
enum Templates {
  REACT
  NEXTJS
  EXPRESS
  VUE
  HONO
  ANGULAR
}

// Playground/Project - represents one coding project
model Playground {
  id  String @id @default(cuid()) @map("_id")
  title  String
  description String?
  template   Templates  @default(REACT)
  
  // Who owns this project
  userId  String
  user    User @relation("myPlayground", fields: [userId], references: [id], onDelete: Cascade)
  
  // Related data
  starMarks   StarMark[]  // Users who bookmarked this
  templateFiles TemplateFile[]  // Code files in this project
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime @updatedAt
}

// Bookmark/Star system - users can bookmark projects
model StarMark {
  id  String @id @default(cuid()) @map("_id")
  userId String
  playgroundId String
  isMarked  Boolean
  
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  playground   Playground @relation(fields: [playgroundId], references: [id], onDelete: Cascade)
  
  createdAt  DateTime  @default(now())
  
  @@unique([userId, playgroundId])  // User can only mark each project once
}

// Code files - stores the actual code written in projects
model TemplateFile {
  id  String @id @default(cuid()) @map("_id")
  content Json  // JSON structure of files and folders
  
  playgroundId String @unique
  playground   Playground @relation(fields: [playgroundId], references: [id], onDelete: Cascade)
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime @updatedAt
}

// Chat messages - stores conversation with AI assistant
model ChatMessage {
  id  String @id @default(cuid()) @map("_id")
  userId String 
  role   String  // "user" or "assistant"
  content String  // The message text
  
  user  User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime  @default(now())
  
  @@index([userId])  // Fast lookup by user
}

enum UserRole {
  ADMIN
  USER
  PREMIUM_USER
}
How Relationships Work
One-to-Many Relationship:

One User → Many Playgrounds
┌─────────┐         ┌──────────────┐
│ User    │         │ Playground   │
├─────────┤         ├──────────────┤
│ id: 1   ├────────→│ id: 1        │
│ name    │         │ userId: 1    │
└─────────┘         │ title        │
                    └──────────────┘
                    ┌──────────────┐
                    │ Playground   │
                    ├──────────────┤
                    │ id: 2        │
                    │ userId: 1    │
                    │ title        │
                    └──────────────┘
Many-to-Many Relationship:

Users ←→ Playgrounds (through StarMark)
┌─────────┐         ┌──────────────┐         ┌──────────────┐
│ User    │         │ StarMark     │         │ Playground   │
├─────────┤         ├──────────────┤         ├──────────────┤
│ id: 1   ├────────→│ userId: 1    │────────→│ id: 5        │
└─────────┘         │ playgroundId │         └──────────────┘
                    │ isMarked: T  │
                    └──────────────┘
Prisma Setup Steps
Step 1: Initialize Prisma

npx prisma init
This creates:

prisma/schema.prisma - Database structure
.env - Environment variables
Step 2: Set Database URL

# MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"
Step 3: Create Database Client

npx prisma generate
This creates Prisma Client - auto-typed database queries.

Step 4: Push Schema to Database

npx prisma db push
This creates tables and collections in your database.

Step 5: Access Database in Code

// lib/db.ts - Singleton pattern to avoid multiple connections
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}
Why Singleton? Prevents creating multiple database connections which wastes resources.

5. AUTHENTICATION WITH NEXTAUTH
Authentication Explained
Authentication = Verifying "who you are" Authorization = Verifying "what you can do"

Without Authentication:

Anyone can pretend to be anyone
No personal data protection
No account management
With Authentication:

Secure login/logout
Session management
Personal projects
Data ownership
OAuth Flow (Login with Google)
1. User clicks "Login with Google"
        │
        ↓
2. Redirected to Google Login Page
        │
        ↓
3. User enters Google credentials
        │
        ↓
4. Google redirects back to app with auth code
        │
        ↓
5. Backend exchanges code for access token
        │
        ↓
6. Fetch user info from Google
        │
        ↓
7. Create/find user in database
        │
        ↓
8. Create session and redirect to dashboard
NextAuth Configuration
auth.ts:

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Where to store session data
  adapter: PrismaAdapter(db),
  
  // OAuth providers configuration
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  
  // What to do when user logs in
  callbacks: {
    // Add custom claims to session
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    
    // Create user if doesn't exist
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      return true
    },
  },
  
  // Configuration
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`)
    },
    async signOut() {
      console.log("User signed out")
    },
  },
})
auth.config.ts:

import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith("/auth")
      const isDashboard = nextUrl.pathname.startsWith("/dashboard")
      
      // Redirect non-authenticated users to login
      if (!isLoggedIn && isDashboard) {
        return false
      }
      
      // Redirect authenticated users away from auth page
      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      
      return true
    },
  },
} satisfies NextAuthConfig
middleware.ts:

// Runs before every request - protection layer
import { auth } from "@/auth"

export const middleware = auth((req) => {
  // Logged in users can access everything
  // Non-logged in users redirected to login
})

export const config = {
  // Apply middleware to these routes
  matcher: ["/dashboard/:path*", "/playground/:path*"],
}
API Route for Authentication
app/api/auth/[...nextauth]/route.ts:

import { handlers } from "@/auth"

// NextAuth handles login, logout, callback automatically
export const { GET, POST } = handlers
Using Authentication in Components
// Get current user
import { auth } from "@/auth"

export default async function DashboardLayout() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/sign-in")
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <img src={session.user.image} alt="Profile" />
    </div>
  )
}
6. FOLDER STRUCTURE & ORGANIZATION
Project File Structure
vibecode-editor/
│
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth pages (in parentheses = grouped route)
│   │   └── login/
│   │       └── page.tsx         # Login page component
│   │
│   ├── (root)/                  # Public pages
│   │   └── page.tsx             # Homepage
│   │
│   ├── api/                     # Backend API endpoints
│   │   ├── auth/
│   │   │   └── [...nextauth]/   # NextAuth endpoint
│   │   │       └── route.ts
│   │   ├── chat/
│   │   │   └── route.ts         # Chat with AI
│   │   ├── code-completion/
│   │   │   └── route.ts         # AI code suggestions
│   │   └── template/
│   │       └── [id]/
│   │           └── route.ts     # Get template structure
│   │
│   ├── dashboard/               # Dashboard page
│   │   ├── layout.tsx           # Dashboard layout wrapper
│   │   └── page.tsx             # Projects list
│   │
│   ├── playground/              # Code editor page
│   │   └── [id]/                # Dynamic route [project-id]
│   │       └── page.tsx         # Editor UI
│   │
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                  # Reusable UI components
│   ├── ui/                     # Basic UI components (buttons, cards, etc)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...more
│   │
│   └── providers/              # Context providers
│       └── theme-provider.tsx  # Dark/light mode
│
├── modules/                    # Feature modules (grouped by feature)
│   ├── auth/                  # Authentication feature
│   │   ├── actions/           # Server actions
│   │   │   └── index.ts       # Auth server functions
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── use-current-user.ts
│   │   ├── components/        # Auth UI components
│   │   └── types/             # TypeScript types
│   │       └── index.ts
│   │
│   ├── dashboard/             # Dashboard feature
│   │   ├── actions/           # Get/create/delete projects
│   │   ├── components/        # Project table, sidebar
│   │   ├── types/             # Project types
│   │   └── hooks/             # useProjects hook
│   │
│   ├── playground/            # Code editor feature
│   │   ├── actions/           # Save code, get template
│   │   ├── components/        # Editor, file explorer
│   │   ├── hooks/             # usePlayground, useFileExplorer
│   │   ├── lib/               # Utilities
│   │   │   ├── path-to-json.ts      # Convert file tree to JSON
│   │   │   ├── editor-config.ts     # Monaco editor config
│   │   │   └── index.ts
│   │   └── types/             # TemplateFile, TemplateFolder
│   │
│   ├── webcontainers/         # Code execution in browser
│   │   ├── hooks/
│   │   │   └── useWebContainer.ts   # WebContainer setup
│   │   ├── components/
│   │   │   └── webcontainer-preview.tsx
│   │   └── lib/
│   │
│   ├── ai-chat/               # AI assistant feature
│   │   ├── actions/           # Save messages
│   │   ├── components/        # Chat UI
│   │   ├── hooks/             # useChat hook
│   │   └── lib/               # AI service
│   │
│   └── home/                  # Homepage feature
│       ├── components/
│       └── sections/
│
├── lib/                       # Utility functions and helpers
│   ├── db.ts                 # Prisma client singleton
│   ├── template.ts           # Template paths mapping
│   ├── utils.ts              # General utilities
│   └── api-client.ts         # Fetch wrapper
│
├── hooks/                    # Global custom hooks
│   └── use-mobile.ts         # Mobile detection
│
├── public/                   # Static files
│   ├── logo.svg
│   ├── hero.svg
│   └── ...icons
│
├── prisma/                   # Database
│   └── schema.prisma         # Database schema
│
├── middleware.ts             # Authentication middleware
├── auth.ts                   # NextAuth configuration
├── auth.config.ts
├── routes.ts                 # Protected routes definition
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── package.json              # Dependencies
└── .env                      # Environment variables
Why This Structure?
Grouping by Feature - Related code stays together
Separation of Concerns - UI, logic, types, database
Scalability - Easy to add new features as modules
Clarity - New developers understand codebase quickly
Testing - Easy to test features independently
7. REACT & TYPESCRIPT FUNDAMENTALS
React Basics
What is React?

JavaScript library for building UIs
Component-based (reusable pieces)
Declarative (describe what UI looks like)
Reactive (updates when data changes)
Components
Functional Component (Modern):

// components/ui/button.tsx
interface ButtonProps {
  children: React.ReactNode  // What goes inside button
  onClick?: () => void       // Click handler function
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-medium"
  
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
How to use it:

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert("Clicked!")}>
        Click Me
      </Button>
    </div>
  )
}
Props (Properties)
Props are how you pass data to components.

// Parent component passes data
<UserCard
  name="John"
  email="john@example.com"
  image="/avatar.jpg"
/>

// Child component receives props
interface UserCardProps {
  name: string
  email: string
  image: string
}

function UserCard({ name, email, image }: UserCardProps) {
  return (
    <div className="border p-4 rounded">
      <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  )
}
React Hooks
Hooks are functions that let you use React features.

useState - State Management
State is data that changes over time.

import { useState } from "react"

export function Counter() {
  // [value, function_to_update_value] = useState(initial_value)
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
Flow:

Initial render: count = 0
User clicks button
setCount(1) is called
Component re-renders with count = 1
UI updates automatically
useEffect - Side Effects
Effects run after render (API calls, subscriptions, etc).

import { useState, useEffect } from "react"

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // This runs after component renders
  useEffect(() => {
    // Fetch user data
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [userId]) // Re-run when userId changes
  
  if (loading) return <div>Loading...</div>
  
  return <div>{user?.name}</div>
}
Dependency Array:

[] - Run once on mount
[userId] - Run when userId changes
No array - Run after every render
useCallback - Memoized Functions
Prevents unnecessary function recreation.

import { useCallback } from "react"

export function FileExplorer() {
  const [files, setFiles] = useState([])
  
  // Without useCallback - new function on every render
  // const handleDeleteFile = (id: string) => {
  //   setFiles(files.filter(f => f.id !== id))
  // }
  
  // With useCallback - same function unless deps change
  const handleDeleteFile = useCallback((id: string) => {
    setFiles(files => files.filter(f => f.id !== id))
  }, [])
  
  return (
    <FileList files={files} onDelete={handleDeleteFile} />
  )
}
useRef - Persistent Values
Access DOM elements or persist values without re-render.

import { useRef } from "react"

export function CodeEditor() {
  // Reference to editor instance
  const editorRef = useRef(null)
  
  const handleSave = () => {
    // Access editor value directly
    const code = editorRef.current?.getValue()
    console.log(code)
  }
  
  return (
    <>
      <MonacoEditor ref={editorRef} />
      <button onClick={handleSave}>Save</button>
    </>
  )
}
TypeScript Essentials
Why TypeScript?

Catch errors at development time (not runtime)
Auto-complete in IDE
Self-documenting code
Easier refactoring
Basic Types:

// Primitives
const name: string = "John"
const age: number = 25
const isActive: boolean = true
const nothing: null = null
const undef: undefined = undefined

// Collections
const names: string[] = ["John", "Jane"]
const ages: Array<number> = [25, 30, 35]

// Union types (multiple possible types)
const id: string | number = "123"  // Can be string OR number
const status: "active" | "inactive" = "active"  // Specific values

// Objects
interface User {
  id: string
  name: string
  email?: string  // Optional property (? means it can be undefined)
  age: number
}

const user: User = {
  id: "1",
  name: "John",
  // email is optional, can skip
  age: 25,
}

// Generics (flexible types)
function getFirstElement<T>(arr: T[]): T {
  return arr[0]
}

getFirstElement([1, 2, 3])  // Returns number
getFirstElement(["a", "b"])  // Returns string

// Any (avoid if possible - defeats TypeScript purpose)
let data: any = "can be anything"
data = 123  // Valid
data = {}   // Valid
Custom Hooks in VibeCode
usePlayground Hook:

import { useState, useCallback } from "react"
import { TemplateFolder } from "@/modules/playground/lib/path-to-json"

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null
  templateData: TemplateFolder | null
  isLoading: boolean
  error: string | null
  loadPlayground: () => Promise<void>
  saveTemplateData: (data: TemplateFolder) => Promise<void>
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  // State
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(null)
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Load playground data from server
  const loadPlayground = useCallback(async () => {
    if (!id) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch playground from database
      const data = await getPlaygroundById(id)
      
      if (!data) {
        setError("Failed to load playground data")
        return
      }
      
      setPlaygroundData(data)
      
      // Try to load from saved content
      const rawContent = data?.templateFiles?.[0]?.content
      
      if (typeof rawContent === "string") {
        const parsedContent = JSON.parse(rawContent)
        setTemplateData(parsedContent)
        return
      }
      
      // Otherwise fetch from API
      const res = await fetch(`/api/template/${id}`)
      if (!res.ok) throw new Error("Failed to load template")
      
      const templateRes = await res.json()
      setTemplateData(templateRes.templateJson)
    } catch (error) {
      setError("Failed to load playground data")
      console.error("Error loading playground:", error)
    } finally {
      setIsLoading(false)
    }
  }, [id])
  
  // Save changes to database
  const saveTemplateData = useCallback(async (data: TemplateFolder) => {
    try {
      await SaveUpdatedCode(id, data)
      setTemplateData(data)
    } catch (error) {
      throw error
    }
  }, [id])
  
  // Load on mount
  useEffect(() => {
    loadPlayground()
  }, [loadPlayground])
  
  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  }
}

// Usage in component
export function PlaygroundPage() {
  const { id } = useParams<{ id: string }>()
  const {
    templateData,
    isLoading,
    error,
    saveTemplateData
  } = usePlayground(id)
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return <PlaygroundEditor templateData={templateData} onSave={saveTemplateData} />
}
8. COMPONENT-BASED DEVELOPMENT
Component Hierarchy in VibeCode
App (root)
│
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Content
│       └── Page Router
│           ├── AuthPage
│           │   ├── LoginForm
│           │   └── SignUpForm
│           │
│           ├── DashboardPage
│           │   ├── ProjectTable
│           │   │   ├── ProjectRow
│           │   │   └── ProjectActions
│           │   ├── ProjectCard
│           │   └── AddProjectButton
│           │
│           └── PlaygroundPage
│               ├── Editor
│               │   ├── MonacoEditor
│               │   └── EditorToolbar
│               ├── FileExplorer
│               │   ├── FileTree
│               │   │   ├── FileItem
│               │   │   └── FolderItem
│               │   └── ContextMenu
│               ├── Preview
│               │   └── WebContainerPreview
│               └── AIChatPanel
│                   ├── ChatMessages
│                   ├── ChatInput
│                   └── CodeBlockRenderer
Creating Components - Step by Step
Step 1: Define Props Interface

// Define all data this component needs
interface PlaygroundEditorProps {
  templateData: TemplateFolder | null
  isLoading: boolean
  onSave: (data: TemplateFolder) => Promise<void>
  onError?: (error: Error) => void
}
Step 2: Create Component

export function PlaygroundEditor({
  templateData,
  isLoading,
  onSave,
  onError,
}: PlaygroundEditorProps) {
  // State for component
  const [isSaving, setIsSaving] = useState(false)
  
  // Event handlers
  const handleSave = async () => {
    try {
      setIsSaving(true)
      await onSave(templateData)
    } catch (error) {
      onError?.(error as Error)
    } finally {
      setIsSaving(false)
    }
  }
  
  // Render UI
  if (isLoading) return <LoadingSpinner />
  
  return (
    <div className="flex gap-4">
      <FileExplorer files={templateData?.items} />
      <MonacoEditor
        value={currentFile?.content}
        onChange={setCurrentFile}
      />
      <Preview templateData={templateData} />
      <Button
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  )
}
Step 3: Use Component

export function PlaygroundPage() {
  const { templateData, onSave } = usePlayground(id)
  
  return (
    <PlaygroundEditor
      templateData={templateData}
      isLoading={false}
      onSave={onSave}
      onError={(error) => toast.error(error.message)}
    />
  )
}
Component Communication Patterns
Parent to Child - Props:

// Parent
<UserCard user={userData} />

// Child
interface UserCardProps {
  user: User
}
function UserCard({ user }: UserCardProps) { ... }
Child to Parent - Callbacks:

// Parent
<FileExplorer
  files={files}
  onDelete={(fileId) => {
    setFiles(files.filter(f => f.id !== fileId))
  }}
/>

// Child
interface FileExplorerProps {
  files: File[]
  onDelete: (fileId: string) => void
}
function FileExplorer({ files, onDelete }: FileExplorerProps) {
  return (
    <button onClick={() => onDelete(file.id)}>
      Delete
    </button>
  )
}
Sibling Communication - Shared State (Lift State Up):

// Instead of: Editor → Sibling → Preview
// Do this: Both children share parent state

function PlaygroundPage() {
  const [currentFile, setCurrentFile] = useState(null)
  
  return (
    <>
      <Editor
        file={currentFile}
        onChange={setCurrentFile}
      />
      <Preview file={currentFile} />
    </>
  )
}
9. API DESIGN & ENDPOINTS
What are APIs?
API = Application Programming Interface

In layman's terms: A way for different programs to talk to each other.

Real-World Analogy:

You (client/browser) call a restaurant (server)
You request food (API request)
Restaurant makes food (server processes)
You get food (API response)
HTTP Methods (CRUD Operations)
GET    - Retrieve data (Read)
POST   - Create new data (Create)
PUT    - Replace entire data (Update)
PATCH  - Partially update data (Update)
DELETE - Remove data (Delete)
Example:

GET    /api/playgrounds      - Get all playgrounds
GET    /api/playgrounds/123  - Get specific playground
POST   /api/playgrounds      - Create new playground
PATCH  /api/playgrounds/123  - Update playground
DELETE /api/playgrounds/123  - Delete playground
VibeCode API Endpoints
1. Chat API - AI Assistant Conversation
File: app/api/chat/route.ts

interface ChatRequest {
  message: string
  history: ChatMessage[]
}

interface ChatResponse {
  response: string
  timestamp: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { message, history = [] } = body
    
    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }
    
    // Filter and limit chat history
    const recentHistory = history.slice(-10)  // Last 10 messages
    
    // Prepare messages for AI
    const messages: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ]
    
    // Call Ollama (local AI model)
    const aiResponse = await generateAIResponse(messages)
    
    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}

async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "codellama",
      prompt: messages.map(m => `${m.role}: ${m.content}`).join("\n"),
      stream: false,
    }),
  })
  
  const data = await response.json()
  return data.response.trim()
}
How to use from frontend:

const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "How do I create a React component?",
    history: previousMessages,
  }),
})

const data = await response.json()
console.log(data.response)  // AI's response
2. Code Completion API - AI Code Suggestions
File: app/api/code-completion/route.ts

interface CodeSuggestionRequest {
  fileContent: string
  cursorLine: number
  cursorColumn: number
  fileName?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CodeSuggestionRequest = await request.json()
    const { fileContent, cursorLine, cursorColumn, fileName } = body
    
    // Validate
    if (!fileContent || cursorLine < 0) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      )
    }
    
    // Analyze code context
    const context = analyzeCodeContext(
      fileContent,
      cursorLine,
      cursorColumn,
      fileName
    )
    
    // Build prompt for AI
    const prompt = buildPrompt(context, "completion")
    
    // Get suggestion from Ollama
    const suggestion = await generateSuggestion(prompt)
    
    return NextResponse.json({
      suggestion,
      context,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate suggestion" },
      { status: 500 }
    )
  }
}

function analyzeCodeContext(
  content: string,
  line: number,
  column: number,
  fileName?: string
) {
  const lines = content.split("\n")
  const currentLine = lines[line] || ""
  
  // Get surrounding context
  const beforeContext = lines.slice(Math.max(0, line - 10), line).join("\n")
  const afterContext = lines.slice(line + 1, Math.min(lines.length, line + 10)).join("\n")
  
  // Detect language from file extension
  const language = detectLanguage(fileName, content)
  
  return {
    language,
    beforeContext,
    currentLine,
    afterContext,
    cursorPosition: { line, column },
  }
}

function buildPrompt(context, suggestionType: string): string {
  return `You are a code completion AI. Complete the following ${context.language} code:
  
Before:
${context.beforeContext}

Current:
${context.currentLine.substring(0, context.cursorPosition.column)}|CURSOR|${context.currentLine.substring(context.cursorPosition.column)}

After:
${context.afterContext}

Generate a short code completion suggestion. Return only the code to insert at cursor.`
}
Frontend usage:

const suggestion = await fetch("/api/code-completion", {
  method: "POST",
  body: JSON.stringify({
    fileContent: code,
    cursorLine: editor.getPosition().lineNumber,
    cursorColumn: editor.getPosition().column,
    fileName: "App.tsx",
  }),
})

const { suggestion } = await suggestion.json()
// Show suggestion in editor
3. Template API - Get Project Structure
File: app/api/template/[id]/route.ts

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  if (!id) {
    return Response.json(
      { error: "Missing playground ID" },
      { status: 400 }
    )
  }
  
  // Find playground in database
  const playground = await db.playground.findUnique({
    where: { id }
  })
  
  if (!playground) {
    return Response.json(
      { error: "Playground not found" },
      { status: 404 }
    )
  }
  
  // Get template path
  const templateKey = playground.template as keyof typeof templatePaths
  const templatePath = templatePaths[templateKey]
  
  if (!templatePath) {
    return Response.json(
      { error: "Invalid template" },
      { status: 404 }
    )
  }
  
  try {
    // Read template files from vibecode-starters/
    const inputPath = path.join(process.cwd(), templatePath)
    
    // Check if directory exists
    await fs.stat(inputPath)
    
    // Convert directory to JSON structure
    const result = await scanTemplateDirectory(inputPath)
    
    return Response.json(
      { success: true, templateJson: result },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      { error: "Failed to generate template" },
      { status: 500 }
    )
  }
}
Response example:

{
  "success": true,
  "templateJson": {
    "folderName": "react-ts",
    "items": [
      {
        "filename": "index",
        "fileExtension": "tsx",
        "content": "import React from 'react';\n..."
      },
      {
        "filename": "styles",
        "fileExtension": "css",
        "content": "..."
      }
    ]
  }
}
API Status Codes
200 OK                  - Request successful
201 Created             - Resource created successfully
400 Bad Request         - Invalid input from client
401 Unauthorized        - Not authenticated
403 Forbidden           - Authenticated but no permission
404 Not Found           - Resource doesn't exist
500 Internal Error      - Server error
Error Handling Pattern
export async function GET(request: NextRequest) {
  try {
    const data = await db.playground.findUnique({ ... })
    
    if (!data) {
      return Response.json(
        { error: "Not found" },
        { status: 404 }
      )
    }
    
    return Response.json(data)
  } catch (error) {
    console.error("Database error:", error)
    
    return Response.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown"
      },
      { status: 500 }
    )
  }
}
10. REAL-TIME CODE EXECUTION (WEBCONTAINERS)
What is WebContainer?
WebContainer lets you run Node.js applications directly in the browser without needing a server.

Traditional approach:

Your Code → Send to Server → Server executes → Send result back
WebContainer approach:

Your Code → Execute in Browser directly → See results instantly
Advantages:

No server needed
Instant feedback
Works offline
Secure (runs in sandbox)
Fast (no network latency)
WebContainer Setup
Hook: useWebContainer.ts

import { useState, useEffect, useCallback, useRef } from "react"
import { WebContainer } from "@webcontainer/api"
import { TemplateFolder } from "@/modules/playground/lib/path-to-json"

interface UseWebContainerProps {
  templateData: TemplateFolder | null
}

interface UseWebContainerReturn {
  serverUrl: string | null
  isLoading: boolean
  error: string | null
  instance: WebContainer | null
  writeFileSync: (path: string, content: string) => Promise<void>
  destroy: () => void
}

// Singleton pattern - only one WebContainer instance
let webContainerInstance: WebContainer | null = null
let bootPromise: Promise<WebContainer> | null = null

const getWebContainerInstance = async (): Promise<WebContainer> => {
  // Return existing instance if available
  if (webContainerInstance) {
    return webContainerInstance
  }
  
  // Return promise if already booting
  if (bootPromise) {
    return bootPromise
  }
  
  // Boot new instance
  bootPromise = WebContainer.boot()
  webContainerInstance = await bootPromise
  return webContainerInstance
}

export const useWebContainer = ({
  templateData,
}: UseWebContainerProps): UseWebContainerReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [instance, setInstance] = useState<WebContainer | null>(null)
  const mountedRef = useRef(true)
  
  // Initialize WebContainer on mount
  useEffect(() => {
    mountedRef.current = true
    
    async function initializeWebContainer() {
      try {
        const containerInstance = await getWebContainerInstance()
        
        if (!mountedRef.current) return
        
        setInstance(containerInstance)
        setIsLoading(false)
        
        // If template data available, install dependencies
        if (templateData) {
          await installDependencies(containerInstance)
          const url = await startDevServer(containerInstance)
          setServerUrl(url)
        }
      } catch (error) {
        console.error("Failed to initialize WebContainer:", error)
        if (mountedRef.current) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize WebContainer"
          )
          setIsLoading(false)
        }
      }
    }
    
    initializeWebContainer()
    
    return () => {
      mountedRef.current = false
    }
  }, [])
  
  // Write files to WebContainer
  const writeFileSync = useCallback(
    async (path: string, content: string): Promise<void> => {
      if (!instance) {
        throw new Error("WebContainer not initialized")
      }
      
      try {
        // Create directory structure
        const pathParts = path.split("/")
        const folderPath = pathParts.slice(0, -1).join("/")
        
        if (folderPath) {
          await instance.fs.mkdir(folderPath, { recursive: true })
        }
        
        // Write file
        await instance.fs.writeFile(path, content)
      } catch (error) {
        throw new Error(`Failed to write file: ${path}`)
      }
    },
    [instance]
  )
  
  const destroy = useCallback(() => {
    if (webContainerInstance) {
      webContainerInstance.teardown()
      webContainerInstance = null
      bootPromise = null
      setInstance(null)
      setServerUrl(null)
    }
  }, [])
  
  return {
    serverUrl,
    isLoading,
    error,
    instance,
    writeFileSync,
    destroy,
  }
}

async function installDependencies(instance: WebContainer) {
  // npm install equivalent
  const process = await instance.spawn("npm", ["install"])
  await process.exit
}

async function startDevServer(instance: WebContainer): Promise<string> {
  // Start development server based on template
  const process = await instance.spawn("npm", ["run", "dev"])
  
  // Wait for server to start
  return new Promise((resolve) => {
    instance.on("server-ready", (port, url) => {
      resolve(url)
    })
  })
}
Using WebContainer in Components
Component: WebContainerPreview

import { useWebContainer } from "@/modules/webcontainers/hooks/useWebContainer"
import { TemplateFolder } from "@/modules/playground/lib/path-to-json"

interface WebContainerPreviewProps {
  templateData: TemplateFolder | null
  onCodeChange?: (file: string, content: string) => void
}

export function WebContainerPreview({
  templateData,
  onCodeChange,
}: WebContainerPreviewProps) {
  const { serverUrl, isLoading, error, instance, writeFileSync } =
    useWebContainer({ templateData })
  
  if (isLoading) {
    return <div className="p-4">Initializing runtime...</div>
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }
  
  return (
    <div className="w-full h-full border rounded">
      {serverUrl ? (
        <iframe
          src={serverUrl}
          className="w-full h-full border-none"
          title="Preview"
        />
      ) : (
        <div className="p-4">Starting server...</div>
      )}
    </div>
  )
}
File System Structure in WebContainer
// Create project structure in WebContainer
const files = {
  "package.json": JSON.stringify(packageJson, null, 2),
  "src/index.tsx": `import React from 'react';\n...`,
  "src/App.tsx": `export function App() { ... }`,
  "src/styles.css": `body { ... }`,
}

// Write all files
for (const [path, content] of Object.entries(files)) {
  await writeFileSync(path, content)
}
11. AI INTEGRATION (OLLAMA)
What is Ollama?
Ollama runs large language models (AI) locally on your computer - no cloud needed!

Cloud AI (like ChatGPT):

Send data to servers
Privacy concerns
Costs money
Depends on internet
Local AI (Ollama):

Runs on your machine
Complete privacy
Free
Works offline
Installing Ollama
# 1. Download from https://ollama.ai
# 2. Install it
# 3. Run a model

ollama run codellama
This downloads CodeLlama (optimized for code) and starts it.

Ollama API
Basic Request:

curl http://localhost:11434/api/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "model": "codellama",
    "prompt": "function fibonacci(n) {",
    "stream": false
  }'
Response:

{
  "response": "  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
  "model": "codellama",
  "created_at": "2024-01-12T10:00:00.000000Z",
  "done": true
}
Integration in VibeCode
Ollama Service:

// lib/ollama.ts
const OLLAMA_BASE_URL = process.env.OLLAMA_URL || "http://localhost:11434"

export async function generateCodeCompletion(
  prompt: string,
  model: string = "codellama"
): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,  // Don't stream - wait for complete response
      options: {
        temperature: 0.7,  // Creativity level (0-1)
        top_p: 0.9,       // Diversity
      },
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`)
  }
  
  const data = await response.json()
  return data.response
}

export async function generateChatResponse(
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const formattedPrompt = messages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n\n")
  
  return generateCodeCompletion(formattedPrompt)
}
Integration Points
1. Code Completion (Ctrl+Space)

// When user presses Ctrl+Space in editor
const handleCodeComplete = async (
  fileContent: string,
  cursorPos: Position
) => {
  const prompt = buildCompletionPrompt(fileContent, cursorPos)
  
  const suggestion = await fetch("/api/code-completion", {
    method: "POST",
    body: JSON.stringify({
      prompt,
      fileContent,
      cursorPos,
    }),
  }).then(res => res.json())
  
  // Show suggestion in editor
  showSuggestion(suggestion)
}
2. AI Chat Assistant

// In chat panel
const handleSendMessage = async (message: string) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      message,
      history: chatHistory,
      context: {
        currentFile: openFile?.name,
        selectedCode: selection,
      },
    }),
  }).then(res => res.json())
  
  addMessageToChat({
    role: "assistant",
    content: response.response,
  })
}
3. Code Review & Suggestions

// Right-click menu - "Explain this code"
const handleExplainCode = async (selectedCode: string) => {
  const prompt = `Explain this code:\n${selectedCode}`
  
  const explanation = await fetch("/api/chat", {
    method: "POST",
    body: JSON.
