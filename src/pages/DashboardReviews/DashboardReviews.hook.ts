import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { api } from "@/services/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useDashboardReviews = () => {
    const { reviews, setReviews } = useReviewContext();

    const getReviews = async () => {
        try {
            const response = await api.get("/reviews");
            return response.data;
        } catch (error) {
            toast.error(`Erro ao buscar avaliações: ${error}`);
            return [];
        }
    };

    useEffect(() => {
        async function fetchReviews() {
            const data = await getReviews();
            setReviews(data);
        }

        fetchReviews();
    }, [setReviews]);

    return {
        reviews,
    };
};
