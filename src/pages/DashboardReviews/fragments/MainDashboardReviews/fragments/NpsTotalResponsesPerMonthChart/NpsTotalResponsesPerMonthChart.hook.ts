import { useState, useEffect } from 'react';

interface Review {
  idAvaliacao: number;
  nota: number;
  statusNPS: string;
  comentario: string | null;
  dataCadastro: string;
  unidade: string;
  praca: string;
  mesa: string;
}

const calculateNps = (reviews: Review[]) => {
  const promoters = reviews.filter(review => review.statusNPS === 'PROMOTORAS').length;
  const detractors = reviews.filter(review => review.statusNPS === 'DETRAUTORES').length;
  const totalResponses = reviews.length;

  if (totalResponses === 0) return 0;

  const nps = ((promoters - detractors) / totalResponses) * 100;
  return nps;
};

const groupReviewsByMonth = (reviews: Review[]) => {
  return reviews.reduce((acc, review) => {
    const monthYear = new Date(review.dataCadastro).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    if (!acc[monthYear]) acc[monthYear] = { totalResponses: 0, reviews: [] };
    acc[monthYear].totalResponses += 1;
    acc[monthYear].reviews.push(review);
    return acc;
  }, {} as { [key: string]: { totalResponses: number; reviews: Review[] } });
};

const getLast12Months = () => {
  const currentDate = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    months.push(month.toLocaleString('default', { month: 'long', year: 'numeric' }));
  }
  return months.reverse(); // Retorna os últimos 12 meses de forma cronológica
};

export const useNpsTotalResponsesPerMonth = (reviews: Review[], unidadeSelecionada: string | null) => {
  const [data, setData] = useState<{ [key: string]: { nps: number; totalResponses: number } }>({});

  useEffect(() => {
    const filteredReviews = unidadeSelecionada
      ? reviews.filter(review => review.unidade === unidadeSelecionada)
      : reviews;

    // Filtra as avaliações para os últimos 12 meses
    const last12Months = getLast12Months();
    const filteredByMonth = filteredReviews.filter(review => {
      const monthYear = new Date(review.dataCadastro).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      return last12Months.includes(monthYear);
    });

    const groupedData = groupReviewsByMonth(filteredByMonth);
    const result: { [key: string]: { nps: number; totalResponses: number } } = {};

    for (const monthYear of last12Months) {
      const { totalResponses, reviews } = groupedData[monthYear] || { totalResponses: 0, reviews: [] };
      result[monthYear] = {
        nps: calculateNps(reviews),
        totalResponses,
      };
    }

    setData(result);
  }, [reviews, unidadeSelecionada]);

  return data;
};
