/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { IReview } from "@/interfaces/IReview";

interface useNpsSquareTableProps {
    reviews: IReview[];
    unitSelected: string;
}

interface NpsResult {
    praca: string;
    nps: number;
    promoters: number;
    detractors: number;
    total: number;
    rank: number;
}

export function useNpsSquareTable({ reviews, unitSelected }: useNpsSquareTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const calculateNps = (promoters: number, detractors: number, total: number) => {
        if (total === 0) return 0;
        const promotersPercentage = (promoters / total) * 100;
        const detractorsPercentage = (detractors / total) * 100;
        return promotersPercentage - detractorsPercentage;
    };

    const npsSquareData = useMemo(() => {
        const filteredReviews = unitSelected
            ? reviews.filter((review) => review.unidade === unitSelected)
            : reviews;

        const groupedByPraca = filteredReviews.reduce((acc: any, review) => {
            const praca = review.praca;
            const nota = review.nota;
            const status = review.statusNPS;

            if (!acc[praca]) {
                acc[praca] = { promoters: 0, detractors: 0, total: 0 };
            }

            if (status === "PROMOTORAS" && nota >= 9) {
                acc[praca].promoters += 1;
            } else if (status === "DETRATORES" && nota <= 6) {
                acc[praca].detractors += 1;
            }

            acc[praca].total += 1;

            return acc;
        }, {});

        const npsResults: NpsResult[] = Object.keys(groupedByPraca).map((praca) => {
            const { promoters, detractors, total } = groupedByPraca[praca];
            const nps = calculateNps(promoters, detractors, total);

            return {
                praca,
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
            npsSquareData: paginatedData,
            totalPages,
            currentPage,
        };
    }, [reviews, currentPage, unitSelected]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < npsSquareData.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [unitSelected]);

    return {
        npsSquareData: npsSquareData.npsSquareData,
        totalPages: npsSquareData.totalPages,
        currentPage,
        handlePreviousPage,
        handleNextPage,
    };
}
