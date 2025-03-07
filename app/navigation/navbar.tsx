"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import profileData from "@/data/profile.json";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const profile = profileData || { profileImage: "" };
    const router = useRouter();
    const [, setSelected] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(profile.profileImage || null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected(value);
        if (value) {
            router.push(`/documents/${value}`);
        }
    };

    useEffect(() => {
        // Setze das Profilbild zurück, wenn der Benutzer nicht mehr authentifiziert ist
        if (!isAuthenticated) {
            setProfileImage(null); // Setze das Profilbild auf null oder Standard zurück
        } else {
            setProfileImage(profile.profileImage || null); // Setze das Profilbild, wenn authentifiziert
        }
    }, [isAuthenticated, profile.profileImage]);

    return (
        <nav className="bg-red-800 p-4 shadow-md rounded-lg w-full mt-16">
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex gap-x-8 items-center">
                    <Link href="/">
                        <span className="text-white text-xl font-bold cursor-pointer">Hauptmenü</span>
                    </Link>
                    <Link href="/timetable" className="text-white hover:text-gray-200">Stundenplan</Link>
                    <Link href="/overviewofgrades" className="text-white hover:text-gray-200">Notenübersicht</Link>
                    <Link href="/courseoverview" className="text-white hover:text-gray-200">Kursübersicht</Link>
                    {/* Dropdownmenue */}
                    <form className="max-w-sm mx-auto">
                        <select defaultValue="" id="options" onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled hidden>Dokumente</option>
                            <option value="immatrikulationsbescheid">Immatrikulationsbescheid</option>
                            <option value="bachelorarbeit">Bachelorarbeit</option>
                            <option value="freistellungsantrag">Freistellungsantrag</option>
                            <option value="exmatrikulation">Exmatrikulation</option>
                        </select>
                    </form>
                </div>
                {/* Profil */}
                <Link href="/profil">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt="Profilbild"
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <svg
                                className="absolute w-12 h-12 text-gray-400 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        )}
                    </div>
                </Link>
                {isAuthenticated && (
                    <button onClick={logout} className="bg-gray-700 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
