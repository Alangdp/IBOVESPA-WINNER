import { FinancialData, FinancialIndicators } from "@/types/Indicators.type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import React from "react";

interface HistoryModalProps {
  children?: React.ReactNode;
  indicatorName: string;
  indicatorValues: FinancialIndicators;
  indicatorKey: keyof FinancialIndicators;
}

const mockData = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 100)
);

const calculateAverage = (data: { value: number }[]): number => {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  return sum / data.length;
};

const generateReferenceLines = (
  average: number,
  numLines: number
): JSX.Element[] => {
  const lines: JSX.Element[] = [];
  for (let i = -numLines; i <= numLines; i++) {
    if (i === 0) {
      lines.push(
        <ReferenceLine
          key={`ref-${i}`}
          y={average}
          stroke="red"
          strokeDasharray="3 3"
        />
      );
      continue;
    }
    lines.push(
      <ReferenceLine
        key={`ref-${i}`}
        y={average + average * (i * 0.5)}
        stroke="gray"
        strokeDasharray="3 3"
      />
    );
  }
  return lines;
};

function getHighestIndex(data: { value: number }[]): number {
  let highest = 0;
  data.forEach((item, index) => {
    if (item.value > data[highest].value) {
      highest = index;
    }
  });
  return highest;
}

function getLowestIndex(data: { value: number }[]): number {
  let lowest = 0;
  data.forEach((item, index) => {
    if (item.value < data[lowest].value) {
      lowest = index;
    }
  });
  return lowest;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { valor: string | number; data: string } }[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-df text-white p-2 rounded-lg">
        <p>
          <span className="font-bold">Data: </span>
          {label}
        </p>
        <p>
          <span className="font-bold">Valor: </span>
          {dataPoint.valor}
        </p>
      </div>
    );
  }

  return null;
};

export default function HistoryModal({
  indicatorName,
  indicatorValues,
  children,
  indicatorKey,
}: HistoryModalProps) {
  const data = mockData.map((value, index) => ({
    value,
    name: index.toString(),
  }));

  const indicatorData = indicatorValues[indicatorKey] as FinancialData;
  if (!indicatorData) return null;
  const average = indicatorData.avg;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-df text-white min-w-[50vw] max-h-[50vh]">
        <DialogHeader className="bg-df text-bl font-bold text-xl p-4 rounded-t">
          <DialogTitle>{indicatorName} - Histórico</DialogTitle>
        </DialogHeader>
        <div className="w-full p-4 h-fit bg-df brightness-150 divide-x divide-zinc-700  flex ">
          <h4 className="text-center h-fit w-40 px-2 flex flex-col">
            <h4>Atual</h4> <p>{indicatorData.actual}</p>
          </h4>
          <h4 className="text-center h-fit w-40 px-2 flex flex-col">
            <h4>Média</h4> <p>{average.toFixed(2)}</p>
          </h4>
          <h4 className="text-center h-fit w-40 px-2 flex flex-col">
            <h4>Mínimo</h4>
            <span className="flex justify-center divide-x">
              <p className="px-2">
                {" "}
                {indicatorData.olds[
                  getLowestIndex(indicatorData.olds)
                ].value.toFixed(2)}
              </p>
              <p className="px-2">
                {" "}
                {indicatorData.olds[getLowestIndex(indicatorData.olds)].date}
              </p>
            </span>{" "}
          </h4>
          <h4 className="text-center h-fit w-40 px-2 flex flex-col">
            <h4>Máximo</h4>{" "}
            <span className="flex justify-center divide-x">
              <p className="px-2">
                {" "}
                {indicatorData.olds[
                  getHighestIndex(indicatorData.olds)
                ].value.toFixed(2)}
              </p>
              <p className="px-2">
                {" "}
                {indicatorData.olds[getHighestIndex(indicatorData.olds)].date}
              </p>
            </span>{" "}
          </h4>
        </div>
        <div className="p-4 h-full">
          <ResponsiveContainer height={300}>
            <LineChart
              data={indicatorData.olds.reverse().map((old) => {
                return {
                  valor: old.value.toFixed(2),
                  data: old.date,
                };
              })}
            >
              <XAxis dataKey="data" tickCount={data.length} />
              <YAxis
                tickCount={20}
                domain={[
                  indicatorData.olds[getLowestIndex(indicatorData.olds)].value,
                  indicatorData.olds[getHighestIndex(indicatorData.olds)].value,
                ]}
                allowDataOverflow={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="linear"
                dataKey="valor"
                stroke="#8884d8"
                dot={false}
              />
              {generateReferenceLines(average, 3)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
