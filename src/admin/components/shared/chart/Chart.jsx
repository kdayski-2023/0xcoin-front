import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

import React from 'react';

const Chart = () => {
  return (
    <div style={{ height: 500 }}>
      <AdvancedRealTimeChart
       symbol="BTCUSDC"
       theme={'dark'}
       locale="en"
       autosize></AdvancedRealTimeChart>
    </div>
  );
};

export default Chart;
