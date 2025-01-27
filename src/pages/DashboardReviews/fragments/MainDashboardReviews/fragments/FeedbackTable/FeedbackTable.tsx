import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";
import { IReview } from "@/interfaces/IReview";
import { useFeedbackTable } from "./FeedbackTable.hook";

interface FeedbackTableProps {
    filteredReviews: IReview[];
}

const FeedbackTable = ({ filteredReviews }: FeedbackTableProps) => {
    const { unitSelected } = useFiltersContext();

    const {
        currentReviews,
        currentPage,
        totalPages,
        handlePreviousPage,
        handleNextPage,
        handleJumpBack,
        handleJumpForward,
    } = useFeedbackTable(filteredReviews);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-1 xl:col-span-3">
            <h2 className="text-base sm:text-lg font-bold mb-4">Feedbacks - Comentários do NPS {unitSelected && `| Unidade ${unitSelected}`}</h2>
            <div className="overflow-auto min-h-[500px]">
                <Table className="min-w-[1500px] text-left">
                    <TableHeader>
                        <TableRow className="bg-gray-200 dark:bg-gray-700">
                            <TableHead className="p-2">Nota</TableHead>
                            <TableHead className="p-2">Status NPS</TableHead>
                            <TableHead className="p-2">Comentário</TableHead>
                            <TableHead className="p-2">Data Cadastro</TableHead>
                            <TableHead className="p-2">Hora Avaliação</TableHead>
                            <TableHead className="p-2">Unidade</TableHead>
                            <TableHead className="p-2">Email</TableHead>
                            <TableHead className="p-2">Nome</TableHead>
                            <TableHead className="p-2">Telefone</TableHead>
                            <TableHead className="p-2">Mesa</TableHead>
                            <TableHead className="p-2">Praça</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentReviews.map((review: IReview, index: number) => (
                            <TableRow key={index} className="border-b border-gray-700">
                                <TableCell className="p-2">{review.nota}</TableCell>
                                <TableCell className="p-2">{review.statusNPS}</TableCell>
                                <TableCell className="p-2">{review.comentario || "Sem comentário"}</TableCell>
                                <TableCell className="p-2">{new Date(review.dataCadastro).toLocaleDateString()}</TableCell>
                                <TableCell className="p-2">{review.horaAvaliacao}</TableCell>
                                <TableCell className="p-2">{review.unidade}</TableCell>
                                <TableCell className="p-2">{review.clienteEmail || "Não informado"}</TableCell>
                                <TableCell className="p-2">{review.clienteNome || "Não informado"}</TableCell>
                                <TableCell className="p-2">{review.clienteTelefone || "Não informado"}</TableCell>
                                <TableCell className="p-2">{review.mesa}</TableCell>
                                <TableCell className="p-2">{review.praca}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4 max-[920px]:flex-col max-[920px]:gap-2">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleJumpBack} disabled={currentPage === 1} className="text-[10px] sm:text-sm"
                    >
                        {"<< Voltar 10"}
                    </Button>
                    <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1} className="text-[10px] sm:text-sm">
                        {"< Anterior"}
                    </Button>
                </div>
                <span className="text-sm">
                    Página {currentPage} de {totalPages}
                </span>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages} className="text-[10px] sm:text-sm">
                        {"Próxima >"}
                    </Button>
                    <Button variant="outline" onClick={handleJumpForward} disabled={currentPage === totalPages} className="text-[10px] sm:text-sm">
                        {"Avançar 10 >>"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackTable

