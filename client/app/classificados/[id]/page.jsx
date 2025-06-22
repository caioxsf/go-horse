'use client'

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/utils/apiClient";

import AdvertiserCard from "./advertiserCard"

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ClassifiedImageCardDetail from "@/components/classifiedImageCardDetail";
import { Badge } from "@/components/ui/badge";
import TabsClassified from "./tabs";
import MoedaFormatada from "@/components/moeda";
import { Eye, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ClassifiedDetails() {

    const { id } = useParams();

    const { usuario, logout } = useAuth();

    const [classificado, setClassificado] = useState(null)
    const [loading, setLoading] = useState(true);

    async function getClassified() {
        let response = await apiClient.get("/classificados/" + id);
        if (response) {
            setClassificado(response);
        }
        setLoading(false);
    }

    useEffect(() => {
        getClassified()
    }, [])

    if (!classificado) {
        return (
            <div>
                Classificado não encontrado
            </div>
        )
    }

    return (
        loading ? 'Loading' :
            <div id="main-grid" className="container mx-auto px-2 md:px-6 mb-24">
                {/* Breadcrumb */}
                <div id="breadcrumb" className="mb-4">
                    {
                        loading ?
                            <span className="m-4">
                                <Skeleton className="h-4 w-120 bg-gray-200 rounded-md"></Skeleton>
                            </span>
                            :
                            <span className="mb-10">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Início</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">{classificado[0].tipo}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{classificado[0].titulo}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </span>
                    }
                </div>
                {/* Grid principal responsivo */}
                <div 
                    id="classified-grid" 
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {/* Left Grid */}
                    <div id="classified-column-1" className="md:col-span-2 col-span-1">
                        {/* Imagem maior */}
                        <div id="" className="w-full">
                            <div id="img-maior">
                                {
                                    loading ?
                                        <Skeleton className="h-60 md:h-80 w-full bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <ClassifiedImageCardDetail id={classificado[0].idClassificado}></ClassifiedImageCardDetail>
                                }

                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span id="title-classifed" className="mt-4 text-zinc-500 font-medium">
                                {
                                    loading ?
                                        <Skeleton className="h-4 w-60 md:w-120 bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <h1 className="text-xl md:text-2xl font-bold text-zinc-800">{classificado[0].titulo}</h1>
                                }
                                <div className="flex flex-col sm:flex-row justify-start gap-2 md:gap-5 items-start md:items-center mt-2 mb-2">
                                    <span className="text-sm md:text-md flex flex-row justify-items-start items-center"><MapPin className="w-4" />&nbsp;{loading ? '' : classificado[0].cidade + ', ' + classificado[0].estado}</span>
                                    <span className="text-sm md:text-md flex flex-row justify-items-start items-center"><Clock className="w-4"/>&nbsp;Públicado {classificado[0].dataPublicacao}</span>
                                    {/* <span className="text-sm md:text-md flex flex-row justify-items-start "><Eye className="w-4" />&nbsp;{classificado[0].numeroVisualizacao} visualizações</span> */}
                                </div>
                            </span>

                            <span className="mb-4 mt-2">
                                {loading ?
                                    <Skeleton className="h-4 w-32 md:w-120 bg-gray-200 rounded-md"></Skeleton>
                                    :
                                    <Badge variant={classificado[0].condicao == 'Novo' ? 'default' : 'secondary'} className="bg-blue-200 text-blue-500">{classificado[0].condicao}</Badge>
                                }
                            </span>
                            <span className="mb-8">
                                {
                                    loading ?
                                        <Skeleton className="h-4 w-32 md:w-120 bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <p className="text-xl md:text-2xl font-bold text-[var(--blue100)]"> <MoedaFormatada valor={classificado[0].valor}></MoedaFormatada>
                                        </p>
                                }
                            </span>
                            <TabsClassified obj={classificado[0]}></TabsClassified>
                        </div>
                    </div>

                    {/* Right grid */}
                    <div 
                        id="classified-column-2" 
                        className="col-span-1 w-full h-full mt-6 md:mt-0"
                    >
                        <AdvertiserCard obj={classificado[0]}></AdvertiserCard>
                    </div>
                </div>
            </div >
    );
}