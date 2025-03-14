import { FormComponent } from './(components)/FormComponent';

export default function SignIn() {
    return (
        <div className="flex flex-col justify-center items-center h-screen max-w-screen-lg mx-auto px-6">
            <header>
                <h1 className="text-green-innovation text-2xl md:text-3xl font-bold mb-10">
                    Bem-vindo a Innovation Brindes
                </h1>
            </header>
            <FormComponent />
        </div>
    );
}
