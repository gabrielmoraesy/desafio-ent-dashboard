/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { useEffect, useMemo, useState } from "react";

interface NpsResult {
    mesa: string;
    nps: number;
    promoters: number;
    detractors: number;
    total: number;
    rank: number;
}

export function useNpsBoardTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { unitSelected, filteredReviews } = useReviewsContext();

    const calculateNps = (promoters: number, detractors: number, total: number) => {
        if (total === 0) return 0;
        const promotersPercentage = (promoters / total) * 100;
        const detractorsPercentage = (detractors / total) * 100;
        return promotersPercentage - detractorsPercentage;
    };

    const npsTableData = useMemo(() => {
        const groupedByMesa = filteredReviews.reduce((acc: any, review) => {
            const mesa = review.mesa;
            const nota = review.nota;
            const status = review.statusNPS;

            if (!acc[mesa]) {
                acc[mesa] = { promoters: 0, detractors: 0, total: 0 };
            }

            if (status === "PROMOTORAS" && nota >= 9) {
                acc[mesa].promoters += 1;
            } else if (status === "DETRATORES" && nota <= 6) {
                acc[mesa].detractors += 1;
            }

            acc[mesa].total += 1;

            return acc;
        }, {});

        const npsResults: NpsResult[] = Object.keys(groupedByMesa).map((mesa) => {
            const { promoters, detractors, total } = groupedByMesa[mesa];
            const nps = calculateNps(promoters, detractors, total);

            return {
                mesa,
                nps,
                promoters,
                detractors,
                total,
                rank: 0,
            };
        });

        npsResults.sort((a, b) => b.nps - a.nps);

        let rank = 1;
        npsResults.forEach((result, index) => {
            if (index > 0 && result.nps !== npsResults[index - 1].nps) {
                rank = index + 1;
            }
            result.rank = rank;
        });

        const totalPages = Math.ceil(npsResults.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = npsResults.slice(startIndex, endIndex);

        if (currentPage > totalPages) {
            setCurrentPage(1);
        }

        return {
            npsTableData: paginatedData,
            totalPages,
            currentPage,
        };
    }, [filteredReviews, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < npsTableData.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [unitSelected]);

    return {
        npsTableData: npsTableData.npsTableData,
        totalPages: npsTableData.totalPages,
        currentPage,
        handlePreviousPage,
        handleNextPage,
    };
}
