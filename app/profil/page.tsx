"use client";
import { useState, useEffect } from "react";
import Navbar from "../navigation/navbar";

const ProfilePage = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    useEffect(() => {
        fetch("/api/profil")
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Fehler beim Laden der Profildaten:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        fetch("/api/profil", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log("Profil gespeichert:", data))
            .catch((err) => console.error("Fehler beim Speichern:", err));
    };

    return (
        <div>
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Profil</h2>
                    <div className="mt-4 space-y-2">
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Vorname"
                        />
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="E-Mail"
                        />
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Benutzername"
                        />
                        <button
                            onClick={handleSave}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Speichern
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
