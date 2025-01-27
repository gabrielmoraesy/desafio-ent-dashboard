import { FilterDataModal } from "@/components/Modals/FilterDataModal";
import { ModeToggle } from "@/components/ModeToggle/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { format, parseISO } from "date-fns";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useHeaderDashboardReviews } from "./HeaderDashboardReviews.hook";

export const HeaderDashboardReviews = () => {
    const [isOpenFilterData, setIsOpenFilterData] = useState(false)
    const { unitSelected, startDate, endDate } = useReviewsContext();

    const startDateFormatted = startDate ? format(parseISO(startDate), "dd/MM/yyyy") : '';
    const endDateFormatted = endDate ? format(parseISO(endDate), "dd/MM/yyyy") : '';

    const {
        detratores,
        neutros,
        promotores,
        totalReviews,
        detratoresPercentage,
        neutrosPercentage,
        promotoresPercentage,
        nps
    } = useHeaderDashboardReviews();

    const stylesCard = 'bg-gray-100 dark:bg-gray-800 flex flex-col justify-between rounded-lg text-center w-1/4 max-[1200px]:w-full';

    return (
        <header className="p-6">
            <div className="flex justify-between flex-col sm:flex-row">
                <h1 className="text-xl sm:text-3xl font-semibold uppercase text-center sm:text-left">
                    Net Promoter Score <span className="capitalize">{unitSelected && `| Unidade ${unitSelected}`}</span>
                </h1>
                <div className="flex justify-center items-center gap-1.5 mt-2 sm:mt-0">
                    {startDate && endDate &&
                        <p className="text-xs sm:text-base">
                            Período selecionado: {startDateFormatted} a {endDateFormatted}
                        </p>
                    }
                    <SidebarTrigger />
                    <ModeToggle />
                    <Filter
                        onClick={() => setIsOpenFilterData((prevState) => !prevState)}
                        className="bg-[#3C83C4] text-white w-10 h-10 p-2 rounded-xl hover:bg-[#2d6294] duration-300"
                    />
                </div>
            </div>
            <div className="flex max-[1200px]:flex-col max-[750px]:flex-wrap max-[750px]:justify-center max-[750px]:gap-2 mt-2 sm:mt-4 gap-3">
                <div className="bg-green-500 p-4 rounded-lg text-center w-1/4 max-[1200px]:w-full">
                    <p className="text-xl sm:text-3xl font-bold">{nps}</p>
                    <p className="text-lg sm:text-xl">NPS</p>
                </div>
                <div className={stylesCard}>
                    <p className="text-sm text-left pl-2 pt-1">{promotores} Avaliações</p>
                    <p className="text-xl sm:text-2xl font-bold">{promotoresPercentage}</p>
                    <div className="text-sm sm:text-base bg-green-500 rounded-b-lg p-[2px]">% Promotores 9-10</div>
                </div>
                <div className={stylesCard}>
                    <p className="text-sm text-left pl-2 pt-1">{neutros} Avaliações</p>
                    <p className="text-xl sm:text-2xl font-bold">{neutrosPercentage}</p>
                    <div className="text-sm sm:text-base bg-yellow-500 rounded-b-lg p-[2px]">% Neutros 7-8</div>
                </div>
                <div className={stylesCard}>
                    <p className="text-sm text-left pl-2 pt-1">{detratores} Avaliações</p>
                    <p className="text-xl sm:text-2xl font-bold">{detratoresPercentage}</p>
                    <div className="text-sm sm:text-base bg-red-500 rounded-b-lg p-[2px]">% Detratores 0-6</div>
                </div>

                <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-1/4 max-[1200px]:w-full">
                    <p className="text-xl sm:text-2xl font-bold">{totalReviews}</p>
                    <p>Avaliações</p>
                </div>
            </div>

            <FilterDataModal isOpen={isOpenFilterData} setIsOpen={setIsOpenFilterData} />
        </header>
    );
};
