'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiClient } from '@/utils/apiClient';


export default function ClassifiedImageCardDetail({ id }) {

    const [imagens, setImagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [indexAtual, setIndexAtual] = useState(0);

    async function getImages() {
        let response = await apiClient.get("/classificados/imagens/" + id);

        const arr = response.map((value) => {
            return value.imagem
        })

        setImagens(arr);

        setLoading(false);
    }

    useEffect(() => {
        getImages();
    }, [id])

    const proximo = () => {
        setIndexAtual((prevIndex) =>
            prevIndex === imagens.length - 1 ? 0 : prevIndex + 1
        );
    };

    const anterior = () => {
        setIndexAtual((prevIndex) =>
            prevIndex === 0 ? imagens.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-[1600px] mx-auto overflow-hidden rounded">
            <div className='grid grid-rows gap-4 place-items-center'>
                <div className="flex transition-transform duration-500 " style={{ transform: `translateX(-${indexAtual * 100}%)` }}>
                    {imagens.length > 0 ? (
                        imagens.map((src, index) => (
                            <div key={index} className="relative min-w-full h-[400px] shadow-lg bg-gray-200">
                                <Image
                                    src={src}
                                    alt={`img ${index}`}
                                    width={1600}
                                    height={800}
                                    className="object-contain rounded-lg"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="relative min-w-full h-[400px] shadow-lg bg-gray-200">
                            <Image
                                src="/imovel-sem-foto.jpg"
                                alt="Imagem imóvel"
                                width={1600}
                                height={800}
                                className="object-contain rounded-lg"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={anterior}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow"
            >
                <ChevronLeft />
            </button>
            <button
                onClick={proximo}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow"
            >
                <ChevronRight />
            </button>
            <div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {imagens.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setIndexAtual(i)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${i === indexAtual ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>


        </div >
    );
}