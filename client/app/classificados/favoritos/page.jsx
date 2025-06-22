'use client'

import { useAuth } from "@/app/context/AuthContext"
import ClassifiedCard from "@/components/classifiedCard";
import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";
import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";


export default function ClassificadosFavoritos() {



    const [favoritos, setFavoritos] = useState([]);
    const [classified, setClassified] = useState([]);
    const { usuario, logout } = useAuth();

    async function ListarFavoritos() {
        const response = await apiClient.get('/meus-salvos')
        if (response) {
            console.log(response)
            setFavoritos(response)
        }

    }

    useEffect(() => {
        ListarFavoritos()
    }, [])

    return (
        <div>
            <HeaderLayout></HeaderLayout>
            <main className="pt-20 px-4 bg-gray-100 min-h-screen mb-10">
                <h1 className="p-6 text-3xl text-start">Meus favoritos!</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {favoritos.length > 0 ? (
                        favoritos.map((value, index) => (
                            <ClassifiedCard key={index} classified={value} isFavorited={true} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">Nenhum classificado foi salvo.</p>
                    )}
                </div>
            </main>
            <FooterLayout></FooterLayout>
        </div>
    )
}