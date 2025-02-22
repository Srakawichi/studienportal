"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./navigation/navbar";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
            <Navbar />  {/* Navbar wird nur hier gerendert */}
            <main>{children}</main>
        </AuthProvider>
        </body>
        </html>
    );
}
