import TradingViewWidget, { Themes } from "react-tradingview-widget";
const Chart = () => {
    return (
        <div style={{ height: 500 }}>
            <TradingViewWidget
                symbol="NASDAQ:AAPL"
                theme={Themes.DARK}
                locale="en"
                autosize
            />
        </div>
    );
}

export default Chart;