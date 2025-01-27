import { Button } from "@/components/ui/button";
import * as Modal from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";
import { useChangePopStateEvent } from "@/hooks/useChangePopStateEvent";
import { X } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { z } from "zod";

const dateSchema = z.string().refine((value) => !isNaN(Date.parse(value)), {
  message: "Data inválida",
});

const periodSchema = z.object({
  beforeStartDate: dateSchema,
  beforeEndDate: dateSchema.refine(
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
  (data) => new Date(data.beforeStartDate) <= new Date(data.beforeEndDate),
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
  const { setStartDate, setEndDate, beforeStartDate, setBeforeStartDate, beforeEndDate, setBeforeEndDate } = useFiltersContext();
  const [errors, setErrors] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const hideFilterDataModal = useCallback(
    () => setIsOpen && setIsOpen(false),
    [setIsOpen]
  );

  useChangePopStateEvent({
    onReturn: hideFilterDataModal,
    type: "modal",
  });

  const handleFilter = () => {
    startTransition(() => {
      const result = periodSchema.safeParse({
        beforeStartDate,
        beforeEndDate,
      });

      if (!result.success) {
        setErrors(result.error.errors[0].message);
        return;
      }

      setStartDate(beforeStartDate)
      setEndDate(beforeEndDate)

      setErrors(null);
      hideFilterDataModal();
    })
  };

  const cleanFilters = () => {
    setStartDate("")
    setEndDate("")

    setBeforeStartDate("");
    setBeforeEndDate(new Date().toISOString().split("T")[0]);
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
              value={beforeStartDate}
              onChange={(e) => setBeforeStartDate(e.target.value)}
            />
            <p>a</p>
            <Input
              type="date"
              className="border-2 border-[#2d6294]"
              value={beforeEndDate}
              onChange={(e) => setBeforeEndDate(e.target.value)}
            />
          </div>
          {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button onClick={handleFilter} className="bg-[#2d6294] dark:text-white dark:hover:bg-gray-800">Filtrar</Button>
          {beforeStartDate && beforeEndDate &&
            <Button onClick={cleanFilters} className="text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white ">
              <X className="hover:text-white" />
              Limpar filtro
            </Button>}
        </div>
      </Modal.DialogContent>
    </Modal.Dialog>
  );
}
