# AI Slides — Chat → PowerPoint (Demo)

**AI Slides** is a demo full-stack application that allows users to interact with an AI chat assistant to generate and edit PowerPoint presentations. The app demonstrates:

- A chat-style UI for prompts and edits (React / Next.js)
- Server-side AI integration (Gemini / GenAI) to produce structured slide JSON
- In-browser PPT generation using **pptxgenjs**
- Edit/update flow: send prompt + current slide JSON → AI returns updated JSON → regenerate PPT

This repository contains a working demo (mock AI by default) and instructions to configure a real Gemini / GenAI model server-side.

---

## Live demo (deployed)
> Deployed app URL: **(replace with your deployed link)**  
Example: `https://ai-slides.example.com`

---

## GitHub repository
Public source code: **(replace with your GitHub repo link)**  
Example: `https://github.com/yourusername/ai-slides`

---

## Table of contents

- [Project structure](#project-structure)
- [JSON contract for slide data](#json-contract-for-slide-data)
- [Local development (Windows / macOS / Linux)](#local-development-windows--macos--linux)
- [Server AI integration (Gemini / GenAI)](#server-ai-integration-gemini--genai)
- [Deployment (Vercel)](#deployment-vercel)
- [Testing & sample prompts](#testing--sample-prompts)
- [Troubleshooting](#troubleshooting)
- [Security & best practices](#security--best-practices)
- [License](#license)

---

## Project structure

ai-slides/
├─ .gitignore
├─ README.md
├─ package.json
├─ package-lock.json
├─ next.config.ts
├─ tsconfig.json
├─ global.d.ts # optional: declare module "pptxgenjs"
├─ src/
│ ├─ app/ # Next.js App Router
│ │ ├─ layout.tsx
│ │ ├─ page.tsx # client page with chat UI + pptx generation (use "use client")
│ │ ├─ globals.css
│ │ └─ api/
│ │ └─ generate/
│ │ └─ route.ts # server API - mock or Gemini call
│ ├─ lib/
│ │ └─ pptx.ts # optional helper for pptxgenjs
│ └─ components/
│ ├─ ChatWindow.tsx
│ ├─ MessageInput.tsx
│ └─ SlidePreview.tsx
├─ data/ 
