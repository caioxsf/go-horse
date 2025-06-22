'use client'
import { useRef } from "react";
import { apiClient } from "@/utils/apiClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Registro() {

  const email = useRef("");
  const senha = useRef("");
  const nome = useRef("");

  async function registrar() {
    if (email.current.value != "" && senha.current.value != "" && nome.current.value != "") {
      let obj = {
        email: email.current.value,
        nome: nome.current.value,
        senha: senha.current.value,
      }

      toast.promise(
        apiClient.post("/usuarios", obj),
        {
          loading: 'Cadastrando...',
          success: <b>Usuário cadastrado!</b>,
          error: <b>Erro ao cadastrar usuário</b>,
        }
      ).then(() => {
        window.location.href = '/login';
      });
    } else {
      toast.error("Preencha corretamente os campos do formulário!");
    }
  }


return (
  <div className="flex min-h-screen">

    <div className="hidden md:flex w-1/2 relative justify-center items-center overflow-hidden">
      <img
        src="/register.png"
        alt="Imagem de fundo"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10 text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Registre-se em nosso site</h1>
        <p className="text-lg">Venda com facilidade e segurança.</p>
      </div>
    </div>

    <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-blue-900 text-center">Crie sua conta</h2>
        <form className="space-y-4">
          <input
            ref={nome}
            type="text"
            placeholder="Nome completo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            ref={senha}
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={registrar}
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Registrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Já possui uma conta? <a href="/login" className="text-blue-500 hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  </div>

);
}