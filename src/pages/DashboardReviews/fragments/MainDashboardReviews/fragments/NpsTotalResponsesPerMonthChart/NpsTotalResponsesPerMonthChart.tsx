import React from 'react';
import ApexCharts from 'react-apexcharts';
import { IReview } from '@/interfaces/IReview';
import { useNpsTotalResponsesPerMonth } from './NpsTotalResponsesPerMonthChart.hook';

interface NpsTotalResponsesPerMonthChartProps {
  reviews: IReview[];
  unidadeSelecionada: string | null;
}

export const NpsTotalResponsesPerMonthChart: React.FC<NpsTotalResponsesPerMonthChartProps> = ({
  reviews,
  unidadeSelecionada,
}) => {
  const data = useNpsTotalResponsesPerMonth(reviews, unidadeSelecionada);

  const chartData = Object.keys(data).map(monthYear => ({
    monthYear,
    nps: data[monthYear].nps,
    totalResponses: data[monthYear].totalResponses,
  }));

  // Preparando os dados para o gráfico
  const series = [
    {
      name: 'NPS',
      data: chartData.map(item => item.nps),
    },
    {
      name: 'Total de Respostas',
      data: chartData.map(item => item.totalResponses),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 400,
    },
    xaxis: {
      categories: chartData.map(item => item.monthYear),
    },
    yaxis: [
      {
        title: {
          text: 'NPS',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Total de Respostas',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    stroke: {
      width: 2,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="line" height={400} />
    </div>
  );
};
