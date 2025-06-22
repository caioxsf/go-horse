"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";

import Carrossel from "@/components/carrossel";
import ClassifiedCard from "@/components/classifiedCard";
import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";
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

export default function Home() {
  const [classified, setClassified] = useState([]);
  const [inputBusca, setInputBusca] = useState("");
  const [produtosBuscados, setProdutosBuscados] = useState([]);
  const [tipoClassificado, setTipoClassificado] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  async function filtroCategoria() {
    let response = await apiClient.get("/tipo-classificado");
    if (response) {
      setTipoClassificado(response);
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

  async function getClassified() {
    const response = await apiClient.get("/classificados");
    if (response) {
      setClassified(response);
    }
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
        <Carrossel></Carrossel>
        <h1 className="p-6 text-3xl text-center">Classificados mais vistos!</h1>
        <div className="pl-6">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {produtosBuscados.length > 0
            ? produtosBuscados.map((produto) => (
                <ClassifiedCard
                  key={produto.idClassificado}
                  classified={produto}
                />
              ))
            : classified.map((value, index) => (
                <ClassifiedCard key={index} classified={value} />
              ))}
        </div>
      </main>
      <FooterLayout />
    </div>
  );
}
