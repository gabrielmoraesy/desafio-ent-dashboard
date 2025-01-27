import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { useEffect, useState } from "react";

export function useFeedbackTable() {
    const { unitSelected, filteredReviews } = useReviewsContext();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReviews = filteredReviews.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleJumpBack = () => {
        setCurrentPage((prev) => Math.max(prev - 10, 1));
    };

    const handleJumpForward = () => {
        setCurrentPage((prev) => Math.min(prev + 10, totalPages));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [unitSelected]);

    return {
        currentReviews,
        currentPage,
        totalPages,
        handlePreviousPage,
        handleNextPage,
        handleJumpBack,
        handleJumpForward,
    };
}
