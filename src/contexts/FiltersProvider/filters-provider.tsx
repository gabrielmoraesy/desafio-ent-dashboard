/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useState } from "react";

interface FiltersContextType {
    unitSelected: string;
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    beforeStartDate: string;
    setBeforeStartDate: React.Dispatch<React.SetStateAction<string>>;
    beforeEndDate: string;
    setBeforeEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [unitSelected, setUnitSelected] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const [beforeStartDate, setBeforeStartDate] = useState<string>("");
    const [beforeEndDate, setBeforeEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

    return (
        <FiltersContext.Provider
            value={{
                unitSelected,
                setUnitSelected,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                beforeStartDate,
                setBeforeStartDate,
                beforeEndDate,
                setBeforeEndDate
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

export const useFiltersContext = (): FiltersContextType => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error("useFiltersContext must be used within a FiltersProvider");
    }
    return context;
};
