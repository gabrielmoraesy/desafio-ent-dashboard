import Chart from "@/components/ui/chart";
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { ApexOptions } from "apexcharts";
import { useNpsDayOfWeekAndShiftChart } from "./NpsDayOfWeekAndShiftChart.hook";

const NpsDayOfWeekAndShiftChart = () => {
  const { unitSelected } = useReviewsContext();
  const { NpsDayOfWeekAndShiftChartData } = useNpsDayOfWeekAndShiftChart();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-3">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-lg font-bold mb-4">Comparação de NPS por turnos da semana {unitSelected && `| Unidade ${unitSelected}`}</h2>
      </div>
      <Chart
        options={NpsDayOfWeekAndShiftChartData.options as unknown as ApexOptions}
        series={NpsDayOfWeekAndShiftChartData.series}
        type="bar"
        width="100%"
        height="273px"
      />
    </div>
  );
};

export default NpsDayOfWeekAndShiftChart
