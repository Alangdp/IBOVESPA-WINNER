import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";

type LineData = {
  value: number;
  name?: string;
};

interface SimpleLineChartProps {
  className?: string;
  data: LineData[];
  x?: boolean
  y?: boolean
} 

export function SimpleLineChart({data, className, x, y}: SimpleLineChartProps) {
  return (
    <ResponsiveContainer height="100%" width="100%" className={className}>
      <LineChart data={data} margin={{left: 20, right: 20}}>
        <Tooltip />
        {y ? <YAxis /> : null}
        {x ? <XAxis dataKey="name" interval={5} style={{
          fontSize: "0.8rem",
          fontFamily: "Roboto"
        }}/> : null}
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
