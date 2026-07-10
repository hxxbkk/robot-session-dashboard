"use client";
import { useState } from "react";

type Session = {
  id: string;
  has_metadata: boolean;
 };

 type SessionListProps = {
  sessions: Session[];
  selectedSession: string | null;
  onSelectSession: (sessionId: string) => void;
 };

 export default function SessionList({
    sessions,
    selectedSession,
    onSelectSession,
 }: SessionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
    return (
        <aside className="flex h-180 w-80 shrink-0 flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sessions</h2>
              <p className="mt-1 text-xs text-gray-500">
                {sessions.length} recorded sessions
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {sessions.length}
            </span>
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search sessions..."
            className="mb-4 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div className="flex-1 space-y-2 overflow-y-auto pr-2">
            {sessions.filter((session) => 
            session.id.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((session) => {
              const isSelected = selectedSession === session.id;
              
              return(
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isSelected 
                        ? "bg-white" 
                        : session.has_metadata
                        ? "bg-emerald-500"
                        : "bg-gray-300"
                    }`} 
                  />

                  <div>
                    <p className="text-sm font-semibold">{session.id}</p>

                    <p
                      className={`mt-0.5 text-xs ${
                        isSelected ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {session.has_metadata
                        ? "Ready"
                        : "No metadata"
                      }
                    </p>
                  </div>
                </div>
              </button>
                );
                })}
          </div>
        </aside>
    );
 }

