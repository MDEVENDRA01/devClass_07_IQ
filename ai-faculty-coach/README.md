# 🎓 AI Faculty Coach

[![Next.js Version](https://img.shields.io/badge/next.js-v16.2.9-blue.svg)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/react-v19.2.4-blueviolet.svg)](https://react.dev/)
[![Deployment](https://img.shields.io/badge/deployed_on-Google_Cloud_Run-green.svg)](https://cloud.google.com/run)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)

**AI Faculty Coach** is a modern Next.js-based artificial intelligence coaching assistant platform built for **Sri Gowthami Educational Institutions**. It helps educators refine their lesson plans, align lesson objectives with standard frameworks like Bloom's Taxonomy, assess teaching methodologies, and obtain instant, actionable feedback.

> 🚀 **Live Demo:** [https://ai-faculty-coach-ug67qd7zja-uc.a.run.app](https://ai-faculty-coach-ug67qd7zja-uc.a.run.app)

---

## 🌟 Key Features

### 1. **Role-Based Workspaces & Dashboards**
The platform customizes its interface and permissions based on user roles:
*   **Teacher:** Create and customize lesson plans, generate AI feedback, view feedback history, and manage bookmarks.
*   **HOD (Head of Department):** View aggregated department metrics, analyze teaching methodologies, view lesson history, and get department-wide quality score metrics.
*   **Admin:** Access system-wide logs, manage users, and adjust active system prompts or prompt versioning.

### 2. **AI-Powered Coach Assistant**
*   **Structured Feedback:** Generates instant quality scores, alignment analysis, overall pedagogical summaries, list of strengths, and improvements.
*   **Pedagogical Guidance:** Recommends delivery tips, specific formative assessment checkpoints, and interactive classroom activities (e.g. Concept Mapping, Jigsaw, Socratic Seminars).
*   **Quick Templates:** Includes premade templates for Science (Photosynthesis), Mathematics (Quadratic Equations), and English (Creative Writing) for rapid testing.

### 3. **History & Bookmarks Panel**
*   Stores past AI-generated reviews.
*   Enables bookmarking and filtering recommendations.
*   Shows ratings and detailed alignment metrics at a glance.

### 4. **Analytics Suite**
*   Powered by `Recharts` for visually rich charts.
*   Displays daily average coaching scores and submission counts.
*   Provides teaching method effectiveness analysis.
*   Visualizes review ratings distributions.

### 5. **Admin Console**
*   Manage users and check last-active statuses.
*   System Prompt Versioning system.
*   Real-time system events, API request performance, and authorization logs.

---

## 🛠️ Tech Stack
*   **Framework:** Next.js 16 (Turbopack support)
*   **Core Library:** React 19
*   **Charts & Visuals:** Recharts
*   **State & Auth:** React Context API (`AuthContext`, `AppContext`)
*   **Styling:** Modern, responsive vanilla CSS featuring HSL palettes, subtle micro-animations, and glassmorphism.
*   **Deployment:** Google Cloud Run (Containerized build)

---

## 📂 Folder Structure
```text
ai-faculty-coach/
├── src/
│   ├── app/                # Next.js App Router (pages: dashboard, admin, analytics, coach, history, login, etc.)
│   ├── components/         # Reusable layouts, Navbar, Sidebar, and Coach forms/panels
│   ├── context/            # AuthContext (roles) & AppContext (global state, theme, settings)
│   ├── data/               # Persistent client-side data mocks
│   └── lib/                # Shared utilities, constants, and mock AI engines
├── public/                 # Static assets and icons
├── package.json            # Scripts & project dependencies
└── README.md               # You are here!
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 18+ recommended) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MDEVENDRA01/AI_FACULTY.git
   cd AI_FACULTY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   *   [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Accounts
To log in, use the following preloaded credentials on the login screen:

| Role | Username / Email | Password |
| :--- | :--- | :--- |
| **Teacher** | `priya@gowthami.edu.in` | *(Any password)* |
| **HOD** | `rajesh@gowthami.edu.in` | *(Any password)* |
| **Admin** | `admin@gowthami.edu.in` | *(Any password)* |

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
