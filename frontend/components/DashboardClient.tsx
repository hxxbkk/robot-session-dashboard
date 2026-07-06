"use client";

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
    return <div>Dashboard Client</div>;
}