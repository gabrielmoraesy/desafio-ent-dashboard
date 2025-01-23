import { useReviews } from "@/api/reviews";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";
import { useFilter } from "@/hooks/useFilter";
import { IReview } from "@/interfaces/IReview";
import { useMemo } from "react";

export const useMainDashboardReviews = () => {
    const { unitSelected, startDate, endDate } = useFiltersContext();

    const { data: reviews = [] } = useReviews();

    const { filteredReviews } = useFilter({
        reviews,
        filterOptions: {
            unitSelected,
            startDate,
            endDate
        }
    })

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

    return { npsUnitData };
};

