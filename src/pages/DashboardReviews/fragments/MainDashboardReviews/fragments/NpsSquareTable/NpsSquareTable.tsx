/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { useNpsSquareTable } from "./NpsSquareTable.hook";

export const NpsPorPracaTable = () => {
    const { unitSelected } = useReviewsContext();

    const {
        npsSquareData,
        totalPages,
        currentPage,
        handlePreviousPage,
        handleNextPage,
    } = useNpsSquareTable();

    return (
        <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-auto min-h-[381px]">
            <div>
                <h2 className="text-base sm:text-lg font-bold mb-4">NPS Por Praça {unitSelected && `| Unidade ${unitSelected}`}</h2>
                <Table className="min-w-full text-left text-xs sm:text-sm">
                    <TableHeader>
                        <TableRow className="bg-gray-200 dark:bg-gray-700">
                            <TableHead className="p-2">Rank</TableHead>
                            <TableHead className="p-2">Praça</TableHead>
                            <TableHead className="p-2">NPS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {npsSquareData.map((data: any, index: number) => (
                            <TableRow key={index} className="border-b border-gray-700">
                                <TableCell className="p-2">{data.rank}</TableCell>
                                <TableCell className="p-2">{data.praca}</TableCell>
                                <TableCell className="p-2">{data.nps.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 &&
                <div className="flex items-center justify-between mt-4 gap-2 sm:gap-0">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="text-[10px] sm:text-sm"
                        >
                            {"< Anterior"}
                        </Button>
                    </div>
                    <span className="text-xs">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="text-[10px] sm:text-sm"
                        >
                            {"Próxima >"}
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
};
