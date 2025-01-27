import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react/jsx-runtime";

export const SkeletonDashboardReviews = () => {
    return (
        <Fragment>
            <header className="p-6 w-[1500px] flex flex-col gap-2">
                <div className="flex justify-between flex-col sm:flex-row">
                    <Skeleton className="w-[30%] h-8 rounded-lg" />
                    <div className="flex justify-center items-center gap-1.5">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="w-10 h-10 rounded-lg" />
                        ))}
                    </div>
                </div>

                <div className="flex max-[1200px]:flex-col max-[750px]:flex-wrap max-[750px]:justify-center max-[750px]:gap-2 mt-4 gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-[96px]  bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-1/4 max-[1200px]:w-full" />
                    ))}
                </div>
            </header>

            <main className="p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2 min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-auto min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2 min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-auto min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2 min-h-[500px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 min-h-[500px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-3 min-h-[500px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-3 min-h-[500px]" />
            </main>
        </Fragment>
    );
};
