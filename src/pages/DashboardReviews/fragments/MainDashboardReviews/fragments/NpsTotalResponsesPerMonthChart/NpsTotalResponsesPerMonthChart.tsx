import Chart from "@/components/ui/chart";
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { ApexOptions } from "apexcharts";
import { useNpsTotalResponsesPerMonthChart } from "./NpsTotalResponsesPerMonthChart.hook";

export const NpsTotalResponsesPerMonthChart = () => {
  const { unitSelected } = useReviewsContext();
  const { chartData } = useNpsTotalResponsesPerMonthChart();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2">
      <h2 className="text-base sm:text-lg font-bold mb-4">
        NPS e Respostas por Mês {unitSelected && `| Unidade ${unitSelected}`}
      </h2>
      <Chart
        options={chartData.options as unknown as ApexOptions}
        series={chartData.series}
        type="line"
        width="100%"
        height="300px"
      />
    </div >
  );
};
