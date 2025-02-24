"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState<{ id: number; title: string; description: string } | null>(null);

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
            <p className="text-lg text-gray-700">{course.description}</p>
        </div>
    );
}
