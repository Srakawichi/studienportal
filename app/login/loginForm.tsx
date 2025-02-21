// components/LoginForm.tsx
"use client";
import { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setMessage(data.message);
            // Hier kannst du den User weiterleiten oder den Login-Zustand ändern
        } else {
            setMessage(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow-lg">
            <h1 className="text-lg font-bold mb-4">Login</h1>
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
                Login
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
    );
};

export default LoginForm;
