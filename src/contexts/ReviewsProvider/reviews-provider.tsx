/* eslint-disable react-refresh/only-export-components */
import { useReviews } from "@/api/reviews";
import { useFilter } from "@/hooks/useFilter";
import { IReview } from "@/interfaces/IReview";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ReviewsContextType {
    filteredReviews: IReview[]
    isLoadingReviews: boolean;
    unitSelected: string;
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    beforeStartDate: string;
    setBeforeStartDate: React.Dispatch<React.SetStateAction<string>>;
    beforeEndDate: string;
    setBeforeEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
    const [unitSelected, setUnitSelected] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const [beforeStartDate, setBeforeStartDate] = useState<string>("");
    const [beforeEndDate, setBeforeEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const { data: reviews = [], isLoading: isLoadingReviews } = useReviews();

    const { filteredReviews } = useFilter({
        reviews,
        filterOptions: { unitSelected, startDate, endDate },
    });

    return (
        <ReviewsContext.Provider
            value={{
                filteredReviews,
                isLoadingReviews,
                unitSelected,
                setUnitSelected,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                beforeStartDate,
                setBeforeStartDate,
                beforeEndDate,
                setBeforeEndDate
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviewsContext = (): ReviewsContextType => {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error("useReviewsContext must be used within a ReviewsProvider");
    }
    return context;
};
