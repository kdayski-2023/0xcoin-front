import ChartPreview from "./chartPreview/QuickStat";
import { chartPreviewsAttributes } from "./chartPreviewsAttributes.data";

const ChartPreviews = () => {
    return (
        <ul className="row quick-stats">
            {chartPreviewsAttributes.map(chartPreview => (
                <ChartPreview key={chartPreview.id} chartPreview={chartPreview} />
            ))}
        </ul>
    );
}

export default ChartPreviews;