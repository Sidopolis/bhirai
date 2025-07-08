# BhīrAI

AI-powered crowd panic detection system with a React + Tailwind CSS frontend and a YOLO-based Python FastAPI backend.

## Features
- Real-time person/crowd detection using YOLOv5
- Live AI demo with webcam
- Panic trajectory tracking, heatmap, and risk alerts
- Geolocation and map in alerts
- Modern, minimal, human-centric UI

## Project Structure
- `src/` – React frontend source code
- `backend/` – FastAPI backend with YOLOv5

## Getting Started

### Frontend (React)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend (FastAPI + YOLO)
1. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # or
   source venv/bin/activate  # On Mac/Linux
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   uvicorn yolo_server:app --reload
   ```

## Deployment
- Frontend: Deploy to Vercel
- Backend: Deploy to Render, Railway, or your own server

## Notes
- Set the backend API URL in the frontend using an environment variable if deploying separately.
- Do not commit sensitive info or API keys.

---
Made with care by a real human. BhīrAI is for everyone's safety—no hype, just help. 