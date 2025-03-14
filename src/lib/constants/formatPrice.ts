export function formatPrice(valor: string | number) {
    const number = typeof valor === 'string' ? parseFloat(valor) : valor;

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
}
