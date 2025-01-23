import { IReview } from "@/interfaces/IReview";

interface useFilterProps {
    reviews: IReview[]
    filterOptions: {
        unitSelected?: string
        startDate?: string
        endDate?: string
    }
}

export const useFilter = ({ reviews, filterOptions }: useFilterProps) => {
    let filteredReviews = reviews

    const hasStartDate = filterOptions?.startDate
    const hasEndDate = filterOptions?.endDate

    const hasDate = hasStartDate && hasEndDate
    const hasUnit = filterOptions?.unitSelected

    if (hasUnit && !hasDate) {
        filteredReviews = reviews.filter(review => review.unidade === hasUnit)
    }

    if (hasDate) {
        filteredReviews = reviews.filter(review => {
            const reviewDate = new Date(review.dataCadastro).toISOString().split("T")[0];
            const isWithinDateRange = reviewDate >= hasStartDate! && reviewDate <= hasEndDate!;

            return isWithinDateRange
        })
    }

    if (hasUnit && hasDate) {
        filteredReviews = reviews.filter(review => {
            const reviewDate = new Date(review.dataCadastro).toISOString().split("T")[0];
            const isWithinDateRange = reviewDate >= hasStartDate! && reviewDate <= hasEndDate!;

            const isMatchingUnit = !hasUnit || review.unidade === hasUnit;

            return isWithinDateRange && isMatchingUnit
        })
    }

    return { filteredReviews }
}