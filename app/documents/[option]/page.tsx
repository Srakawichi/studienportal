"use client";
import { useParams } from "next/navigation";
import data from "../data.json";

export default function DocumentPage() {
    const { option } = useParams(); // Dynamischen Parameter aus URL holen
    const documentData = data[option as keyof typeof data]; // JSON durchsuchen

    if (!documentData) {
        return <p className="text-center text-red-500">Dokument nicht gefunden</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{documentData.title}</h1>
            <p className="text-justify">{documentData.description}</p>
        </div>
    );
}
