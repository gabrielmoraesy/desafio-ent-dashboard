/* eslint-disable react-refresh/only-export-components */
import { IReview } from "@/interfaces/IReview";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ReviewContextType {
    reviews: IReview[];
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
    unitSelected: string;
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    resetReviews: () => void;
    filterReviews: () => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [unitSelected, setUnitSelected] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [initialReviews, setInitialReviews] = useState<IReview[]>([]);

    const filterReviews = () => {
        const filteredReviews = initialReviews.filter((review) => {
            const reviewDate = new Date(review.dataCadastro).toISOString().split("T")[0];
            const isWithinDateRange = reviewDate >= startDate && reviewDate <= endDate;
            const isMatchingUnit = !unitSelected || review.unidade === unitSelected;

            return isWithinDateRange && isMatchingUnit;
        });

        setReviews(filteredReviews);
    };

    useEffect(() => {
        filterReviews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitSelected])

    const resetReviews = () => {
        setReviews(initialReviews);
    };

    useEffect(() => {
        if (reviews.length && initialReviews.length === 0) {
            setInitialReviews(reviews);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviews]);

    return (
        <ReviewContext.Provider
            value={{
                reviews,
                setReviews,
                unitSelected,
                setUnitSelected,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                resetReviews,
                filterReviews
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = (): ReviewContextType => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error("useReviewContext must be used within a ReviewProvider");
    }
    return context;
};
