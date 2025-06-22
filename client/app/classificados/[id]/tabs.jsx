'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic';
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsClassified({ obj }) {

    // console.log(obj)

    const MapsComponent = dynamic(
        () => import('./map'),
        { ssr: false }
    );

    return (
        <div className="w-full h-full">
            <Tabs defaultValue="descricao" className="w-full">
                <div className="">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-200">
                        {obj.descricao ? <TabsTrigger value="descricao">Descrição</TabsTrigger> : ''}
                        {obj.fabricanteVeiculo || obj.tipoImovel ? <TabsTrigger value="detalhes">Detalhes</TabsTrigger> : ''}
                        <TabsTrigger value="localizacao">Localização</TabsTrigger>
                    </TabsList>

                </div>
                {/* descricao */}
                <TabsContent value="descricao">
                    <Card className='p-8'>
                        <CardContent className="space-y-2" style={{ whiteSpace: 'pre-line' }}>
                            {obj.descricao}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* detalhes */}
                {obj.tipo == 'Veículo' ?
                    <TabsContent value="detalhes">
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Marca</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.fabricanteVeiculo}</div>
                                </CardContent>
                            </Card>
                            <Card>

                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Modelo</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.modeloVeiculo}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Kilometragem</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.kilometragem}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    :
                    // Sendo imóvel
                    <TabsContent value="detalhes">
                        <div className="grid grid-cols-3 space-x-2">
                            <Card className="mb-2">
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Tamanho</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.metrosQuadrados} M²</div>
                                </CardContent>
                            </Card>
                            <Card className="mb-2">
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Quartos</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.quartos}</div>
                                </CardContent>
                            </Card>
                            <Card className="mb-2">
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Banheiros</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.banheiros}</div>
                                </CardContent>
                            </Card>
                            <Card className="mb-2">
                                <CardContent className="">
                                    <div className="text-zinc-600 leading-tight">Tipo do Imóvel</div>
                                    <div className="text-zinc-800 font-medium leading-tight">{obj.tipoImovel}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                }

                {/* localização */}
                <TabsContent value="localizacao">
                    <Card className='p-8'>
                        <CardContent className="space-y-2">
                            <div>
                                <aside className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">

                                    <MapsComponent
                                        cidade={obj.cidade}
                                        estado={obj.estado}
                                    />
                                </aside>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    );

}