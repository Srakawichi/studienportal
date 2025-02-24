"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../login/loginForm";
import { useAuth } from "../AuthProvider";

export default function CourseOverview() {
    const { isAuthenticated, login } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<{ id: number; title: string; description: string }[]>([]);

    useEffect(() => {
        fetch("/api/courses")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error("Fehler beim Laden der Kurse:", error));
    }, []);

    const handleCourseClick = (id: number) => {
        router.push(`/courseoverview/${id}`);
    };

    return (
        <div>
            {isAuthenticated ? (
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Kursübersicht</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => handleCourseClick(course.id)}
                                className="bg-blue-100 p-6 rounded-xl shadow-md cursor-pointer hover:bg-blue-200 transition"
                            >
                                <h2 className="text-lg font-semibold">{course.title}</h2>
                                <p className="text-sm text-gray-700">{course.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <LoginForm onLoginSuccess={login} />
            )}
        </div>
    );
}