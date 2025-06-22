'use client'

import CreateClassified from "@/components/createClassified";
import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";

export default function AnunciarPage() {
    return (
        <div>
            <HeaderLayout></HeaderLayout>
            <main className="pt-20 px-4 bg-gray-100 min-h-screen mb-10">
                <CreateClassified></CreateClassified>
            </main>
            <FooterLayout></FooterLayout>
        </div>
    );
}