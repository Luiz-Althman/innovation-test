'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboard } from '@/context/DashboardContext';
import { getFilteredCardsList, getCardsList } from '@/lib/services/Cards';
import { useForm } from 'react-hook-form';

type FilterValues = {
    nome_produto?: string;
    codigo_produto?: string;
};

export function Filter() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const { tokenFromCookie, setCard } = useDashboard();

    const handleFilter = async (values: FilterValues) => {
        try {
            const filters = {
                nome_produto: values.nome_produto || '',
                codigo_produto: values.codigo_produto || '',
            };

            if (!filters.nome_produto && !filters.codigo_produto) {
                const data = await getCardsList(tokenFromCookie);
                setCard(data);
                return;
            }

            const data = await getFilteredCardsList(tokenFromCookie, filters);

            setCard(data);
        } catch (err) {
            console.error('Erro ao buscar produtos filtrados:', err);
        }
    };

    return (
        <form
            className="flex flex-col md:flex-row md:justify-end pb-8 gap-2"
            onSubmit={handleSubmit(handleFilter)}
        >
            <Input
                type="text"
                placeholder="Filtrar por nome do produto"
                className="w-full md:w-[210px]"
                {...register('nome_produto')}
            />
            <Input
                type="text"
                placeholder="Filtrar por código do produto"
                className="w-full md:w-[210px]"
                {...register('codigo_produto')}
            />
            <Button
                type="submit"
                className="bg-green-innovation hover:bg-green-innovation/80 cursor-pointer"
                disabled={isSubmitting}
            >
                Filtrar
            </Button>
        </form>
    );
}
