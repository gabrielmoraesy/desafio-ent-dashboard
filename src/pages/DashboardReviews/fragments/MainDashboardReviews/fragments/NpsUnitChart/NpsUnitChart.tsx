import { ApexOptions } from "apexcharts";
import Chart from "@/components/ui/chart"
import { useNpsUnitChart } from "./NpsUnitChart.hook";
import { FilterX } from "lucide-react";
import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";

interface NpsUnitChartProps {
  npsUnitData: {
    unidade: string;
    nps: string;
  }[];
}

export const NpsUnitChart = ({ npsUnitData }: NpsUnitChartProps) => {
  const { setUnitSelected } = useReviewContext();
  const { NpsUnitChartData } = useNpsUnitChart({ npsUnitData, setUnitSelected });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-lg font-bold mb-4">NPS Por Unidade</h2>
        <FilterX onClick={() => setUnitSelected("")} />
      </div>
      <Chart
        options={NpsUnitChartData.options as unknown as ApexOptions}
        series={NpsUnitChartData.series}
        type="bar"
        width="100%"
        height="273px"
      />
    </div>
  );
};
