import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { NpsUnitChart } from "./fragments/NpsUnitChart";
import { NpsBoardTable } from "./fragments/NpsBoardTable";
import { useMainDashboardReviews } from "./MainDashboardReviews.hook";
import { NpsPorPracaTable } from "./fragments/NpsSquareTable";
import { FeedbackTable } from "./fragments/FeedbackTable";

export const MainDashboardReviews = () => {
    const { reviews } = useReviewContext();
    const { npsUnitData } = useMainDashboardReviews(reviews);

    return (
        <main className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <NpsUnitChart npsUnitData={npsUnitData} />

            <NpsPorPracaTable />

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2">
                <h2 className="text-lg font-bold mb-4">NPS e Total de Respostas Por Mês</h2>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            <NpsBoardTable />

            <FeedbackTable />
        </main>
    );
};

