import Chart from "@/components/ui/chart";
import { ApexOptions } from "apexcharts";
import { FilterX } from "lucide-react";
import { useNpsTotalResponsesPerMonthChart } from "./NpsTotalResponsesPerMonthChart.hook";
import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";

interface MonthlyData {
  month: string;
  unit: string;
  nps: number;
  responses: number;
}

interface NpsTotalResponsesPerMonthChartProps {
  monthlyData: MonthlyData[];
}

export const NpsTotalResponsesPerMonthChart = ({
  monthlyData,
}: NpsTotalResponsesPerMonthChartProps) => {
  const { unitSelected, setUnitSelected } = useReviewContext();
  const { chartData } = useNpsTotalResponsesPerMonthChart({
    monthlyData,
    unitSelected,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-lg font-bold mb-4">
          NPS e Respostas por Mês
        </h2>
        <FilterX
          className="cursor-pointer"
          onClick={() => setUnitSelected("")}
        />
      </div>
      <Chart
        options={chartData.options as unknown as ApexOptions}
        series={chartData.series}
        type="line"
        width="100%"
        height="300px"
      />
    </div>
  );
};
