import React from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import useCurrency from 'hooks/useCurrency';

const Chart = () => {
  const { currency } = useCurrency();

  return (
    <div style={{ height: 500 }}>
      <AdvancedRealTimeChart
        key={currency}
        symbol={`${currency}USDC`}
        theme="dark"
        locale="en"
        autosize
      />
    </div>
  );
};

export default Chart;
