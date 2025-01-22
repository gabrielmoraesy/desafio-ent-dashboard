import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Modal from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useChangePopStateEvent } from "@/hooks/useChangePopStateEvent";
import { z } from "zod";
import { useReviewContext } from "@/contexts/ReviewProvider/review-provider";
import { X } from "lucide-react";

const dateSchema = z.string().refine((value) => !isNaN(Date.parse(value)), {
  message: "Data inválida",
});

const periodSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema.refine(
    (value: string) => {
      if (new Date(value) > new Date()) {
        return false;
      }
      return true;
    },
    {
      message: "A data de fim não pode ser posterior a hoje.",
    }
  ),
}).refine(
  (data) => new Date(data.startDate) <= new Date(data.endDate),
  {
    message: "A data de início não pode ser posterior à data de fim.",
    path: ["startDate"],
  }
);

export interface FilterDataModalProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FilterDataModal({
  isOpen,
  setIsOpen,
}: FilterDataModalProps) {
  const { startDate, setStartDate, endDate, setEndDate, resetReviews, filterReviews } = useReviewContext();
  const [errors, setErrors] = useState<string | null>(null);

  const hideFilterDataModal = useCallback(
    () => setIsOpen && setIsOpen(false),
    [setIsOpen]
  );

  useChangePopStateEvent({
    onReturn: hideFilterDataModal,
    type: "modal",
  });

  const handleFilter = () => {
    const result = periodSchema.safeParse({
      startDate,
      endDate,
    });

    if (!result.success) {
      setErrors(result.error.errors[0]?.message);
      return;
    }

    setErrors(null);
    filterReviews()
    hideFilterDataModal();
  };

  const cleanFilters = () => {
    setStartDate("");
    setEndDate(new Date().toISOString().split("T")[0]);
    resetReviews();
  };

  return (
    <Modal.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Modal.DialogContent className="max-w-[85vw] dark:bg-[#101010] sm:max-w-[600px]">
        <Modal.DialogHeader className="flex w-full flex-row items-center justify-between border-b-[1px] dark:border-gray border-[#2d6294]  pb-2">
          <h2 className="text-2xl">Filtros</h2>
        </Modal.DialogHeader>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <p className="text-base">Selecione o período:</p>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="border-2 border-[#2d6294]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p>a</p>
            <Input
              type="date"
              className="border-2 border-[#2d6294]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button onClick={handleFilter} className="bg-[#2d6294] dark:text-white dark:hover:bg-gray-800">Filtrar</Button>
          {startDate && endDate &&
            <Button onClick={cleanFilters} className="text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white ">
              <X className="hover:text-white" />
              Limpar filtros
            </Button>}
        </div>
      </Modal.DialogContent>
    </Modal.Dialog>
  );
}
