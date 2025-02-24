"use client";
import { useState, useEffect } from "react";
import LoginForm from "../login/loginForm";
import { useAuth } from "../AuthProvider";

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
    const [profileImage, setProfileImage] = useState<string>("/default-profile.png");

    useEffect(() => {
        fetch("/api/profil")
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                if (data.profileImage) setProfileImage(data.profileImage);
            })
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
        if (field === "matrikelnummer") {
            setError("Dieses Feld kann nicht bearbeitet werden.");
            return;
        }
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


    const { isAuthenticated, login } = useAuth();

    const handleLoginSuccess = () => {
        login();
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            alert("Nur PNG- oder JPG-Dateien erlaubt!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64Image = reader.result as string;

                const response = await fetch("/api/profil/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64Image }),
                });

                if (!response.ok) {
                    throw new Error("Fehler beim Hochladen des Bildes");
                }

                const data = await response.json();
                setProfileImage(data.imageUrl);

                // Speichert die Bild-URL in den Benutzerdaten
                const updatedUser = { ...user, profileImage: data.imageUrl };
                setUser(updatedUser);

                await fetch("/api/profil", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedUser),
                });
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
                alert("Fehler beim Hochladen des Bildes.");
            }
        };
        reader.readAsDataURL(file);
    };


    return (
        <div>
            {isAuthenticated ? (
                <div className="flex justify-center bg-gray-100 p-4 min-h-screen">
                    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil</h2>
                        <div className="mb-4 flex flex-col items-center">
                            <img src={profileImage} alt="Profilbild" className="w-24 h-24 rounded-full object-cover" />
                            <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} className="hidden" id="profilePic" />
                            <label htmlFor="profilePic" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-600">
                                Ändern
                            </label>
                        </div>
                        <div className="space-y-4 w-full">
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
                                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
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
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default ProfilePage;
