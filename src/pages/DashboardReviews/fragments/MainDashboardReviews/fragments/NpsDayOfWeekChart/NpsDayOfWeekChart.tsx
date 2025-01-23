import { useReviews } from "@/api/reviews";
import Chart from "@/components/ui/chart";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";
import { ApexOptions } from "apexcharts";
import { useNpsDayOfWeekChart } from "./NpsDayOfWeekChart.hook";

export const NpsDayOfWeekChart = () => {
  const { unitSelected } = useFiltersContext();
  const { data: reviews = [] } = useReviews();

  const { NpsDayOfWeekChartData } = useNpsDayOfWeekChart(reviews);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-lg font-bold mb-4">Comparação de NPS por Dia da Semana {unitSelected && `| Unidade ${unitSelected}`}</h2>
      </div>
      <Chart
        options={NpsDayOfWeekChartData.options as unknown as ApexOptions}
        series={NpsDayOfWeekChartData.series}
        type="bar"
        width="100%"
        height="100%"
      />
    </div>
  );
};
