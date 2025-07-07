import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function MusicalTimeline({ history }) {
    const data = history.reduce((acc, track) => {
    const found = acc.find((d) => d.year === track.date);

    if (found) {
        found.count += 1;
    } else {
        acc.push({ year: track.date, count: 1 });
    }
    return acc;
    }, []);

    data.sort((a, b) => a.year - b.year);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <h2 className="text-xl text-center text-white mb-4">Líneas de Tiempo Musical 🎶</h2>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="Canciones favoritas" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
}

export default MusicalTimeline;
