"use client";
import { useState } from 'react';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = isRegister ? '/api/register/' : '/api/login/';

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok && !isRegister) {
            onLoginSuccess(); // Erfolgreicher Login
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow-lg">
            <h1 className="text-lg font-bold mb-4">{isRegister ? 'Registrieren' : 'Login'}</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                {isRegister ? 'Registrieren' : 'Login'}
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
            <p className="mt-2 text-sm cursor-pointer text-blue-500" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Zum Login wechseln' : 'Neues Konto erstellen'}
            </p>
        </form>
    );
};

export default LoginForm;
