/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { items } from "@/components/Sidebar/Sidebar";
import { ModeToggle } from "@/components/ModeToggle/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center pt-8 gap-8">
            <div className="w-full flex justify-between items-center gap-2 px-4 sm:px-0">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3C83C4] dark:text-white tracking-wide">Dashboards</h1>
                <div>
                    <SidebarTrigger />
                    <ModeToggle />
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pb-6 sm:pb-0">
                {items
                    .filter((item: any) => item.title !== "Início")
                    .map((item: any) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-center justify-between bg-white dark:bg-gray-800 shadow-lg p-6 w-[310px] h-[250px] border-2 border-transparent hover:border-[#3C83C4] dark:hover:border-[#fff] transition-all duration-300"
                        >
                            <item.icon size={80} className="text-[#3C83C4] dark:text-white" />
                            <h2 className="text-[#3C83C4] dark:text-white first-letter:font-bold text-lg">{item.title}</h2>
                            <Button
                                variant={"outline"}
                                onClick={() => navigate(item.url)}
                                className="bg-[#3C83C4] text-white border-[#3C83C4] dark:border-none hover:text-[#3C83C4] hover:bg-[#fff] transition-all duration-300 "
                            >
                                Ir para dashboard
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    );
};
