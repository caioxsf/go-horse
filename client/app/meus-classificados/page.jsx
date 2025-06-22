'use client';

import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";
import MeusClassificadosComponent from "@/components/meusClassificados";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { useAuth } from "../context/AuthContext";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function MeusClassificados() {

    const { usuario, logout } = useAuth();
    const [classified, setClassified] = useState([]);
    const [produtosBuscados, setProdutosBuscados] = useState([]);
    const [tipoClassificado, setTipoClassificado] = useState([]);
    const [inputBusca, setInputBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    async function getClassified() {
        const response = await apiClient.get('/meus-classificados');
        setClassified(response);
    }

    async function filtroCategoria() {
        let response = await apiClient.get("/tipo-classificado");
        if (response) {
            setTipoClassificado(response);
            // console.log(response);
        }
    }

    async function filtroPorCategoria(descricao) {
        setCategoriaSelecionada(descricao);

        if (descricao === "all") {
            await getClassified();
            setProdutosBuscados([]);
            return;
        }

        const filtrados = classified.filter((item) => item.tipo === descricao);

        if (filtrados.length === 0) {
            toast.error("Nenhum produto encontrado");
            setProdutosBuscados([]);
            return;
        }

        setProdutosBuscados(filtrados);
    }

    async function buscarProdutos() {
        if (inputBusca.trim() === "") {
            await getClassified();
            setProdutosBuscados([]);
            return;
        }
        let response = await apiClient.get(
            `/classificados/busca?termo=${encodeURIComponent(inputBusca)}`
        );

        if (response.length === 0) {
            toast.error("Nenhum produto encontrado");
            setProdutosBuscados([]);
        } else {
            setProdutosBuscados(response);
        }
        setInputBusca("");
    }

    useEffect(() => {
        getClassified();
        filtroCategoria();
    }, []);

    return (
        <div>
            <HeaderLayout
                inputBusca={inputBusca}
                setInputBusca={setInputBusca}
                buscarProdutos={buscarProdutos}
                filtroPorCategoria={filtroPorCategoria}
            />
            <main className="pt-20 px-4 bg-gray-100 min-h-screen mb-10">
                <h1 className="p-6 text-3xl text-start">Meus classificados!</h1>
                <div className="pl-6">
                    {
                        classified ? (
                            <Select onValueChange={filtroPorCategoria}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filtro por categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categorias</SelectLabel>
                                        <SelectItem value="all">Todas</SelectItem>
                                        {tipoClassificado.map((value) => (
                                            <SelectItem
                                                key={value.descricao}
                                                value={String(value.descricao)}
                                            >
                                                {value.descricao}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <></>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {classified ? (
                        classified.map((value, index) =>
                            <MeusClassificadosComponent key={index} classified={value} />
                        )
                    ) : (
                        <div className="col-span-full text-start text-gray-500">Nenhum classificado encontrado.</div>
                    )}
                </div>
            </main>
            <FooterLayout />
        </div>
    );
}
