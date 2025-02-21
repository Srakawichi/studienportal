"use client";
import { useState } from 'react';
import NewsPage from "./dashboard/news";
import SlideShow from "./dashboard/slideshow";
import LoginForm from "./login/loginForm";
import Navbar from "./navigation/navbar";

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>
            <title> Studienportal </title>
            <Navbar />
            {isAuthenticated ? (
                <div className="flex gap-0 p-4">
                    <div className="w-2/3"><SlideShow /></div>
                    <div className="w-1/3 -ml-16"><NewsPage /></div>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
