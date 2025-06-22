'use client'

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

export default function ImovelForm({ imovelInfo, setImovelInfo, tipoImovelSelecionado }) {

    const [tipoImovel, setTipoImovel] = useState([])
    const [tipoSelecionado, setTipoSelecionado] = useState('0');

    async function getTipoImovel() {
        let response = await apiClient.get(`/tipo-imovel`);
        if (response) {
            // console.log(response)
            setTipoImovel(response);
        }
    }

    useEffect(() => {
        getTipoImovel();
    }, [])

    useEffect(() => {
        setTipoSelecionado(tipoImovelSelecionado ? String(tipoImovelSelecionado) : "0");
    }, [tipoImovelSelecionado])

    const handleChange = (e) => {
        setImovelInfo({ ...imovelInfo, tipo_imovel: e.target.value })
        setTipoSelecionado(e.target.value);
    };

    return (
        <div>

            <div className="border rounded p-4 shadow-sm bg-white">
                <label className="text-md font-semibold mb-2">Quartos</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Ex: 3"
                    value={imovelInfo.quartos || ""}
                    onChange={(e) =>
                        setImovelInfo({ ...imovelInfo, quartos: e.target.value })
                    }
                />

                <label className="text-md font-semibold mb-2">Banheiros</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Ex: 1"
                    value={imovelInfo.banheiros || ""}
                    onChange={(e) =>
                        setImovelInfo({ ...imovelInfo, banheiros: e.target.value })
                    }
                />

                <label className="text-md font-semibold mb-2">Metros quadrados</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Ex: 30"
                    value={imovelInfo.metros || ""}
                    onChange={(e) =>
                        setImovelInfo({ ...imovelInfo, metros: e.target.value })
                    }
                />

                <select className="w-full p-2 border rounded mb-2"
                    value={tipoSelecionado}
                    onChange={handleChange}
                >
                    <option value="0" disabled>Selecione o tipo de imovel</option>
                    {tipoImovel.map((imovel) => (
                        <option key={imovel.id} value={imovel.id}>
                            {imovel.descricao}
                        </option>
                    ))}
                </select>
            </div>


        </div>
    );

}