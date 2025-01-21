/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IReview } from "@/interfaces/IReview";
import { z } from "zod";

const dateSchema = z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Data inválida",
});

interface ReviewContextType {
    reviews: IReview[];
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
    unitSelected: string;
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    filterReviews: () => void;
    resetReviews: () => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [unitSelected, setUnitSelected] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [initialReviews, setInitialReviews] = useState<IReview[]>([]);

    const filterReviews = () => {
        const parsedStartDate = dateSchema.safeParse(startDate);
        const parsedEndDate = dateSchema.safeParse(endDate);

        if (!parsedStartDate.success || !parsedEndDate.success) {
            alert("Uma ou ambas as datas são inválidas");
            return;
        }

        const filteredReviews = reviews.filter((review) => {
            const reviewDate = new Date(review.dataCadastro).toISOString().split("T")[0];
            return reviewDate >= startDate && reviewDate <= endDate;
        });

        setReviews(filteredReviews);
    };

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
                filterReviews,
                resetReviews,
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
