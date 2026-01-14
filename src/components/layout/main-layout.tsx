import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden selection:bg-primary/30 selection:text-white">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
