import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

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
        <section className="flex-1 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Trajectory</h2>

            {trajectory.length === 0 ? (
            <p className="mt-2 text-gray-600">
                Select a session to view trajectory data.
            </p>
            ) : (
                <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trajectory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="y" dot={false} />
                            <Line type="monotone" dataKey="z" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}   
        </section>
    );
}