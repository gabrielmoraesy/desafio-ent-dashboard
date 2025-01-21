import { Skeleton } from "@/components/ui/skeleton"
import { Fragment } from "react/jsx-runtime"

export const SkeletonDashboardReviews = () => {
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="min-h-[250px] rounded-2xl" />
                ))}
            </div>

            <h1 className="text-base font-bold mx-8">Filmes recomendados</h1>

            <div className="flex flex-wrap gap-2 mx-8 my-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[250px] w-full sm-custom:w-[196px]" />
                ))}
            </div>
        </Fragment>

    )
}
