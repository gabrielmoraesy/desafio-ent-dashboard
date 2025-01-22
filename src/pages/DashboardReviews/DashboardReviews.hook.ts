import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useDashboardReviews = () => {
    const { setReviews } = useReviewContext();
    const [loading, setLoading] = useState(false)

    const getReviews = async () => {
        try {
            setLoading(true)
            const response = await api.get("/reviews");
            return response.data;
        } catch (error) {
            toast.error(`Erro ao buscar avaliações: ${error}`);
            return [];
        } finally {
            setLoading(false)
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
        loading
    };
};
