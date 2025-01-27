import { IReview } from "@/interfaces/IReview";
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { NpsTotalResponsesPerMonthChart } from "./fragments/NpsTotalResponsesPerMonthChart";
import { NpsUnitChart } from "./fragments/NpsUnitChart";
import { Suspense, lazy } from 'react';
import { SkeletonMainDashboardReviews } from "./fragments/SkeletonMainDashboardReviews";

const NpsDayOfWeekChart = lazy(() => import("./fragments/NpsDayOfWeekChart/NpsDayOfWeekChart"));
const NpsDistributionChart = lazy(() => import("./fragments/NpsDistributionChart/NpsDistributionChart"));
const NpsDayOfWeekAndShiftChart = lazy(() => import('./fragments/NpsDayOfWeekAndShiftChart/NpsDayOfWeekAndShiftChart'));
const FeedbackTable = lazy(() => import('./fragments/FeedbackTable/FeedbackTable'));

interface MainDashboardReviewsProps {
    filteredReviews: IReview[];
}

export const MainDashboardReviews = ({ filteredReviews }: MainDashboardReviewsProps) => {
    return (
        <main className="p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <NpsUnitChart filteredReviews={filteredReviews} />
            <NpsPorPracaTable filteredReviews={filteredReviews} />
            <NpsTotalResponsesPerMonthChart filteredReviews={filteredReviews} />
            <NpsBoardTable filteredReviews={filteredReviews} />

            <Suspense fallback={<SkeletonMainDashboardReviews />}>
                <NpsDayOfWeekChart filteredReviews={filteredReviews} />
                <NpsDistributionChart filteredReviews={filteredReviews} />
                <NpsDayOfWeekAndShiftChart filteredReviews={filteredReviews} />
                <FeedbackTable filteredReviews={filteredReviews} />
            </Suspense>
        </main>
    );
};


