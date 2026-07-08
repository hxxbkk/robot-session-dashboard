type Summary = {
  id: string;
  frames: number;
  duration_sec: number;
  keyframes: number;
  lost_frames: number;
};

type SummaryCardProps = {
  summary: Summary | null;
};


export default function SummaryCard({
  summary,
}: SummaryCardProps) {
    return (
        <section className="flex-1 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Session Summary</h2>
          {summary ? (
            <div className="mt-4 space-y-2">
              <p>Frames: {summary.frames}</p>
              <p>Duration: {summary.duration_sec}</p>
              <p>Keyframes: {summary.keyframes}</p>
              <p>Lost Frames: {summary.lost_frames}</p>
            </div>
          ): (
          <p className="mt-2 text-gray-600">
            Select a session to view trajectory and summary metrics.
          </p>)}
        </section>
    )
   
}

