'use client'

import ChatRoom from "@/components/chatRoom"
import { AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Dialog } from "@radix-ui/react-dialog"
import { Heart, Share2 } from 'lucide-react';
import { apiClient } from "@/utils/apiClient";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { cn } from '@/lib/utils';

export default function AdvertiserCard({ obj }) {

    const { usuario } = useAuth();

    async function salvarClassificado(e) {

        if (!usuario) {
            e.stopPropagation();
            e.preventDefault();
            toast.error('Você precisa estar logado para favoritar um classificado!', {
                icon: '⚠️',
                style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#000',
                },
            });
            return;
        } else {
            e.stopPropagation();
            e.preventDefault();
            let response = await apiClient.post(`/salvo/${obj.idClassificado}`)
            if (response) {
                toast('Você adicionou esse classificado aos favoritos!',
                    {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#fff',
                            color: '#000',
                        },
                    }
                );
            }
        }



    }


    const classificado = usuario?.id
        ? {
            usuario_classificado_id: obj.usu_id,
            usuario_logado_id: usuario.id,
            classificado_id: obj.idClassificado,
        }
        : null;



    return (
        <div className="flex flex-col gap-8 justify-center">
            <div className="w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[500px]">
                <Card className="">
                    <CardHeader>
                        <div className="flex">
                            <span>
                                <Avatar className="">
                                    <AvatarImage className="w-10 h-10 mr-2 mb-2" src="https://img.freepik.com/vetores-gratis/circulo-azul-com-usuario-branco_78370-4707.jpg?semt=ais_hybrid&w=740" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </span>
                            <span>
                                <CardTitle>{obj.usuario}</CardTitle>
                                <CardDescription>Membro desde {obj.dataCadastro}</CardDescription>
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                {(usuario?.id && usuario.id !== obj.usu_id) && (
                                    <ChatRoom classificado={classificado} />
                                )}
                                <Button variant={'outline'} className="w-full max-w-1/2">Contato</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div >


            <div className="w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[500px]">
                <Card className="">
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={salvarClassificado} className="flex items-center space-x-2">
                                <Heart
                                    className={cn(
                                        'h-4 w-4', 'fill-destructive text-destructive'
                                    )}
                                />
                                <span>Favoritar</span>
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <Share2 className="h-4 w-4" />
                                <span>Compartilhar</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div >


            <div className="w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[500px]">
                <Card className="bg-blue-200 text-zinc-700">
                    <CardContent>
                        <div className="flex justify-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                            <h3>Recomendações para uma compra segura:</h3>
                        </div>
                        <ul>
                            <li>
                                <div className="flex justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    Conheça o vendedor pessoalmente
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    Verifique o produto antes de comprar
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    Pague somente após receber o produto
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    Não envie dinheiro antecipadamente
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    Comunique-se pela plataforma
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div >
        </div >
    );
}