/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { IReview } from "@/interfaces/IReview";
import { useEffect, useMemo, useState } from "react";

interface IChartOptions {
  colors: string[];
  chart: {
    type: "bar";
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

export function useNpsUnitChart() {
  const { setUnitSelected, filteredReviews } = useReviewsContext();
  const { theme } = useTheme();

  const reviewsByUnit = useMemo(() => {
    return filteredReviews.reduce((acc, review) => {
      const { unidade } = review;
      if (!acc[unidade]) {
        acc[unidade] = [];
      }
      acc[unidade].push(review);
      return acc;
    }, {} as Record<string, IReview[]>);
  }, [filteredReviews]);

  const npsUnitData = useMemo(() => {
    return Object.entries(reviewsByUnit).map(([unidade, filteredReviews]) => {
      const totalReviews = filteredReviews.length;
      const detratores = filteredReviews.filter(review => review.nota >= 1 && review.nota <= 6).length;
      const promotores = filteredReviews.filter(review => review.nota >= 9 && review.nota <= 10).length;

      const nps = totalReviews
        ? ((promotores / totalReviews) * 100 - (detratores / totalReviews) * 100).toFixed(2)
        : "0";

      return { unidade, nps };
    });
  }, [reviewsByUnit]);

  const initialChartOptions: IChartOptions = {
    colors: ["#3C83C4", "#FFBD33", "#33FF57", "#1f1f1f"],
    chart: {
      type: "bar",
      height: 50,
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: function (
          _event: any,
          _chartContext: any,
          config: any
        ) {
          const { dataPointIndex } = config;
          const selectedUnit = config.w.config.xaxis.categories[dataPointIndex];
          setUnitSelected(selectedUnit);
        },
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

  const [NpsUnitChartData, setNpsUnitChartData] = useState<{
    options: IChartOptions;
    series: ISeries[];
  }>({
    options: initialChartOptions,
    series: [
      { name: "NPS", data: [] },
    ],
  });

  useEffect(() => {
    if (npsUnitData && npsUnitData.length > 0) {
      const axisColor = theme === "dark" ? "#fff" : "#000";

      setNpsUnitChartData((prev) => ({
        ...prev,
        series: [
          {
            name: "NPS",
            data: npsUnitData.map((unit) => parseFloat(unit.nps) || 0),
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: npsUnitData.map((unit) => unit.unidade || "N/A"),
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
    }
  }, [npsUnitData, theme]);

  return {
    NpsUnitChartData,
  };
}
