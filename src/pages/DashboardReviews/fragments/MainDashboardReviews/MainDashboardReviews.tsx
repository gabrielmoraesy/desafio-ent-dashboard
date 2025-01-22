import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { NpsUnitChart } from "./fragments/NpsUnitChart";
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { useMainDashboardReviews } from "./MainDashboardReviews.hook";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { FeedbackTable } from "./fragments/FeedbackTable";
import { NpsTotalResponsesPerMonthChart } from "./fragments/NpsTotalResponsesPerMonthChart";

export const MainDashboardReviews = () => {
    const { reviews } = useReviewContext();
    const { npsUnitData } = useMainDashboardReviews(reviews);

    return (
        <main className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <NpsUnitChart npsUnitData={npsUnitData} />
            <NpsPorPracaTable />
            <NpsTotalResponsesPerMonthChart />
            <NpsBoardTable />
            <FeedbackTable />
        </main>
    );
};

