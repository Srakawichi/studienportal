"use client";
import LoginForm from "../login/loginForm";
import { useAuth } from "../AuthProvider";

export default function CoursOverview() {
    const { isAuthenticated, login } = useAuth(); // Verwende useAuth

    const handleLoginSuccess = () => {
        login(); // Verwende die login-Funktion vom AuthProvider
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Herzlichen Glückwunsch. Wenn Sie diese Seite sehen, dann haben sie genügend Geld über!</p>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}