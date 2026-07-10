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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Session Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Key metrics for the selected robot session
          </p>
        </div>

        {summary && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Loaded
          </span>
        )}
      </div>

      {summary ? (
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <MetricCard
            label="Frames"
            value={summary.frames.toLocaleString()}
          />

          <MetricCard
            label="Duration"
            value={`${summary.duration_sec}s`}
          />

          <MetricCard
            label="Keyframes"
            value={summary.keyframes.toLocaleString()}
          />

          <MetricCard
            label="Lost Frames"
            value={summary.lost_frames.toLocaleString()}
          />
        </div>
      ) : (
        <div className="mt-6 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
          <p className="text-sm text-gray-500">
            Select a session to view summary metrics.
          </p>
        </div>
      )}
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-950">
        {value}
      </p>
    </div>
  );
}
   


