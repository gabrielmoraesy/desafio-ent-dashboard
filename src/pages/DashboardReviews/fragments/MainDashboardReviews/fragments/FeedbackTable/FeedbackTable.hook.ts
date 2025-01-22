import { IReview } from "@/interfaces/IReview";
import { useEffect, useState } from "react";

interface useFeedbackTableProps {
    reviews: IReview[];
    unitSelected: string;
}

export function useFeedbackTable({ reviews, unitSelected }: useFeedbackTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReviews = reviews.slice(startIndex, endIndex);

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
