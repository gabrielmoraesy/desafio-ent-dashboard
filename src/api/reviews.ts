import { IReview } from "@/interfaces/IReview";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useReviews = () => {
    return useQuery<IReview[]>({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await api.get<IReview[]>("/reviews");

            return data;
        },
    });
};


