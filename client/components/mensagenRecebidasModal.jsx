"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { apiClient } from "@/utils/apiClient"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import ChatRoom from "./chatRoom"

export default function MensagensComModal() {
  const [open, setOpen] = useState(false)
  const [mensagens, setMensagens] = useState([])
  const { usuario } = useAuth()
  const [images, setImages] = useState([]);

  async function getSalas() {
    const response = await apiClient.get(`/chat/mensagens-recebidas`)
    if (response) {
      setMensagens(response)
    }
  }

  //const id = mensagens[0].classificado_id;
  //console.log(id)

  async function getImages(id) {
    let response = await apiClient.get(`/classificados/imagens/` + id);
    if (response) {
      setImages(response);
      console.log(response)
    }
  }

  useEffect(() => {
    if (Array.isArray(mensagens) && mensagens.length > 0) {
      const id = mensagens[0]?.classificado_id;
      if (id) {
        getImages(id);
      }
    }
  }, [mensagens]);

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <>
      <div className="flex justify-start">
        <button
          type="button"
          className="items-center text-sm w-full text-left"
          onClick={() => setOpen(true)}
        >
          Mensagens
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mensagens</DialogTitle>
            <DialogDescription>
              Aqui você pode ver suas mensagens recebidas e enviadas.
            </DialogDescription>
          </DialogHeader>
          <div>
            {mensagens.map((value, idx) => {

              const classificado = {
                usuario_classificado_id: value.user_vendedor,
                usuario_logado_id: usuario.id,
                classificado_id: value.classificado_id,
                usuario_comprador: value.user_comprador_id,
                sala_id: value.sala_id
              }

              return (
                <Card
                  className="w-full max-w-md rounded-xl border bg-white shadow-sm px-4 py-3 mb-5"
                  key={value.sala_id || idx}
                >
                  <div className="flex items-start gap-4">
                    {/* {
                      images.length > 0 && images ?
                        <img
                          src={images[0].imagem}
                          className="h-16 w-16 rounded-md object-cover border"
                        />
                        :
                        <img src="/imovel-sem-foto.jpg" className="h-16 w-16 rounded-md object-cover border" alt="Imagem imóvel"></img>
                    } */}
                    {/* <img
                      src="https://via.placeholder.com/64"
                      className="h-16 w-16 rounded-md object-cover border"
                    /> */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900">{value.titulo}</h2>
                      </div>

                      <div className="text-gray-700 text-sm mt-1">
                        <span className="font-medium">Sala #{value.sala_id}</span>
                        <span className="mx-1">·</span>
                        <span className="text-gray-500">{value.user_comprador}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Conversa iniciada {value.dataPubNew}
                      </p>
                    </div>

                  </div>
                  <ChatRoom classificado={classificado} />
                </Card>
              )
            })}
          </div>
          <DialogFooter>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setOpen(false)}
              type="button"
            >
              Fechar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}