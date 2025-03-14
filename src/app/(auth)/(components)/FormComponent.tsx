'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { setCookie } from 'nookies';

import { Lock, User } from 'lucide-react';
import Link from 'next/link';
import { signIn } from '@/lib/services/Login';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signInShema = z.object({
    email: z.string().min(3, 'Usuário precisa no mínimo 3 caracteres.'),
    senha: z.string().min(3, 'Senha precisa no mínimo 3 caracteres.'),
});

export type SignInData = z.infer<typeof signInShema>;

export function FormComponent() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<SignInData>({
        resolver: zodResolver(signInShema),
    });

    const router = useRouter();

    async function handleSignIn(values: SignInData) {
        try {
            const { status, data } = await signIn(values);

            if (status === 200) {
                setCookie(
                    null,
                    'innovation:access_token',
                    data.token_de_acesso,
                    {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    }
                );

                toast.success('Login feito com sucesso!', {
                    position: 'bottom-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });

                setTimeout(() => router.push('/dashboard'), 1500);
            } else {
                toast.error('Erro no login. Verifique suas credenciais.', {
                    position: 'bottom-right',
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.error('Erro ao conectar com o servidor. Tente novamente.', {
                position: 'bottom-right',
                autoClose: 3000,
            });
            console.error('Erro no login:', err);
        }
    }

    return (
        <>
            <ToastContainer />

            <form
                className="bg-green-innovation p-4 md:p-16 md:w-[500px] w-full rounded-xl"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="flex bg-white items-center px-2 py-4 gap-2 rounded-2xl">
                            <label htmlFor="email">
                                <User className="text-zinc-900 ml-2" />
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Usuário"
                                className="placeholder:text-zinc-500 border-none flex-1 focus:outline-none"
                                autoComplete="off"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <span className="text-zinc-600 font-bold">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="flex bg-white items-center px-2 py-4 gap-2 rounded-2xl">
                            <label htmlFor="password">
                                <Lock className="text-zinc-900 ml-2" />
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Senha"
                                className="placeholder:text-zinc-500 border-none flex-1 focus:outline-none"
                                autoComplete="off"
                                {...register('senha')}
                            />
                        </div>
                        {errors.senha && (
                            <span className="text-zinc-600 font-bold">
                                {errors.senha.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-2 md:gap-0 md:justify-between items-center py-5">
                    <div className="">
                        <Label
                            htmlFor="keepLoggedIn"
                            className="text-white flex items-center gap-2 cursor-pointer hover:text-white/40 md:text-base text-sm"
                        >
                            <Checkbox
                                id="keepLoggedIn"
                                className="data-[state=checked]:bg-transparent data-[state=checked]:border-white cursor-pointer"
                            />
                            Manter logado
                        </Label>
                    </div>
                    <div className="">
                        <Link
                            href="/forgot-password"
                            target="_blank"
                            className="text-white hover:text-white/40 text-sm md:text-base"
                        >
                            Esqueceu a senha?
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <Button
                        type="submit"
                        className="bg-white text-zinc-500 flex-1 md:flex-none px-12 py-6 md:py-4 hover:bg-white/40 transition-colors duration-300 cursor-pointer rounded-2xl"
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </>
    );
}
