import { PriceData, Price } from "@/types/Price.type";
import { useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import TimeOptions from "../timeOptions";

interface PriceChartProps {
  priceData: PriceData | null;
}

interface TimeLimits {
  [key: string]: number;
}

const timeLimits: TimeLimits = {
  "1week": 7,
  "1month": 30,
  "3month": 90,
  "6month": 180,
  "1year": 365,
};

export default function PriceChart({ priceData }: PriceChartProps) {
  const [interval, setInterval] = useState<string>("1year");

  if (!priceData) {
    return <div>No price data available</div>;
  }

  const pricesFiltered = priceData.price
    .slice()
    .reverse()
    .filter((_, index) => index <= timeLimits[interval]);

  const growthOrDown = (priceData: Price[] | null) => {
    if (!priceData || priceData.length === 0) return "#fff";

    const startPrice = priceData[0].price;
    const endPrice = priceData[priceData.length - 1].price;
    const priceDifference = endPrice - startPrice;

    if (priceDifference < 0) {
      return "#F46D22"; // Queda
    }
    return "#1ECB4F"; // Crescimento
  };

  return (
    <div className="graph w-full flex flex-col justify-center items-center">
      <ResponsiveContainer
        width="100%"
        height={400}
        className="p-1 z-10 bg-zinc-700 rounded-df font-bold"
      >
        <LineChart
          width={730}
          height={250}
          data={pricesFiltered.reverse().map((item) => ({
            date: item.date.split(" ")[0],
            price: item.price,
          }))}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            interval={Math.round(
              timeLimits[interval] / (timeLimits[interval] < 91 ? 6 : 9)
            )}
          />
          <YAxis tickCount={10} domain={["auto", "auto"]} />
          <Tooltip trigger="hover" />
          <Line
            type="monotone"
            dataKey="price"
            stroke={growthOrDown(pricesFiltered)}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <TimeOptions interval={interval} setInterval={setInterval} />
    </div>
  );
}
