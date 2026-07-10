import {LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

type TrajectoryPoint = {
    x: number;
    y: number;
    z: number;
};

type TrajectoryChartProps = {
    trajectory: TrajectoryPoint[];
};

export default function TrajectoryChart({
    trajectory,
}: TrajectoryChartProps) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Trajectory</h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Position changes across the recorded session
                    </p>
                </div>

                {trajectory.length > 0 && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {trajectory.length.toLocaleString()} points
                    </span>
                )}
                </div>

                {trajectory.length === 0 ? (
                    <div className="mt-6 flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-500">
                    Select a session to view trajectory data.
                </p>
                </div>
                ) : (
                    <div className="mt-6 h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                                data={trajectory}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />

                              <XAxis 
                                dataKey="x"
                                tickCount={6}
                                interval="preserveStartEnd"
                                tickFormatter={(value: number) => value.toFixed(2)}
                                tick={{ fontSize: 12}}
                                tickLine={false}
                                axisLine={false}
                                
                              />
                              
                              <YAxis 
                                tick={{ fontSize: 12}}
                                tickLine={false}
                                axisLine={false}
                              />

                              <Tooltip 
                                formatter={(value) =>
                                    typeof value === "number" ? value.toFixed(4) : value
                                }
                              />

                              <Legend />

                              <Line 
                                type="monotone"
                                dataKey="y"
                                name="Y position"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                              />

                              <Line 
                                type="monotone"
                                dataKey="z"
                                name="Z position"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}   
        </section>
    );
}