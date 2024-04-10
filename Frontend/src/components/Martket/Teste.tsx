// TradingViewWidget.tsx
import React, { useEffect, useRef } from 'react';

interface Symbol {
  name: string;
  data: string;
}

interface TradingViewProps {
  symbols: Symbol[];
  width: number;
  height: number;
}

const TradingViewWidget: React.FC<TradingViewProps> = ({ symbols, width, height }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: symbols.map(symbol => [symbol.name, symbol.data]),
      width,
      height,
    });
    if (container.current) container.current.appendChild(script);
    return () => {
      if (container.current) container.current.removeChild(script);
    };
  }, [symbols, width, height]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default TradingViewWidget;
