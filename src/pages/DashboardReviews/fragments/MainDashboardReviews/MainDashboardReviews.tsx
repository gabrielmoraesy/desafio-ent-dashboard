import { Suspense, lazy } from 'react';
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { NpsTotalResponsesPerMonthChart } from "./fragments/NpsTotalResponsesPerMonthChart";
import { NpsUnitChart } from "./fragments/NpsUnitChart";
import { SkeletonMainDashboardReviews } from "./fragments/SkeletonMainDashboardReviews";

const NpsDayOfWeekChart = lazy(() => import("./fragments/NpsDayOfWeekChart/NpsDayOfWeekChart"));
const NpsDistributionChart = lazy(() => import("./fragments/NpsDistributionChart/NpsDistributionChart"));
const NpsDayOfWeekAndShiftChart = lazy(() => import('./fragments/NpsDayOfWeekAndShiftChart/NpsDayOfWeekAndShiftChart'));
const FeedbackTable = lazy(() => import('./fragments/FeedbackTable/FeedbackTable'));

export const MainDashboardReviews = () => {
    return (
        <main className="p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <NpsUnitChart />
            <NpsPorPracaTable />
            <NpsTotalResponsesPerMonthChart />
            <NpsBoardTable />

            <Suspense fallback={<SkeletonMainDashboardReviews />}>
                <NpsDayOfWeekChart />
                <NpsDistributionChart />
                <NpsDayOfWeekAndShiftChart />
                <FeedbackTable />
            </Suspense>
        </main>
    );
};


