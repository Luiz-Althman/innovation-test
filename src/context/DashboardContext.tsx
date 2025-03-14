'use client';
import React from 'react';
import { getCardsList } from '@/lib/services/Cards';
import { useState, useEffect } from 'react';
import nookies from 'nookies';

export interface CardsProps {
    nome: string;
    codigo: string;
    codigo_categoria: string;
    imagem: string;
    preco: string;
    descricao: string;
    referencia: string;
}

export const colors = ['black', 'red', 'blue', 'brown', 'green', 'yellow'];

export interface IDashboardContext {
    card: CardsProps[];
    setCard: React.Dispatch<React.SetStateAction<CardsProps[]>>;
    tokenFromCookie: string;
    originalCards: CardsProps[];
}

interface DashboardProps {
    children: React.ReactNode;
}

const DashboardContext = React.createContext({} as IDashboardContext);

const DashboardProvider: React.FC<DashboardProps> = ({ children }) => {
    const [card, setCard] = useState<CardsProps[]>([]);
    const [originalCards] = useState<CardsProps[]>([]);
    const cookies = nookies.get();
    const tokenFromCookie = cookies['innovation:access_token'];

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cookies = nookies.get();
                const tokenFromCookie = cookies['innovation:access_token'];
                const data = await getCardsList(tokenFromCookie);
                setCard(data);
            } catch (error) {
                console.error('Erro ao buscar os cards:', error);
            }
        };

        fetchCards();
    }, []);

    const value = React.useMemo(
        () => ({
            card,
            setCard,
            tokenFromCookie,
            originalCards,
        }),
        [card, setCard, tokenFromCookie, originalCards]
    );

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = (): IDashboardContext =>
    React.useContext<IDashboardContext>(DashboardContext);

export const { Consumer } = DashboardContext;

export { DashboardProvider };
