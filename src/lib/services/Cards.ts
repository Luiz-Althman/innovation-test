import { api } from '../axios';

export const getCardsList = async (token: string) => {
    try {
        const response = await api.get('/produtos/listar', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.setItem('response', JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log('Erro ao buscar a lista dos produtos.');
        throw err;
    }
};

export const getFilteredCardsList = async (
    token: string,
    filters: { nome_produto: string; codigo_produto: string }
) => {
    try {
        const response = await api.post('/produtos/listar', filters, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos filtrados:', error);
        throw error;
    }
};
