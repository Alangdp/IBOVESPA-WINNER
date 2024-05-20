import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { number } from "zod";

type LineData = {
  value: number;
  name?: string;
};

interface SimpleLineChartProps {
  margin?: {
    left?: number,
    right?: number
    top?: number,
    bottom?: number
  },

  paddingX?: {
    left?: number,
    right?: number
    top?: number,
    bottom?: number
  },
  interval?: number;
  className?: string;
  data: LineData[];
  x?: boolean;
  y?: boolean;
  xName?: string;
  yName?: string;
} 

export function SimpleLineChart({data, className, x, y, xName, yName, interval, margin, paddingX}: SimpleLineChartProps) {
  return (
    <ResponsiveContainer height="100%" width="100%" className={className}>
      <LineChart data={data} margin={margin}>
        <Tooltip />
        {y ? <YAxis domain={['auto', 'auto']}/> : null}
        {x ? <XAxis padding={paddingX} dataKey={xName ? xName : "name"} interval={interval || 30} style={{
          fontSize: "0.8rem",
          fontFamily: "Roboto"
        }} dx={30}/> : null}
        <Line
          type="monotone"
          stroke="#3A6FF8"
          dataKey={yName ? yName : "value"}
          dot={false}
          strokeWidth={2.5}
        />
      </LineChart> 
    </ResponsiveContainer>
  );
}
