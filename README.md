# BhīrAI

Welcome to BhīrAI — an AI-powered crowd safety system built by real people who care about real peace of mind.

## 🚀 What is BhīrAI?
BhīrAI helps you see crowd risks before they become a problem. It uses advanced AI (YOLOv5) to detect people, track movement, and alert you to potential panic situations — all in real time, right in your browser.

## ✨ Features
- **Real-time crowd detection** with YOLOv5
- **Live AI demo** (webcam-based)
- **Panic trajectory tracking** and risk heatmaps
- **Instant alerts** with geolocation and map
- **Modern, minimal, human-centric UI**

## 🗂️ Project Structure
- `src/` — React frontend (TypeScript + Tailwind CSS)
- `backend/` — FastAPI backend (Python + YOLOv5)

## 🛠️ Getting Started

### 1. Frontend (React)
```bash
cd D:/BhirAi
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend (FastAPI + YOLOv5)
```bash
cd D:/BhirAi/backend
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On Mac/Linux
pip install --upgrade pip
pip install -r requirements.txt
uvicorn yolo_server:app --reload --host 0.0.0.0 --port 8000
```
Visit [http://localhost:8000/docs](http://localhost:8000/docs) to check the API.

## 🌐 Deployment
- **Frontend:** Deploy to Vercel, Netlify, or your favorite static host.
- **Backend:** Deploy to Render, Railway, or your own server (make sure to update the frontend API URL).

## 📝 Notes & Tips
- If deploying separately, set the backend API URL in the frontend via environment variables.
- Never commit sensitive info or API keys.
- The Live AI Demo is under active development — expect rapid improvements!

---

### Made with care by real humans. BhīrAI is for everyone’s safety — no hype, just help.

If you have questions, ideas, or want to contribute, open an issue or reach out. We’re always happy to connect! 