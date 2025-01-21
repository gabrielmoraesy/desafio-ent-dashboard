import { Home, Star, CircleHelp, CircleDollarSign } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export const items = [
    {
        title: "Início",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard | Avaliações NPS",
        url: "dashboard-reviews",
        icon: Star,
    },
    {
        title: "Dashboard | Finanças",
        url: "dashboard-finances",
        icon: CircleDollarSign,
    },
    {
        title: "Sobre o projeto",
        url: "about",
        icon: CircleHelp,
    },
]

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent className="bg-[#fff] dark:bg-gray-800 text-black dark:text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white font-bold bg-[#3C83C4]">Churrascaria Rio Sul</SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
