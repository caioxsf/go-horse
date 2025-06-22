"use client";

import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const schema = z.object({
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .min(3, "Senha deve ter no mínimo 3 caracteres")
      .min(1, "Senha é obrigatória"),
  });

  const email = useRef("");
  const senha = useRef("");

  const router = useRouter();

  const { login } = useAuth();

  async function autenticar() {
    const obj = {
      email: email.current.value,
      senha: senha.current.value,
    };

    const result = schema.safeParse(obj);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const dadosValidados = result.data;

    // Mostra o toast de loading e guarda o id
    const toastId = toast.loading("Entrando...");

    try {
      let response = await apiClient.post("/auth/token", dadosValidados);
      if (response) {
        apiClient.setJwt(response.token);
        localStorage.setItem("jwt", response.token);
        localStorage.setItem("user", JSON.stringify(response));

        login(response);

        toast.success("Login realizado com sucesso!", { id: toastId });
        router.push("/");
      } else {
        toast.error("Falha ao fazer login.", { id: toastId });
      }
    } catch (e) {
      toast.error("Erro na autenticação.", { id: toastId });
    }
  }

  return (
    <div className="flex min-h-screen ">
      <div className="hidden md:flex w-1/2 relative justify-center items-center overflow-hidden">
        <img
          src="/login.png"
          alt="Imagem de fundo"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-65"></div>
        <div className="relative z-10 text-white text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Entre agora mesmo</h1>
          <p className="text-lg">Conecte-se com facilidade e segurança.</p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl font-semibold text-blue-900 text-center">
            Faça seu login
          </h2>
          <form className="space-y-4">
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
              onClick={autenticar}
              type="button"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Entrar
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Não possui uma conta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Crie agora mesmo!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}