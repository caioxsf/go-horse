'use client'

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

export default function veiculoForm({ veiculoInfo, setVeiculoInfo, modeloSelecionado }) {

    const [modeloVeiculo, setModeloVeiculo] = useState([])
    const [tipoSelecionado, setTipoSelecionado] = useState(modeloSelecionado || '0');

    async function getModeloVeiculo() {
        let response = await apiClient.get(`/modelo-veiculos`);
        if (response) {
            setModeloVeiculo(response);
        }
    }

    useEffect(() => {
        getModeloVeiculo();
    }, [])

    useEffect(() => {
       setTipoSelecionado(modeloSelecionado ? String(modeloSelecionado) : "0");
    }, [modeloSelecionado])

    const handleChange = (e) => {
        setVeiculoInfo({ ...veiculoInfo, modeloVeiculo: e.target.value })
        setTipoSelecionado(e.target.value); 
      };

    return (
        <div>

            <div className="border rounded p-4 shadow-sm bg-white">
                <label className="text-md font-semibold mb-2">Ano</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Ex: 2015"
                    value={veiculoInfo.ano || ""}
                    onChange={(e) =>
                        setVeiculoInfo({ ...veiculoInfo, ano: e.target.value })
                      }
                />

                <label className="text-md font-semibold mb-2">Kilometragem</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Ex: 120.000"
                    value={veiculoInfo.kilometragem || ""}
                    onChange={(e) =>
                        setVeiculoInfo({ ...veiculoInfo, kilometragem: e.target.value })
                      }
                />

                <select className="w-full p-2 border rounded mb-2"
                    value={tipoSelecionado}
                    onChange={handleChange}
                >
                    <option value="0" disabled>Selecione o modelo do carro</option>
                    {modeloVeiculo.map((veiculos) => (
                        <option key={veiculos.id} value={veiculos.id}>
                            {veiculos.nome}
                        </option>
                    ))}
                </select>
            </div>


        </div>
    );
}