import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { IReview } from "@/interfaces/IReview";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

interface useNpsDistributionChartProps {
  filteredReviews: IReview[]
}


export function useNpsDistributionChart({ filteredReviews }: useNpsDistributionChartProps) {
  const { theme } = useTheme();

  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: number[];
    labels: string[];
  }>({
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
              labels: {
                colors: theme === "dark" ? "#ffffff" : "#000000",
              },
            },
          },
        },
        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: "right",
              labels: {
                colors: theme === "dark" ? "#ffffff" : "#000000",
              },
            },
          },
        },
      ],
      legend: {
        labels: {
          colors: theme === "dark" ? "#ffffff" : "#000000",
        },
      },
      tooltip: {
        y: {
          formatter: () => ``,
        },
      },
    },
    series: [],
    labels: [],
  });

  useEffect(() => {
    const ratingCounts = Array(11).fill(0);

    filteredReviews.forEach((review) => {
      const rating = Math.round(review.nota);
      ratingCounts[rating] += 1;
    });

    const labelsWithCounts = ratingCounts.map((count, index) => {
      return `Nota ${index}: ${count} ${count === 1 ? "pessoa" : "pessoas"}`;
    });

    setChartData({
      series: ratingCounts,
      labels: labelsWithCounts,
      options: {
        ...chartData.options,
        labels: labelsWithCounts,
        legend: {
          ...chartData.options.legend,
          labels: {
            colors: theme === "dark" ? "#ffffff" : "#000000",
          },
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredReviews, theme]);

  return { chartData };
}