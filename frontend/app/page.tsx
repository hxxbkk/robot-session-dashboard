const sessions = [
  "session_001",
  "session_002",
  "session_003",
  "session_004",
  "session_005",
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <header className="mb-8">
      <h1 className="text-3xl font-bold">Robot Session Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Analyze synthetic robot trajectory and IMU sessions.
      </p>
      </header>

      <div className="flex gap-6">
        <aside className="w-72 rounded-xl bh-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Sessions</h2>

          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session}
                className="w-full rounded-log border border-gray-200 px-4 py-3 text-left hover:bg-gray-100"
            >
              {session}
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