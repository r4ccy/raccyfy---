import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function MusicalTimeline({ history, genresPerYear }) {
    if (!history || history.length === 0) {
        return <p style={{ color: "white", textAlign: "center" }}>Cargando gráfica...</p>;
    }

    const data = history.reduce((acc, track) => {
        const year = track.date;
        let existing = acc.find((d) => d.year === year);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({
                year,
                count: 1,
                genre: genresPerYear?.[year] || "N/A",
            });
        }
        return acc;
    }, []);

    data.sort((a, b) => a.year - b.year);

    return (
        <div style={{ width: "100%", height: 500 }}>
            <h2 className="text-2xl text-center text-white mb-6">Líneas de Tiempo Musical 🎶</h2>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="year"
                        stroke="#ccc"
                        tick={{ fontSize: 14, fill: "#ccc" }}
                        label={{ value: "Año", position: "insideBottom", offset: -5, fill: "#ccc" }}
                    />
                    <YAxis
                        stroke="#ccc"
                        tick={{ fontSize: 14, fill: "#ccc" }}
                        label={{
                            value: "Canciones",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                            fill: "#ccc",
                        }}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const { count, genre } = payload[0].payload;
                                return (
                                    <div className="bg-black p-2 border border-white rounded">
                                        <p>Año: {label}</p>
                                        <p>Canciones: {count}</p>
                                        <p>Género favorito: {genre}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: 14, color: "#fff" }} />
                    <Line
                        type="monotone"
                        dataKey="count"
                        name="Canciones favoritas"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MusicalTimeline;
