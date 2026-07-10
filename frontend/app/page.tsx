import DashboardClient from "@/components/DashboardClient";

type Session = {
  id: string;
  has_metadata: boolean;
};

export default async function Home() {
  const response = await fetch("https://robot-session-dashboard-api.onrender.com/sessions", {
    cache: "no-store",
  });
  const sessions: Session[] = await response.json();
  return ( 
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-gray-900 lg:px-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Robot Analytics
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-950">
          Robot Session Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Analyze synthetic robot trajectory and session performance.
        </p>
      </header>

     <DashboardClient sessions={sessions} />
     
    </main>
  )
}