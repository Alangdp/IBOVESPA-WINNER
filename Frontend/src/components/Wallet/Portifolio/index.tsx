import { ResponsiveContainer, PieChart, Tooltip, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PieChartProps {
  name: string;
  value: number;
}

interface CustomLabelProps {
  data: PieChartProps[];
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface PortifolioChart {
  data: PieChartProps[];
}

const PortifolioChart = ({ data }: PortifolioChart) => {
  const renderCustomLabel = ({ cx, cy }: CustomLabelProps) => {
    return (
      <text
        x={cx}
        y={cy}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "16px", color: "#fff" }}
      >
        {data.reduce((acc, entry) => acc + entry.value, 0)}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = ((value / totalValue) * 100).toFixed(2);
      console.log(percentage);
      return (
        <div
          className="custom-tooltip "
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="text-black">{name}</p>
          <p className="text-black">{`${percentage}%`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={"50%"}>
      <PieChart>
        <Tooltip content={CustomTooltip} animationEasing="ease-in-out" />
        <Pie
          style={{ outline: "none" }}
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={renderCustomLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { PortifolioChart }