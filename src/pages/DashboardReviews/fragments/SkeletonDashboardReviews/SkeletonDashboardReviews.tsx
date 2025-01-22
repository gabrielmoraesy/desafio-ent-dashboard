import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react/jsx-runtime";

export const SkeletonDashboardReviews = () => {
    return (
        <Fragment>
            <header className="p-6 w-[1500px] flex flex-col gap-4">
                <div className="flex justify-between">
                    <Skeleton className="w-[30%] h-8 rounded-lg" />
                    <div className="flex justify-center items-center gap-1.5">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="w-10 h-10 rounded-lg" />
                        ))}
                    </div>
                </div>

                <div className="flex gap-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="w-[20%] h-[96px] rounded-lg bg-gray-100 dark:bg-gray-800" />
                    ))}
                </div>
            </header>

            <main className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-auto min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-2" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-auto min-h-[381px]" />
                <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 lg:col-span-3 min-h-[500px]" />
            </main>
        </Fragment>
    );
};
