'use client'

import React from 'react';

export default function MoedaFormatada({ valor }) {

    const parseValue = parseFloat(valor)

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (<span>{formatarMoeda(parseValue)}</span>);
}
