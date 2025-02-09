/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { format, subMonths } from "date-fns";
import { useEffect, useMemo, useState } from "react";

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
    colors: string[];
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

export function useNpsTotalResponsesPerMonthChart() {
  const { theme } = useTheme();
  const { filteredReviews } = useReviewsContext();

  const initialChartOptions = useMemo<IChartOptions>(() => ({
    colors: ["#1E90FF", "#32CD32"],
    chart: {
      type: "line",
      height: 50,
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: () => { },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val;
      },
      style: {
        fontSize: "12px",
        colors: ["#000"],
      },
    },
    stroke: {
      width: 2,
      colors: ["#1E90FF", "#32CD32"],
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
          colors: "#000",
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
  }), [theme]);

  const [chartData, setChartData] = useState<{
    options: IChartOptions;
    series: ISeries[];
  }>({
    options: initialChartOptions,
    series: [],
  });

  useEffect(() => {
    const currentDate = new Date();
    const months = Array.from({ length: 12 }).map((_, index) => {
      const monthDate = subMonths(currentDate, index);
      return format(monthDate, "yyyy-MM");
    });

    const npsData = months.map((month) => {
      const monthlyReviews = filteredReviews.filter((review) =>
        format(new Date(review.dataCadastro), "yyyy-MM") === month
      );


      const totalReviews = monthlyReviews.length;
      const detractors = monthlyReviews.filter(
        (review) => review.nota >= 0 && review.nota <= 6
      ).length;
      const promoters = monthlyReviews.filter(
        (review) => review.nota === 9 || review.nota === 10
      ).length;

      const nps =
        totalReviews > 0
          ? Math.round(((promoters - detractors) / totalReviews) * 100)
          : 0;

      return nps;
    });

    const responseCounts = months.map((month) => {
      return filteredReviews.filter((review) =>
        format(new Date(review.dataCadastro), "yyyy-MM") === month
      ).length;
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
          categories: months.reverse(),
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
  }, [filteredReviews, theme, initialChartOptions]);

  return { chartData };
}
