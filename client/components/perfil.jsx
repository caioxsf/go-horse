"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { apiClient } from '@/utils/apiClient';
import { LogOut, UserRound } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"
import MensagensComModal from "./mensagenRecebidasModal"


export function Perfil() {

    const {usuario, logout} = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><UserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{usuario.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* <div className="flex justify-start px-2">
                    <Link href="/perfil" className="items-center text-sm w-full">Editar Perfil</Link>
                </div> */}
                {/* <DropdownMenuSeparator /> */}
                <div className="flex justify-start px-2">
                    <Link href="/meus-classificados" className="items-center text-sm w-full">Meus classificados</Link>
                </div>
                <DropdownMenuSeparator />
                <div className="flex justify-start px-2">
                    <Link href="/classificados/favoritos" className="items-center text-sm w-full">Meus favoritos</Link>
                </div>
                <DropdownMenuSeparator />
                <div className="flex justify-start px-2">
                    <MensagensComModal></MensagensComModal>
                </div>
                <DropdownMenuSeparator />
                <div className="flex justify-start px-2">
                <LogOut className="w-4"/>
                    <button onClick={logout} className="items-center text-sm w-full text-start px-1">Sair</button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
