import { IReview } from "@/interfaces/IReview";
import { useMemo } from "react";

interface useHeaderDashboardReviewsProps {
    detratores: number;
    neutros: number;
    promotores: number;
    totalReviews: number;
    detratoresPercentage: string;
    neutrosPercentage: string;
    promotoresPercentage: string;
    nps: string;
}

export const useHeaderDashboardReviews = (filteredReviews: IReview[]): useHeaderDashboardReviewsProps => {
    const totalReviews = filteredReviews.length;

    const detratores = useMemo(() => {
        return filteredReviews.filter(review => review.nota >= 1 && review.nota <= 6).length;
    }, [filteredReviews]);

    const neutros = useMemo(() => {
        return filteredReviews.filter(review => review.nota >= 7 && review.nota <= 8).length;
    }, [filteredReviews]);

    const promotores = useMemo(() => {
        return filteredReviews.filter(review => review.nota >= 9 && review.nota <= 10).length;
    }, [filteredReviews]);

    const detratoresPercentage = useMemo(() => {
        return totalReviews ? ((detratores / totalReviews) * 100).toFixed(2) + "%" : "0.00%";
    }, [detratores, totalReviews]);

    const neutrosPercentage = useMemo(() => {
        return totalReviews ? ((neutros / totalReviews) * 100).toFixed(2) + "%" : "0.00%";
    }, [neutros, totalReviews]);

    const promotoresPercentage = useMemo(() => {
        return totalReviews ? ((promotores / totalReviews) * 100).toFixed(2) + "%" : "0.00%";
    }, [promotores, totalReviews]);

    const nps = useMemo(() => {
        const promotoresValue = promotores / totalReviews * 100;
        const detratoresValue = detratores / totalReviews * 100;
        const npsValue = promotoresValue - detratoresValue;
        return npsValue ? npsValue.toFixed(2) : "0";
    }, [promotores, detratores, totalReviews]);

    return {
        detratores,
        neutros,
        promotores,
        totalReviews,
        detratoresPercentage,
        neutrosPercentage,
        promotoresPercentage,
        nps,
    };
};
