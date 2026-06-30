from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# frontend에서 API 호출할 수 있게 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 현재 파일 위치: robot-session/backend/main.py
# sample_data 위치: robot-session/sample_data
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "sample_data"


@app.get("/")
def root():
    return {"message": "Robot Session API"}


@app.get("/sessions")
def get_sessions():
    sessions = []

    for folder in DATA_DIR.iterdir():
        if folder.is_dir():
            metadata_path = folder / "metadata.json"

            sessions.append({
                "id": folder.name,
                "has_metadata": metadata_path.exists()
            })

    return sessions


@app.get("/sessions/{session_id}/summary")
def get_session_summary(session_id: str):
    session_dir = DATA_DIR / session_id
    csv_path = session_dir / "camera_trajectory.csv"

    if not csv_path.exists():
        raise HTTPException(status_code=404, detail="Session not found")

    df = pd.read_csv(csv_path)

    frames = len(df)
    duration = float(df["timestamp"].iloc[-1])
    keyframes = int(df["is_keyframe"].sum())
    lost_frames = int(df["is_lost"].sum())

    return {
        "id": session_id,
        "frames": frames,
        "duration_sec": round(duration, 2),
        "keyframes": keyframes,
        "lost_frames": lost_frames
    }

@app.get("/sessions/{session_id}/trajectory")
def get_session_trajectory(session_id: str):
    session_dir = DATA_DIR / session_id
    csv_path = session_dir / "camera_trajectory.csv"

    if not csv_path.exists():
        raise HTTPException(status_code=404, detail="Session not found")

    df = pd.read_csv(csv_path)

    trajectory = []

    for _, row in df.iterrows():
        trajectory.append({
            "timestamp": float(row["timestamp"]),
            "x": float(row["x"]),
            "y": float(row["y"]),
            "z": float(row["z"]),
            "is_keyframe": bool(row["is_keyframe"]),
            "is_lost": bool(row["is_lost"])
        })

    return {
        "id": session_id,
        "points": trajectory
    }