import { Suspense, useEffect, useState } from "react";
import { InfoCard } from "../info-card";
import axios from "axios";
import { getDre } from "@/Utils/ApiUtils";
import { DreData } from "@/types/Dre.type";
import { Loading } from "@/components/Loading";

interface GridStockPageProps {
  ticker: string;
}

export function GridStockPage({ ticker }: GridStockPageProps) {
  const [data, setData] = useState<DreData>();

  async function getData(ticker: string) {
    const data = await getDre(ticker);
    setData(data);
  }

  useEffect(() => {
    if(!data) getData(ticker);
  }, [ticker]);

  return (
    <div className="info grid grid-cols-4 grid-rows-2 items-center justify-center gap-4 p-4">

      <InfoCard
        infoName="Valor de Mercado"
        infoValue={data?.marketValue ?? "-"}
        brl={true}
      />

      <InfoCard infoName="Rendimento do Dividendo (Indicado)" infoValue={data?.dividendYield ?? "-"} />
      <InfoCard
        infoName="Razão Preço/Lucro(12M)"
        infoValue={data?.p_l.toFixed(2) ?? "-"}
      />
      <InfoCard infoName="EPS Básico (12M)" infoValue={data?.eps.toFixed(2) ?? "0"} brl={true} />
      {/* { METADE } */}
      <InfoCard infoName="Patrimonio Líquido" infoValue={data?.netProfit ?? "-"} brl={true} />
      <InfoCard infoName="Receita" infoValue={data?.profit ?? "-"} brl={true} />
      <InfoCard infoName="Flutuação da Ação" infoValue={data?.stockVariability.toFixed(0) ?? "-"} brl={true} />
      <InfoCard infoName="Beta(1A)" infoValue={data?.beta.toFixed(0) ?? "-"} />
    </div>
  );
}
