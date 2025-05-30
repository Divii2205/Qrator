# Qrator

Qrator is an AI-powered content creation platform for creators. It helps you generate ideas, scripts, thumbnails, and optimize your content for SEO, all in one place.

## Features

- **AI Idea Generator:** Get creative content ideas based on your goals and trends.
- **Script Generator:** Turn ideas into professional scripts for videos, podcasts, and more.
- **Thumbnail Creator:** Generate eye-catching thumbnails with AI-powered design suggestions.
- **SEO Tools:** Analyze and optimize your content for better visibility and engagement.
- **Content Calendar:** Plan and schedule your content across platforms.
- **Content Vault:** Store, organize, and manage all your generated content securely.
- **Google Auth Integration:** Sign in with Google for a seamless experience.

---

## Project Structure

```
Qrator/           # Frontend (React + Vite)
  src/
    components/
    pages/
    utils/
  package.json
  vite.config.js
  ...
Qrator-backend/   # Backend (Node.js + Express)
  routes/
  services/
  utils/
  package.json
  ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- [Supabase](https://supabase.com/) account (for database and auth)
- [Google Gemini API](https://ai.google.dev/) key (for AI features)

---

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/qrator.git
cd Qrator
```

---

### 2. Setup the Backend

```sh
cd Qrator-backend
cp .env.example .env   # Add your Supabase and Gemini API keys
npm install
npm run migrate        # (If you have migration scripts)
npm start
```

- The backend runs on `http://localhost:4000` by default.

---

### 3. Setup the Frontend

```sh
cd ../Qrator
npm install
npm run dev
```

- The frontend runs on `http://localhost:5173` by default.

---

## Environment Variables

**Backend (`Qrator-backend/.env`):**

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Usage

- Visit `http://localhost:5173` in your browser.
- Sign in with Google.
- Start generating ideas, scripts, thumbnails, and more!

---

## Folder Overview

- **Frontend:** [Qrator/](Qrator)
  - Main entry: [`src/main.jsx`](Qrator/src/main.jsx)
  - Pages: [`src/pages/`](Qrator/src/pages/)
  - Components: [`src/components/`](Qrator/src/components/)
- **Backend:** [Qrator-backend/](Qrator-backend)
  - Main entry: [`index.js`](Qrator-backend/index.js)
  - Routes: [`routes/`](Qrator-backend/routes/)
  - Services: [`services/`](Qrator-backend/services/)

---

## License

MIT

---

## Credits

Built by creatives for creators.
