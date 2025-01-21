import React from "react";
import ReactApexCharts from "react-apexcharts";

type BaseChartProps = React.ComponentProps<typeof ReactApexCharts>;

const BaseChart: React.FC<BaseChartProps> = ({ ...props }) => {
  return <ReactApexCharts {...props} />;
};

export default BaseChart

