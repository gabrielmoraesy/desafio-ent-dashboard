import { SidebarTrigger } from "@/components/ui/sidebar";

export const DashboardFinances = () => {
    return (
        <div className="flex items-center justify-between mt-4 gap-6">
            <h1 className="text-base sm:text-xl font-extrabold dark:text-white tracking-wide">Em <span className="text-[#3C83C4] font-extrabold text-center">Desenvolvimento...</span></h1>
            <SidebarTrigger />
        </div>
    );
};
