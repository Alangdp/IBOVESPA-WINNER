import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis } from "recharts";

type LineData = {
  value: number;
  name?: string;
};

interface SimpleLineChartProps {
  data: LineData[];
} 

export function SimpleLineChart({data}: SimpleLineChartProps) {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data}>

        <Tooltip />
        <XAxis dataKey="name"/>
        <Line
          type="monotone"
          stroke="#3A6FF8"
          dataKey="value"
          dot={false}
          strokeWidth={2.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
