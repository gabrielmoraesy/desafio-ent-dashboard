import { ModeToggle } from "@/components/ModeToggle/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { useHeaderDashboardReviews } from "./HeaderDashboardReviews.hook";
import { Filter } from "lucide-react";
import { FilterDataModal } from "@/components/Modals/FilterDataModal";
import { useState } from "react";

export const HeaderDashboardReviews = () => {
    const [isOpenFilterData, setIsOpenFilterData] = useState(false)
    const { reviews, unitSelected } = useReviewContext();

    const {
        detratores,
        neutros,
        promotores,
        totalReviews,
        detratoresPercentage,
        neutrosPercentage,
        promotoresPercentage,
        nps
    } = useHeaderDashboardReviews(reviews, unitSelected);

    const stylesCard = 'bg-gray-100 dark:bg-gray-800 flex flex-col justify-between rounded-lg text-center w-1/4 max-[600px]:w-full';

    return (
        <header className="p-6">
            <div className="flex justify-between">
                <h1 className="text-xl sm:text-3xl font-bold uppercase">
                    Net Promoter Score <span className="capitalize">{unitSelected && `| Unidade ${unitSelected}`}</span>
                </h1>
                <div className="flex justify-center items-center gap-1.5">
                    <SidebarTrigger />
                    <ModeToggle />
                    <Filter
                        onClick={() => setIsOpenFilterData((prevState) => !prevState)}
                        className="bg-[#3C83C4] text-white w-10 h-10 p-2 rounded-xl hover:bg-[#2d6294] duration-300"
                    />
                </div>
            </div>
            <div className="flex max-[600px]:flex-col max-[750px]:flex-wrap max-[750px]:justify-center max-[750px]:gap-2 mt-4 gap-3">
                <div className="bg-green-500 p-4 rounded-lg text-center w-1/4 max-[600px]:w-full">
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

                <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-1/4 max-[600px]:w-full">
                    <p className="text-xl sm:text-2xl font-bold">{totalReviews}</p>
                    <p>Avaliações</p>
                </div>
            </div>

            <FilterDataModal isOpen={isOpenFilterData} setIsOpen={setIsOpenFilterData} />
        </header>
    );
};

