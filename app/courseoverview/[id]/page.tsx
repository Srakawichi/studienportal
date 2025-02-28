"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState<{ id: number; title: string; description: string; semester: string; bewertung: string; text: string} | null>(null);

    useEffect(() => {
        fetch(`/api/courses/${id}`)
            .then((response) => response.json())
            .then((data) => setCourse(data))
            .catch((error) => console.error("Fehler beim Laden des Kurses:", error));
    }, [id]);

    if (!course) return <p className="text-center mt-10">Lade Kursdetails...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-700">{course.text}</p>
            <br />
            <p className="text-lg text-gray-700">{course.bewertung}</p>
            <button
                onClick={() => window.history.back()}
                className="mt-6 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-500"
            >
                 zurück zur Übersicht
            </button>
        </div>
    );
}
