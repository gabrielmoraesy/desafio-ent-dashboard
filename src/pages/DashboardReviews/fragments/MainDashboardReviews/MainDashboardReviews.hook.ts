import { IReview } from "@/interfaces/IReview";
import { useMemo } from "react";

export const useMainDashboardReviews = (reviews: IReview[]) => {
    const reviewsByUnit = useMemo(() => {
        return reviews.reduce((acc, review) => {
            const { unidade } = review;
            if (!acc[unidade]) {
                acc[unidade] = [];
            }
            acc[unidade].push(review);
            return acc;
        }, {} as Record<string, IReview[]>);
    }, [reviews]);

    const npsUnitData = useMemo(() => {
        return Object.entries(reviewsByUnit).map(([unidade, reviews]) => {
            const totalReviews = reviews.length;
            const detratores = reviews.filter(review => review.nota >= 1 && review.nota <= 6).length;
            const promotores = reviews.filter(review => review.nota >= 9 && review.nota <= 10).length;

            const nps = totalReviews
                ? ((promotores / totalReviews) * 100 - (detratores / totalReviews) * 100).toFixed(2)
                : "0";

            return { unidade, nps };
        });
    }, [reviewsByUnit]);

    return { npsUnitData };
};

