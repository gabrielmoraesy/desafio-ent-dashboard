import { useTheme } from "@/contexts/ThemeProvider/theme-provider";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

interface IReview {
  unidade: string;
  nota: number;
}

interface useNpsDistributionChartProps {
  reviews: IReview[];
}

export function useNpsDistributionChart({ reviews }: useNpsDistributionChartProps) {
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

    reviews.forEach((review) => {
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
  }, [reviews, theme]);

  return { chartData };
}
