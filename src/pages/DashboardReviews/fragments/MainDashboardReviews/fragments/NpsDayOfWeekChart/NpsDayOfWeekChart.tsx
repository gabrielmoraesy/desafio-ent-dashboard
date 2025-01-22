import Chart from "@/components/ui/chart";
import { ApexOptions } from "apexcharts";
import { useNpsDayOfWeekChart } from "./NpsDayOfWeekChart.hook";
import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";

export const NpsDayOfWeekChart = () => {
  const { reviews, unitSelected } = useReviewContext();

  const { NpsDayOfWeekChartData } = useNpsDayOfWeekChart(reviews);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-lg font-bold mb-4">Comparação de NPS por Dia da Semana {unitSelected && `| Unidade ${unitSelected}`}</h2>
      </div>
      <Chart
        options={NpsDayOfWeekChartData.options as unknown as ApexOptions}
        series={NpsDayOfWeekChartData.series}
        type="bar"
        width="100%"
        height="273px"
      />
    </div>
  );
};
