import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonMainDashboardReviews = () => {
    return (
        <main className="w-[1500px] p-6 pt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-2 min-h-[500px]" />
            <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 min-h-[500px]" />
            <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-3 min-h-[500px]" />
            <Skeleton className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-3 min-h-[500px]" />
        </main>
    );
};
