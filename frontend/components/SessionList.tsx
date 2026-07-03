type Session = {
  id: string;
  has_metadata: boolean;
 };

 type SessionListProps = {
    sessions: Session[];
 }

 export default function SessionList({
    sessions,
 }: SessionListProps) {
    return (
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
    );
 }

