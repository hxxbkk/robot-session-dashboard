"use client";
import { useState } from "react";
import SessionList from "./SessionList";
import SummaryCard from "./SummaryCard";

type Session = {
    id: string;
    has_metadata: boolean;
}

type DashboardClientProps = {
    sessions: Session[];
}

export default function DashboardClient({
    sessions,
}: DashboardClientProps) {
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    return <div className="flex gap-6">
        <SessionList sessions={sessions} selectedSession={selectedSession} onSelectSession={setSelectedSession}/>
        <SummaryCard />
    </div>;
}