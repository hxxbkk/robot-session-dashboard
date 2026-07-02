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
        <aside className="w-72 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Sessions</h2>

          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left hover:bg-gray-100"
            >
              {session.id}
            </button>
              ))}
          </div>
        </aside>

        <section className="flex-1 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Session Summary</h2>
          <p className="mt-2 text-gray-600">
            Select a session to view trajectory and summary metrics.
          </p>
        </section>
      </div>
    </main>
  )
}