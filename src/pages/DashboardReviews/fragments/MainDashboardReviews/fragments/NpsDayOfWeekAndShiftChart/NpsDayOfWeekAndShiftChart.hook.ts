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
  plotOptions: {
    bar: {
      horizontal: boolean,
      columnWidth: string,
      borderRadius: number,
      borderRadiusApplication: string
    },
  },
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

interface useNpsDayOfWeekAndShiftChartProps {
  filteredReviews: IReview[]
}

export function useNpsDayOfWeekAndShiftChart({ filteredReviews }: useNpsDayOfWeekAndShiftChartProps) {
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end'
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

  const [NpsDayOfWeekAndShiftChartData, setNpsDayOfWeekAndShiftChartData] = useState<{
    options: IChartOptions;
    series: ISeries[];
  }>({
    options: initialChartOptions,
    series: [
      { name: "NPS", data: [] },
    ],
  });

  const calculateNpsByDayAndShift = () => {
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const shifts = ["8:00-14:00", "14:00-18:00", "18:00-00:00"];
    const npsData: { [key: string]: { promoters: number; detractors: number; total: number } } = {};

    daysOfWeek.forEach((day) => {
      shifts.forEach((shift) => {
        npsData[`${day} ${shift}`] = { promoters: 0, detractors: 0, total: 0 };
      });
    });

    filteredReviews.forEach((review) => {
      const reviewDate = new Date(review.dataCadastro);
      const dayName = daysOfWeek[reviewDate.getDay()];
      const hour = reviewDate.getHours();
      let shift = "";

      if (hour >= 8 && hour < 14) {
        shift = "8:00-14:00";
      } else if (hour >= 14 && hour < 18) {
        shift = "14:00-18:00";
      } else if (hour >= 18 && hour < 24) {
        shift = "18:00-00:00";
      }

      if (shift) {
        const key = `${dayName} ${shift}`;

        if (review.nota >= 9) {
          npsData[key].promoters += 1;
        } else if (review.nota >= 7) {
          npsData[key].total += 1;
        } else {
          npsData[key].detractors += 1;
        }

        npsData[key].total += 1;
      }
    });

    const npsByDayAndShift = daysOfWeek.flatMap((day) => {
      return shifts.map((shift) => {
        const { promoters, detractors, total } = npsData[`${day} ${shift}`];
        const nps = total > 0 ? ((promoters - detractors) / total) * 100 : 0;
        return nps.toFixed(2);
      });
    });

    return npsByDayAndShift;
  };

  useEffect(() => {
    const npsByDayAndShift = calculateNpsByDayAndShift();

    const axisColor = theme === "dark" ? "#fff" : "#000";

    setNpsDayOfWeekAndShiftChartData((prev) => ({
      ...prev,
      series: [
        {
          name: "NPS",
          data: npsByDayAndShift.map((nps) => parseFloat(nps)),
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: [
            "Dom 8:00-14:00", "Dom 14:00-18:00", "Dom 18:00-00:00",
            "Seg 8:00-14:00", "Seg 14:00-18:00", "Seg 18:00-00:00",
            "Ter 8:00-14:00", "Ter 14:00-18:00", "Ter 18:00-00:00",
            "Qua 8:00-14:00", "Qua 14:00-18:00", "Qua 18:00-00:00",
            "Qui 8:00-14:00", "Qui 14:00-18:00", "Qui 18:00-00:00",
            "Sex 8:00-14:00", "Sex 14:00-18:00", "Sex 18:00-00:00",
            "Sáb 8:00-14:00", "Sáb 14:00-18:00", "Sáb 18:00-00:00"
          ],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredReviews, theme]);

  return {
    NpsDayOfWeekAndShiftChartData,
  };
}
