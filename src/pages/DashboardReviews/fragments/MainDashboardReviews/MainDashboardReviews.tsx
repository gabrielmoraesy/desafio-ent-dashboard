import { FeedbackTable } from "./fragments/FeedbackTable";
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { NpsDayOfWeekAndShiftChart } from "./fragments/NpsDayOfWeekAndShiftChart";
import { NpsDayOfWeekChart } from "./fragments/NpsDayOfWeekChart";
import { NpsDistributionChart } from "./fragments/NpsDistributionChart";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { NpsTotalResponsesPerMonthChart } from "./fragments/NpsTotalResponsesPerMonthChart";
import { NpsUnitChart } from "./fragments/NpsUnitChart";

export const MainDashboardReviews = () => {
    return (
        <main className="p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <NpsUnitChart />
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

