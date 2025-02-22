"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from "../AuthProvider";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
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
                        <select defaultValue="DO" id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="DO">Dokumente</option>
                            <option value="US">Immatrikulationsbescheid</option>
                            <option value="FR">Bachelorarbeit</option>
                            <option value="DE">Freistellungsantrag</option>
                            <option value="EX">Exmatrikulation</option>
                        </select>
                    </form>
                </div>
                {/* Profiel */}
                <Link href="/profil">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"></path>
                        </svg>
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

