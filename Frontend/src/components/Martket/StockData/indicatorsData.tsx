import { useEffect, useState } from "react";
import { InfoCard } from "../info-card";
import { getIndicators } from "@/Utils/ApiUtils";
import { FinancialIndicators, referenceList } from "@/types/Indicators.type";
import React from "react";

interface IndicatorsDataProps {
  data: FinancialIndicators;
  ticker: string;
}

export function IndicatorsData({ ticker, data }: IndicatorsDataProps) {
  type FinancialIndicatorKey = keyof FinancialIndicators;
  console.log(data)
  return (
    <div className="info grid grid-cols-4 grid-rows-2 items-center justify-center gap-4 p-4">
      {data &&
        Object.keys(data)
          .map((key: string) => key as FinancialIndicatorKey)
          .map((key: FinancialIndicatorKey) => {
            return data[key] && key !== "_id" ? (
              <InfoCard key={key} infoName={referenceList[key]?.fullName!} infoValue={data[key].actual === 0 ? "-" : data[key].actual.toFixed(3)} message={referenceList[key]?.info}/>
            ) : (
              <React.Fragment key={key} />
            );
          })}
    </div>
  );
}
