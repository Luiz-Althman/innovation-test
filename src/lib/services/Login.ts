import { SignInData } from '@/app/(auth)/(components)/FormComponent';
import { api } from '../axios';

type SignInResponse = {
    status: number;
    data: {
        email: string;
        senha: string;
        dados_usuario: {
            codigo_grupo: string;
            codigo_usuario: string;
            nome_usuario: string;
            nome_grupo: string;
        };
        token_de_acesso: string;
    };
};

export const signIn = async (data: SignInData): Promise<SignInResponse> => {
    const response = api.post('/login/acessar', data);

    return response;
};
