"use client";
import { useState, useEffect } from 'react';
import NewsPage from "./dashboard/news";
import SlideShow from "./dashboard/slideshow";
import LoginForm from "./login/loginForm";
import Navbar from "./navigation/navbar";
import Cookies from 'js-cookie';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authCookie = Cookies.get('auth');
        if (authCookie) {
            setIsAuthenticated(true); // Setze den Authentifizierungsstatus, wenn das Cookie vorhanden ist
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        Cookies.set('auth', 'true'); // Setze ein Cookie für die Authentifizierung
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        Cookies.remove('auth'); // Entferne das Cookie beim Logout
    };

    return (
        <div>
            <title> Studienportal </title>
            {isAuthenticated ? (
                <div>
                    <Navbar onLogout={handleLogout}/>
                    <div className="flex gap-0 p-4">
                        <div className="w-2/3"><SlideShow /></div>
                        <div className="w-1/3 -ml-16"><NewsPage /></div>
                    </div>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
