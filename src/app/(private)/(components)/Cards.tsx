'use client';

import { formatPrice } from '@/lib/constants/formatPrice';

import { CardsProps, colors, useDashboard } from '@/context/DashboardContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Cards() {
    const { card } = useDashboard();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {card &&
                card.map((card: CardsProps) => (
                    <div key={card.codigo}>
                        <div className="flex flex-col justify-center items-center">
                            <h4 className="font-bold text-zinc-900">
                                {card.nome.slice(0, 20) + '...'}
                            </h4>
                            <span className="text-zinc-800">{card.codigo}</span>
                        </div>
                        <div className="flex flex-col border border-zinc-300 h-[330px] p-3 w-full">
                            <Image
                                src={card.imagem}
                                width={120}
                                height={120}
                                className="mx-auto"
                                alt="Imagem do produto"
                            />
                            <p className="text-zinc-900">
                                {card.descricao.slice(0, 45) + '...'}
                            </p>
                            <div className="flex flex-col gap-2 pt-1">
                                <p className="text-zinc-900 font-bold">
                                    Cores:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {colors.map((color) => (
                                        <span
                                            key={color}
                                            className={`w-3 h-3 rounded-full cursor-pointer`}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-end pb--2">
                                <p className="text-zinc-900 text-xs">
                                    A partir de
                                </p>
                                <p className="text-zinc-900 font-bold">
                                    {formatPrice(card.preco)}
                                </p>
                                <p className="text-zinc-900 text-xs">
                                    gerado pela melhor oferta
                                </p>
                            </div>
                        </div>
                        <Button
                            type="button"
                            className="bg-green-innovation flex-1 w-full text-white my-4 cursor-pointer hover:bg-green-innovation/80"
                        >
                            Confira
                        </Button>
                    </div>
                ))}
        </div>
    );
}
