'use client'

import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react"
import { apiClient } from "@/utils/apiClient";
import { useAuth } from "@/app/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogTrigger, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X, Eye } from "lucide-react";
import Link from "next/link";

export default function ChatRoom({ classificado }) {
    const { usuario } = useAuth();
    const inputMSG = useRef(null);
    const socketRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [sala, setSala] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [carregandoSala, setCarregandoSala] = useState(false);
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        if (dialogOpen) {
            socketRef.current = io("https://projetos-go-horse-client.lp3jkk.easypanel.host");
        } else if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }

        if (!dialogOpen) {
            setSala(null);
            setMessages([]);
        }

    }, [dialogOpen]);


    useEffect(() => {
        if (dialogOpen && !sala && !carregandoSala) {
            if (classificado.sala_id) {
                setSala(classificado.sala_id);
            } else {
                obterIdSala();
            }
        }
    }, [dialogOpen]);


    async function obterIdSala() {
        setCarregandoSala(true);
        try {
            const data = {
                user1: usuario.id,
                user2: classificado.usuario_classificado_id,
                cla_id: classificado.classificado_id
            }

            if (!data.user1 || !data.user2 || !data.cla_id) {
                setCarregandoSala(false);
                return;
            }
            const response = await apiClient.post("/chat/room", data);
            setSala(response.sala_id);
        }
        catch (err) {
            console.log(err);
        }
        setCarregandoSala(false);
    }

    async function obterMensagens(salaId) {
        const response = await apiClient.post('/chat/msgs', { sala_id: salaId });
        setMessages(response || []);
        console.log("Mensages", response)
    }

    async function obterNome(user1, user2) {
        const response = await apiClient.get(`/classificados/usuarios-nome/${user1}/${user2}`);
        setUsuarios(response)
        console.log(response)
    }

    function getDestinatario() {
        const ids = [
            classificado.usuario_classificado_id,
            classificado.usuario_comprador
        ];
        return ids.find(id => id && id !== usuario.id);
    }

    async function sendMessage(e) {
        e.preventDefault();
        const text = inputMSG.current.value.trim();
        if (!text || !socketRef.current || !sala) return;

        const dataFormatada = new Date().toISOString();
        const msg = {
            texto: text,
            sala_id: sala,
            remetente: usuario.id,
            data: new Date().toISOString(),
            destinatario: getDestinatario(),
        };

        console.log("✉️ Enviando mensagem:", msg);
        socketRef.current.emit('chat message', msg);
        inputMSG.current.value = "";
    }

    useEffect(() => {
        obterNome(usuario.id, getDestinatario())

        if (!sala || !socketRef.current) return;

        socketRef.current.emit('entrar sala', sala);
        obterMensagens(sala);

        function onConnectError(err) {
            console.error("❌ Erro na conexão:", err.message);
        }
        const onChatMessage = (msg) => {
            console.log("Mensagem recebida no socket:", msg);
            setMessages((prev) => [...prev, msg]);
        };

        socketRef.current.on("connect_error", onConnectError);
        socketRef.current.on("chat message", onChatMessage);

        return () => {
            socketRef.current?.off("connect_error", onConnectError);
            socketRef.current?.off("chat message", onChatMessage);
        };
    }, [sala]);

    function handleDialogChange(open) {
        setDialogOpen(open);
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button className="text-white w-55">
                    Mensagem
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-white max-w-lg mx-auto">
                <div className="flex flex-col w-full h-[70vh] md:h-[60vh] bg-[#F5F8FA] rounded-lg shadow-xl overflow-hidden">
                    <div className="relative flex items-center justify-between bg-[#0865BA] text-white p-5 shadow-md">
                        <div>
                            <span className="text-xl font-bold">Chat em Tempo Real</span>
                            <span className="ml-4 text-xs font-normal opacity-70">Sala #{sala ?? ''}</span><br></br>

                            <Link href={`/classificados/${classificado.classificado_id}`}><span className="text-xs font-normal opacity-70">Ver classificado</span></Link>


                        </div>
                        <DialogClose asChild>
                            <button
                                className="absolute bg-[#E6690B] z-100 top-4 right-3 w-8 h-8 flex items-center justify-center rounded-full transition hover:bg-[#e6490b] focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Fechar"
                                type="button"
                            >
                                <X className="w-6 h-6 text-white relative" />
                            </button>
                        </DialogClose>
                    </div>

                    <ul className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                        {messages.map((m, i) => {
                            const isMe = m.remetente === usuario.id;
                            const remetente = usuarios.find(u => u.id === m.remetente);

                            const dataISO = m.data || m.men_data
                            const dataFormatada = dataISO
                                ? new Date(dataISO).toLocaleString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                : '';

                            return (
                                <li
                                    key={`${m.id ?? 'noid'}-${i}`}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end`}
                                >
                                    <span
                                        className={[
                                            'px-5 py-3 rounded-2xl max-w-xs break-words shadow-lg text-base',
                                            isMe
                                                ? 'bg-[#0865BA] text-white rounded-br-md animate-slide-in-right'
                                                : 'bg-[#E6690B] text-white rounded-bl-md animate-slide-in-left'
                                        ].join(' ')}
                                        style={{ wordBreak: "break-word" }}
                                    >

                                        {isMe ? (
                                            <span className="block text-sm font-medium mb-1">Você</span>
                                        ) : (
                                            remetente?.nome && (
                                                <span className="block text-sm font-medium mb-1">{remetente.nome}</span>
                                            )
                                        )}
                                        <span className="block mb-1">{m.texto}</span>
                                        <span className="block text-xs text-white/80 text-right">{dataFormatada}</span>
                                    </span>
                                </li>
                            );
                        })}
                        {carregandoSala && (
                            <li className="text-gray-500 text-center">Carregando sala...</li>
                        )}
                    </ul>
                    {/* Input */}
                    <form
                        onSubmit={sendMessage}
                        className="flex items-center gap-2 p-4 bg-white border-t border-gray-200"
                    >
                        <input
                            ref={inputMSG}
                            type="text"
                            placeholder="Digite sua mensagem..."
                            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0865BA] transition-all placeholder-gray-400 bg-gray-100"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="bg-[#E6690B] hover:bg-[#ca5605] text-white px-6 py-2 rounded-full font-bold shadow-md transition-colors duration-200"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #0865BA33;
                        border-radius: 4px;
                    }
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #0865BA33 #F5F8FA;
                    }
                    /* Animations */
                    @keyframes slide-in-right {
                        0% { transform: translateX(30px); opacity: 0;}
                        100% { transform: translateX(0); opacity: 1;}
                    }
                    @keyframes slide-in-left {
                        0% { transform: translateX(-30px); opacity: 0;}
                        100% { transform: translateX(0); opacity: 1;}
                    }
                    .animate-slide-in-right {
                        animation: slide-in-right 0.18s ease;
                    }
                    .animate-slide-in-left {
                        animation: slide-in-left 0.18s ease;
                    }
                `}</style>
            </DialogContent>
        </Dialog>
    )
}