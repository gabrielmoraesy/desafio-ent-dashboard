/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { useEffect, useState } from "react";

interface IChartOptions {
  colors: string[];
  chart: {
    type: "line";
    height: number;
    stacked: boolean;
    toolbar: {
      show: boolean;
    };
    events: {
      dataPointSelection: (event: any, chartContext: any, config: any) => void;
    };
  };
  dataLabels: {
    enabled: boolean;
    formatter: (val: any) => string;
    style: {
      fontSize: string;
      colors: string[];
    };
  };
  stroke: {
    width: number;
    colors: string;
  };
  xaxis: {
    categories: string[];
    labels: {
      formatter: (val: any) => string;
      style: {
        colors: string;
        fontSize: string;
      };
    };
  };
  yaxis: {
    title: {
      text: string | undefined;
    };
    labels: {
      show: boolean;
      style: {
        colors: string;
        fontSize: string;
      };
      offsetY: number;
    };
  };
  tooltip: {
    y: {
      formatter: (val: any) => string;
    };
  };
  fill: {
    opacity: number;
  };
  legend: {
    position: "top" | "bottom" | "left" | "right";
    horizontalAlign: "left" | "center" | "right";
    offsetX: number;
    offsetY: number;
    labels: {
      colors: string;
    };
  };
  grid: {
    show: boolean;
  };
}

interface ISeries {
  name: string;
  data: number[];
}

interface MonthlyData {
  month: string;
  nps: number;
  responses: number;
}

interface useNpsTotalResponsesPerMonthChartProps {
  monthlyData: MonthlyData[];
  unitSelected: string | null;
}

export function useNpsTotalResponsesPerMonthChart({
  monthlyData,
  unitSelected,
}: useNpsTotalResponsesPerMonthChartProps) {
  const { theme } = useTheme();

  const initialChartOptions: IChartOptions = {
    colors: ["#3C83C4", "#FFBD33", "#33FF57"],
    chart: {
      type: "line",
      height: 50,
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: () => { }, // Pode ser utilizado para ações futuras
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val;
      },
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      width: 2,
      colors: "#000",
    },
    xaxis: {
      categories: [],
      labels: {
        formatter: function (val: any) {
          return val;
        },
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        show: true,
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
        offsetY: 10,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
      offsetY: 10,
      labels: {
        colors: theme === "dark" ? "#fff" : "#000",
      },
    },
    grid: {
      show: false,
    },
  };

  const [chartData, setChartData] = useState<{
    options: IChartOptions;
    series: ISeries[];
  }>({
    options: initialChartOptions,
    series: [],
  });

  useEffect(() => {
    const filteredData = unitSelected
      ? monthlyData.filter((data) => data.unit === unitSelected)
      : monthlyData;

    const months = [...new Set(filteredData.map((data) => data.month))];
    const npsData = months.map((month) => {
      const monthData = filteredData.filter((data) => data.month === month);
      const totalNps = monthData.reduce((acc, curr) => acc + curr.nps, 0);
      return totalNps / monthData.length || 0;
    });

    const responseCounts = months.map((month) => {
      return filteredData
        .filter((data) => data.month === month)
        .reduce((acc, curr) => acc + curr.responses, 0);
    });

    const axisColor = theme === "dark" ? "#fff" : "#000";

    setChartData({
      series: [
        { name: "NPS", data: npsData },
        { name: "Total Respostas", data: responseCounts },
      ],
      options: {
        ...initialChartOptions,
        xaxis: {
          categories: months,
          labels: {
            ...initialChartOptions.xaxis.labels,
            style: { ...initialChartOptions.xaxis.labels.style, colors: axisColor },
          },
        },
        legend: {
          ...initialChartOptions.legend,
          labels: { colors: axisColor },
        },
      },
    });
  }, [monthlyData, unitSelected, theme]);

  return { chartData };
}
