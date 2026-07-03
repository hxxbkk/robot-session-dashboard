import SessionList from "@/components/SessionList";
import SummaryCard from "@/components/SummaryCard";
type Session = {
  id: string;
  has_metadata: boolean;
};

export default async function Home() {
  const response = await fetch("http://127.0.0.1:8000/sessions");
  const sessions: Session[] = await response.json();
  return ( 
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <header className="mb-8">
      <h1 className="text-3xl font-bold">Robot Session Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Analyze synthetic robot trajectory and IMU sessions.
      </p>
      </header>

      <div className="flex gap-6">
        <SessionList sessions={sessions} />
        <SummaryCard />
        
      </div>
    </main>
  )
}