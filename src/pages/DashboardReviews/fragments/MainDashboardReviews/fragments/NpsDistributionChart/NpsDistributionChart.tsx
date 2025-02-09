import Chart from "@/components/ui/chart";
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { ApexOptions } from "apexcharts";
import { useNpsDistributionChart } from "./NpsDistributionChart.hook";

const NpsDistributionChart = () => {
  const { unitSelected } = useReviewsContext();
  const { chartData } = useNpsDistributionChart();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1">
      <h2 className="text-base sm:text-lg font-bold mb-4">Distribuição de Notas {unitSelected && `| Unidade ${unitSelected}`}</h2>
      <Chart
        options={chartData.options as unknown as ApexOptions}
        series={chartData.series}
        type="pie"
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default NpsDistributionChart
