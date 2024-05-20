import { ChartProps } from "@/types/Chart.type";
import { ButtonSelectable } from "../ButtonSelectable";
import { SimpleLineChart } from "../SimpleChart";
import { SimplifiedDataHistory } from "@/types/History.type";

interface HistoryChartProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<string>;
  history: SimplifiedDataHistory;
}

export default function HistoryChart({
  selectedOption,
  setSelectedOption,
  history,
}: HistoryChartProps) {
  return (
    <div className="graph h-2/3 lg:pb-14 lg:mb-10">
      <div className="options flex items-center justify-between p-4 pb-12">
        <div className="value">
          <p
            className={
              "text-2xl font-semibold " +
              (history.chart.globalRentability > 0
                ? "text-[#1ECB4F]"
                : "text-[#F46D22]")
            }
          >
            {(history.chart.globalRentability * 100).toFixed(2) + "%"}
          </p>
        </div>

        <div className="buttons flex gap-2 text-white">
          <ButtonSelectable
            text="1d"
            selectedOption={selectedOption}
            setter={setSelectedOption}
          />
          <ButtonSelectable
            text="1w"
            selectedOption={selectedOption}
            setter={setSelectedOption}
          />
          <ButtonSelectable
            text="1y"
            selectedOption={selectedOption}
            setter={setSelectedOption}
          />
        </div>
      </div>
      <SimpleLineChart
        x={true}
        y={true}
        interval={120}
        paddingX={{ left: 10, right: 10 }}
        margin={{ right: 80 }}
        data={Object.keys(history.historyData)
          .filter((date) => {
            const data = history.historyData[date].chart;
            return data?.globalRentability !== 0
              ? data?.globalRentability
              : undefined;
          })
          .map((date) => {
            const data = history.historyData[date].chart;
            return {
              value: Number((data!.globalRentability * 100).toFixed(2)),
              name: date,
            };
          })}
      />
    </div>
  );
}
