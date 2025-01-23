import { FeedbackTable } from "./fragments/FeedbackTable";
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { NpsDayOfWeekAndShiftChart } from "./fragments/NpsDayOfWeekAndShiftChart";
import { NpsDayOfWeekChart } from "./fragments/NpsDayOfWeekChart";
import { NpsDistributionChart } from "./fragments/NpsDistributionChart";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { NpsTotalResponsesPerMonthChart } from "./fragments/NpsTotalResponsesPerMonthChart";
import { NpsUnitChart } from "./fragments/NpsUnitChart";
import { useMainDashboardReviews } from "./MainDashboardReviews.hook";

export const MainDashboardReviews = () => {
    const { npsUnitData } = useMainDashboardReviews();

    return (
        <main className="p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <NpsUnitChart npsUnitData={npsUnitData} />
            <NpsPorPracaTable />
            <NpsTotalResponsesPerMonthChart />
            <NpsBoardTable />
            <NpsDayOfWeekChart />
            <NpsDistributionChart />
            <NpsDayOfWeekAndShiftChart />
            <FeedbackTable />
        </main>
    );
};

