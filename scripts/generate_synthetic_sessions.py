import os
import json
import math
import random
from datetime import datetime, timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "sample_data"
NUM_SESSIONS = 100
FPS = 60


def make_session(session_idx: int):
    session_name = f"session_{session_idx:03d}"
    session_dir = os.path.join(OUTPUT_DIR, session_name)
    os.makedirs(session_dir, exist_ok=True)

    duration = random.uniform(10, 30)
    frames = int(duration * FPS)

    lost_prob = random.choice([0.0, 0.0, 0.002, 0.005])
    keyframe_interval = random.randint(25, 45)

    trajectory_path = os.path.join(session_dir, "camera_trajectory.csv")

    x, y, z = 0.0, 0.0, 0.0

    with open(trajectory_path, "w", encoding="utf-8") as f:
        f.write(
            "frame_idx,timestamp,state,is_lost,is_keyframe,"
            "x,y,z,q_x,q_y,q_z,q_w\n"
        )

        for i in range(frames):
            t = i / FPS

            # 부드러운 가상 이동 경로
            x += 0.005 + random.uniform(-0.001, 0.001)
            y = math.sin(t * 0.8) * 0.3 + random.uniform(-0.002, 0.002)
            z = 0.1 + math.cos(t * 0.5) * 0.05 + random.uniform(-0.001, 0.001)

            is_lost = random.random() < lost_prob
            is_keyframe = i % keyframe_interval == 0

            # 단순 quaternion mock
            qx = math.sin(t * 0.05) * 0.1
            qy = math.cos(t * 0.05) * 0.1
            qz = math.sin(t * 0.03) * 0.1
            qw = 0.98

            f.write(
                f"{i},{t:.6f},2,"
                f"{str(is_lost).lower()},"
                f"{str(is_keyframe).lower()},"
                f"{x:.9f},{y:.9f},{z:.9f},"
                f"{qx:.9f},{qy:.9f},{qz:.9f},{qw:.9f}\n"
            )

    make_imu_json(session_dir, frames)
    make_metadata(session_dir, session_name, duration, frames)


def make_stream(name: str, frames: int):
    start = datetime(2026, 3, 17, 12, 0, 0)
    data = []

    for i in range(frames):
        t = i / FPS

        if name == "ACCL":
            value = [
                random.uniform(-0.05, 0.05),
                math.sin(t) * 0.1 + random.uniform(-0.03, 0.03),
                9.8 + random.uniform(-0.1, 0.1),
            ]
        elif name == "GYRO":
            value = [
                math.sin(t * 0.5) * 0.02,
                math.cos(t * 0.4) * 0.02,
                random.uniform(-0.01, 0.01),
            ]
        elif name == "GRAV":
            value = [
                random.uniform(-0.02, 0.02),
                0.8 + random.uniform(-0.02, 0.02),
                0.6 + random.uniform(-0.02, 0.02),
            ]
        else:
            value = [
                random.uniform(-1, 1),
                random.uniform(-1, 1),
                random.uniform(-1, 1),
            ]

        data.append({
            "value": value,
            "cts": i * (1000 / FPS),
            "date": (start + timedelta(seconds=t)).isoformat() + "Z"
        })

    return {
        "samples": data,
        "name": name
    }


def make_imu_json(session_dir: str, frames: int):
    imu = {
        "1": {
            "streams": {
                "ACCL": make_stream("ACCL", frames),
                "GYRO": make_stream("GYRO", frames),
                "CORI": make_stream("CORI", frames),
                "IORI": make_stream("IORI", frames),
                "GRAV": make_stream("GRAV", frames),
            },
            "device name": "Synthetic HERO12"
        },
        "frames/second": FPS
    }

    with open(os.path.join(session_dir, "imu_data.json"), "w", encoding="utf-8") as f:
        json.dump(imu, f, indent=2)


def make_metadata(session_dir: str, session_name: str, duration: float, frames: int):
    metadata = {
        "session_id": session_name,
        "task": random.choice(["pick_place", "cup_transfer", "box_sorting"]),
        "duration_sec": round(duration, 2),
        "frames": frames,
        "source": "synthetic",
        "created_by": "synthetic_session_generator"
    }

    with open(os.path.join(session_dir, "metadata.json"), "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for i in range(1, NUM_SESSIONS + 1):
        make_session(i)

    print(f"Generated {NUM_SESSIONS} synthetic robot sessions in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()