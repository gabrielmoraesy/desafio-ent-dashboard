import Chart from "@/components/ui/chart";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";
import { ApexOptions } from "apexcharts";
import { FilterX } from "lucide-react";
import { useNpsUnitChart } from "./NpsUnitChart.hook";

interface NpsUnitChartProps {
  npsUnitData: {
    unidade: string;
    nps: string;
  }[];
}

export const NpsUnitChart = ({ npsUnitData }: NpsUnitChartProps) => {
  const { setUnitSelected } = useFiltersContext();
  const { NpsUnitChartData } = useNpsUnitChart({ npsUnitData });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2">
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
