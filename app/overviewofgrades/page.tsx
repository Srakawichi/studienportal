"use client";
import { useState, useEffect } from "react";
import LoginForm from "../login/loginForm";
import { useAuth } from "../AuthProvider";
import { courses } from "../api/courses/data";

// Typdefinitionen
type GradeEntry = {
    grade?: number;
    credits?: number;
    attempt?: number;
};

type GradesState = Record<number, GradeEntry>;

export default function Page() {
    const { isAuthenticated, login } = useAuth();
    const [grades, setGrades] = useState<GradesState>({});
    const [totalCredits, setTotalCredits] = useState<number>(0);
    const [averageGrade, setAverageGrade] = useState<number>(0);

    useEffect(() => {
        // Lade die Noten vom Backend
        fetch('/api/grades')
            .then((response) => response.json())
            .then((savedGrades) => {
                setGrades(savedGrades);
                calculateStats(savedGrades);
            })
            .catch((error) => console.error('Error loading grades:', error));
    }, []);

    const handleLoginSuccess = () => {
        login();
    };

    const handleGradeChange = (courseId: number, field: keyof GradeEntry, value: string) => {
        const newValue = field === "grade" || field === "credits" ? Number(value) : value;

        const updatedGrades: GradesState = {
            ...grades,
            [courseId]: {
                ...grades[courseId],
                [field]: newValue,
            },
        };

        setGrades(updatedGrades);
        // Speichere die Noten auf dem Server
        fetch('/api/grades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGrades),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Grades saved:', data);
            })
            .catch((error) => {
                console.error('Error saving grades:', error);
            });

        calculateStats(updatedGrades);
    };

    const calculateStats = (grades: GradesState) => {
        let totalCredits = 0;
        let gradeSum = 0;
        let count = 0;

        Object.values(grades).forEach((g) => {
            if (g.grade !== undefined && g.credits !== undefined) {
                if (g.credits > 0) {
                    totalCredits += g.credits;
                }
                gradeSum += g.grade; // Summe der Noten
                count++; // Anzahl der Kurse mit Noten
            }
        });

        setTotalCredits(totalCredits);

        // Durchschnitt nur auf Basis der Noten berechnen, unabhängig von den Credit Points
        setAverageGrade(count > 0 ? parseFloat((gradeSum / count).toFixed(2)) : 0);
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="flex justify-center mt-6 bg-gray-100">
            {isAuthenticated ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h1 className="text-2xl font-bold text-center">Notenübersicht</h1>

                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <p><strong>Notendurchschnitt:</strong> {averageGrade}</p>
                        <p><strong>Gesamt-Credit Points:</strong> {totalCredits}</p>
                    </div>

                    <div className="mt-6">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-red-700 text-white">
                                <th className="p-2 text-left">Kurs</th>
                                <th className="p-2 text-center">Note</th>
                                <th className="p-2 text-center">Credits</th>
                                <th className="p-2 text-center">Versuch</th>
                                <th className="p-2 text-center">Bestanden</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.map((course, index) => (
                                <tr key={course.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}>
                                    <td className="p-2">{course.title}</td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="1"
                                            max="5"
                                            placeholder="Note"
                                            value={grades[course.id]?.grade ?? ""}
                                            onChange={(e) => handleGradeChange(course.id, "grade", e.target.value)}
                                            className="border p-1 rounded w-16 text-center"
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="Credits"
                                            value={grades[course.id]?.credits ?? ""}
                                            onChange={(e) => handleGradeChange(course.id, "credits", e.target.value)}
                                            className="border p-1 rounded w-16 text-center"
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <select
                                            value={grades[course.id]?.attempt ?? ""}
                                            onChange={(e) => handleGradeChange(course.id, "attempt", e.target.value)}
                                            className="border p-1 rounded"
                                        >
                                            <option value="">Versuch</option>
                                            <option value="1">1. Versuch</option>
                                            <option value="2">2. Versuch</option>
                                            <option value="3">3. Versuch</option>
                                        </select>
                                    </td>
                                    <td className="p-2 text-center text-2xl">
                                        {grades[course.id]?.grade !== undefined && grades[course.id]!.grade <= 4.0 ? "✅" : "❌"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
