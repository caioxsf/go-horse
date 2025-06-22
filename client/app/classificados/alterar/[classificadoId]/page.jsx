'use client'

import CreateClassified from "@/components/createClassified";
import React from "react";
import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";


export default function AlterarClassificado({ params }) {
    const { classificadoId } = React.use(params);
   
    return (
        <div>
            <HeaderLayout></HeaderLayout>
            <main className="pt-20 px-4 bg-gray-100 min-h-screen mb-10">
                <CreateClassified classificadoAlteracao={classificadoId} />
            </main>
            <FooterLayout></FooterLayout>
        </div>
    );
}