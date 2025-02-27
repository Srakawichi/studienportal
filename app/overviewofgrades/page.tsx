"use client";
import LoginForm from "../login/loginForm";
import { useAuth } from "../AuthProvider";

export default function Page() {
    const { isAuthenticated, login } = useAuth(); // Verwende useAuth

    const handleLoginSuccess = () => {
        login(); // Verwende die login-Funktion vom AuthProvider
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Notenübersicht</p>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}