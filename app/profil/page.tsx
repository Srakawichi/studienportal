"use client";
import { useState, useEffect } from "react";
import Navbar from "../navigation/navbar";

const ProfilePage = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        matrikelnummer: "",
    });
    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/profil")
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Fehler beim Laden der Profildaten:", err));
    }, []);

    const fieldLabels: { [key: string]: string } = {
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        username: "Benutzername",
        matrikelnummer: "Matrikelnummer",
    };

    const handleEdit = (field: string) => {
        setEditingField(field);
        setTempValue(user[field as keyof typeof user] || "");
        setError(null);
    };

    const handleSave = () => {
        if (!tempValue.trim()) {
            setError("Dieses Feld darf nicht leer sein.");
            return;
        }
        if (editingField === "email" && !tempValue.includes("@")) {
            setError("Die E-Mail-Adresse muss ein '@' enthalten.");
            return;
        }

    const handleEdit = (field: string) => {
        if (field === "matrikelnummer") {
            setError("Dieses Feld kann nicht bearbeitet werden.");
            return;
        }
        setEditingField(field);
        setTempValue(user[field as keyof typeof user] || "");
        setError(null);
    };


        const updatedUser = { ...user, [editingField!]: tempValue };
        setUser(updatedUser);
        setEditingField(null);
        fetch("/api/profil", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => console.log("Profil gespeichert:", data))
            .catch((err) => console.error("Fehler beim Speichern:", err));
    };

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center bg-gray-100 p-4 min-h-screen">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil</h2>
                    <div className="space-y-4">
                        {Object.keys(user).map((key) => (
                            <div key={key} className="flex items-center justify-between border p-3 rounded-lg">
                                <span className="w-1/3 font-semibold">{fieldLabels[key]}</span>
                                {editingField === key ? (
                                    <div className="w-2/3">
                                        <input
                                            type="text"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            className="w-full p-1 border rounded-lg"
                                        />
                                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                    </div>
                                ) : (
                                    <span className="w-2/3 text-right">{user[key as keyof typeof user]}</span>
                                )}
                                {editingField === key ? (
                                    <button
                                        onClick={handleSave}
                                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                                    >
                                        Speichern
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(key)}
                                        disabled={key === "matrikelnummer"}
                                        className={`ml-2 px-2 py-1 rounded-lg ${
                                            key === "matrikelnummer" ? "bg-gray-400 cursor-not-allowed" : "bg-red-800 hover:bg-red-600 text-white"
                                        }`}
                                    >
                                        Ändern
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
