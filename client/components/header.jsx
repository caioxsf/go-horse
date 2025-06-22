"use client";

import { Search, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { Perfil } from "./perfil";
import { Input } from "./ui/input";
import { useAuth } from "@/app/context/AuthContext";

export default function HeaderLayout({
  inputBusca,
  setInputBusca,
  buscarProdutos,
  filtroPorCategoria
}) {
  const [usuarioLogado, setUsuarioLogado] = useState([]);

  const { usuario } = useAuth();

  async function perfilUsuarioLogado() {
    let response = await apiClient.get("/auth/perfil");
    if (response) {
      setUsuarioLogado(response);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      perfilUsuarioLogado();
    }
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold whitespace-nowrap">
            <a href="/">
              <img src="/logo.png" alt="" width={"70px"} />
            </a>
          </div>

          <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
            {/* <button onClick={() => filtroPorCategoria("Imóvel")} className="hover:text-blue-600">Imóveis</button>
            <button onClick={() => filtroPorCategoria("Veículo")} className="hover:text-blue-600">Veículos</button>
            <button onClick={() => filtroPorCategoria("Item")} className="hover:text-blue-600">Itens</button> */}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center gap-3">
            <Input
              placeholder="Buscar..."
              type="text"
              value={inputBusca}
              onChange={(e) => setInputBusca(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              className="text-gray-600 hover:text-blue-600"
              onClick={buscarProdutos}
            >
              <Search size={18} />
            </button>
          </div>

          {usuarioLogado != "" ? (
            <Link
              href={"/anunciar"}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              <PlusCircle size={16} className="mr-1" />
              Anunciar
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              <PlusCircle size={16} className="mr-1" />
              Anunciar
            </Link>
          )}

          {usuarioLogado != "" ? (
            <>
              <span className="text-sm font-semibold text-gray-700">
                Olá, {usuarioLogado.nome.split(" ")[0]}
              </span>
              <Perfil className="px-3"></Perfil>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Entrar
              </a>
              <a
                href="/register"
                className="text-sm border border-gray-300 hover:border-blue-500 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600"
              >
                Cadastrar
              </a>
            </>
          )}

          {/* <a href="/login" className="text-sm text-gray-700 hover:text-blue-600">Entrar</a>
          <a href="/register" className="text-sm border border-gray-300 hover:border-blue-500 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600">
            Cadastrar
          </a> */}
        </div>
      </div>
    </header>
  );
}
