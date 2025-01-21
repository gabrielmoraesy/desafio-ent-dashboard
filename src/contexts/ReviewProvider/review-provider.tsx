/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IReview } from "@/interfaces/IReview";

interface ReviewContextType {
    reviews: IReview[];
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
    unitSelected: string;
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [unitSelected, setUnitSelected] = useState<string>("");

    return (
        <ReviewContext.Provider value={{ reviews, setReviews, unitSelected, setUnitSelected }}>
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
