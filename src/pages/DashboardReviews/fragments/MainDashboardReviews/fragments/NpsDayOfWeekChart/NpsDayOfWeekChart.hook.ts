/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { IReview } from "@/interfaces/IReview";
import { useEffect, useState } from "react";

interface IChartOptions {
  colors: string[];
  chart: {
    type: "bar";
    height: number;
    stacked: boolean;
    toolbar: {
      show: boolean;
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

interface useNpsDayOfWeekChartProps {
  filteredReviews: IReview[]
}

export function useNpsDayOfWeekChart({ filteredReviews }: useNpsDayOfWeekChartProps) {

  const { theme } = useTheme();

  const initialChartOptions: IChartOptions = {
    colors: ["#3C83C4", "#FFBD33", "#33FF57", "#1f1f1f"],
    chart: {
      type: "bar",
      height: 50,
      stacked: true,
      toolbar: {
        show: false,
      }
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
      width: 1,
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

  const [NpsDayOfWeekChartData, setNpsDayOfWeekChartData] = useState<{
    options: IChartOptions;
    series: ISeries[];
  }>({
    options: initialChartOptions,
    series: [
      { name: "NPS", data: [] },
    ],
  });

  const calculateNpsByDay = (reviews: IReview[]) => {
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const npsData: { [key: string]: { promoters: number; detractors: number; total: number } } = {};

    daysOfWeek.forEach((day) => {
      npsData[day] = { promoters: 0, detractors: 0, total: 0 };
    });

    reviews.forEach((review) => {
      const reviewDate = new Date(review.dataCadastro);
      const dayName = daysOfWeek[reviewDate.getDay()];

      if (review.nota >= 9) {
        npsData[dayName].promoters += 1;
      } else if (review.nota >= 7) {
        npsData[dayName].total += 1;
      } else {
        npsData[dayName].detractors += 1;
      }

      npsData[dayName].total += 1;
    });

    const npsByDay = daysOfWeek.map((day) => {
      const { promoters, detractors, total } = npsData[day];
      const nps = total > 0 ? ((promoters - detractors) / total) * 100 : 0;
      return nps.toFixed(2);
    });

    return npsByDay;
  };

  useEffect(() => {
    const npsByDayOfWeek = calculateNpsByDay(filteredReviews);

    const axisColor = theme === "dark" ? "#fff" : "#000";

    setNpsDayOfWeekChartData((prev) => ({
      ...prev,
      series: [
        {
          name: "NPS",
          data: npsByDayOfWeek.map((nps) => parseFloat(nps)),
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          labels: {
            ...prev.options.xaxis.labels,
            style: {
              colors: axisColor,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          ...prev.options.yaxis,
          labels: {
            ...prev.options.yaxis.labels,
            style: {
              colors: axisColor,
              fontSize: "12px",
            },
          },
        },
        legend: {
          ...prev.options.legend,
          labels: {
            colors: axisColor,
          },
        },
      },
    }));
  }, [filteredReviews, theme]);

  return {
    NpsDayOfWeekChartData,
  };
}
