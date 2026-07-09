"use client";
import { useEffect, useState } from "react";
import SessionList from "./SessionList";
import SummaryCard from "./SummaryCard";
import TrajectoryChart from "./TrajectoryChart";

type Session = {
    id: string;
    has_metadata: boolean;
}

type Summary = {
        id: string;
        frames: number;
        duration_sec: number;
        keyframes: number;
        lost_frames: number;
    };

type DashboardClientProps = {
    sessions: Session[];
}

type TrajectoryPoint = {
    x: number;
    y: number;
    z: number;
};

export default function DashboardClient({
    sessions,
}: DashboardClientProps) {

    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);

    useEffect(() => {
        if (!selectedSession) {
            setSummary(null);
            setTrajectory([]);
            return;
        }

        async function fetchSummary() {
            const response = await fetch(
                `http://127.0.0.1:8000/sessions/${selectedSession}/summary`
            );

            const data = await response.json();

            setSummary(data);
        }

        async function fetchTrajectory() {
            const response = await fetch(
                `http://127.0.0.1:8000/sessions/${selectedSession}/trajectory`
            );

            const data = await response.json();

            setTrajectory(data.points);
        }

        fetchSummary();
        fetchTrajectory();
    }, [selectedSession]);
    
    return <div className="flex gap-6">
        <SessionList sessions={sessions} selectedSession={selectedSession} onSelectSession={setSelectedSession}/>
        
        <div className="flex-1 space-y-6">
            <SummaryCard summary={summary}/>
            <TrajectoryChart trajectory={trajectory} />
        </div>     
    </div>;
}