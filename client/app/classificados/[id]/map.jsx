'use client';

import { useEffect, useState } from "react";

export default function MapsComponent({ cidade, estado}) {
  const [center, setCenter] = useState(null);
  const [erro, setErro] = useState(null);

  async function getLatLng(city, state) {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=Brasil&format=json`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'SeuApp/1.0 (email@email.com)' }
    });
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon)
      };
    } else {
      throw new Error("Localização não encontrada!");
    }
  }

  useEffect(() => {
    getLatLng(cidade, estado)
      .then(setCenter)
      .catch((e) => setErro(e.message));
  }, [cidade, estado]);

  if (erro) return <div>Erro ao carregar mapa: {erro}</div>;
  if (!center) return <div>Carregando localização...</div>;

  return (
    <div className="w-full h-[400px] rounded shadow border">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${center.lng-0.01},${center.lat-0.01},${center.lng+0.01},${center.lat+0.01}&layer=mapnik&marker=${center.lat},${center.lng}`}
        style={{ border: 0 }}
        allowFullScreen
        title="Mapa"
      />
    </div>
  );
}