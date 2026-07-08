"use client";
import { useEffect, useState } from "react";
import SessionList from "./SessionList";
import SummaryCard from "./SummaryCard";

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

export default function DashboardClient({
    sessions,
}: DashboardClientProps) {

    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);

    useEffect(() => {
        if (!selectedSession) {
            setSummary(null);
            return;
        }

        async function fetchSummary() {
            const response = await fetch(
                `http://127.0.0.1:8000/sessions/${selectedSession}/summary`
            );

            const data = await response.json();

            setSummary(data);
        }

        fetchSummary();
    }, [selectedSession]);
    
    return <div className="flex gap-6">
        <SessionList sessions={sessions} selectedSession={selectedSession} onSelectSession={setSelectedSession}/>
        <SummaryCard summary={summary}/>
    </div>;
}