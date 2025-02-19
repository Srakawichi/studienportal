"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navigation/navbar";

const API_URL = "/api/schedule"; // Next.js API Route

const Timetable = () => {
    const [schedule, setSchedule] = useState([]);
    const [newCourse, setNewCourse] = useState({ day: "", time: "", subject: "" });

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSchedule(data);
    };

    const addCourse = async () => {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCourse),
        });
        fetchSchedule();
        setNewCourse({ day: "", time: "", subject: "" });
    };

    const deleteCourse = async (index: number) => {
        await fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index }),
        });
        fetchSchedule();
    };

    return (
        <div>
            <title> Studienportal </title>
            <Navbar/>
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-black-700">Stundenplan</h2>
                <div className="mb-4">
                    <input
                        className="border p-2 m-2"
                        type="text"
                        placeholder="Tag"
                        value={newCourse.day}
                        onChange={(e) => setNewCourse({...newCourse, day: e.target.value})}
                    />
                    <input
                        className="border p-2 m-2"
                        type="text"
                        placeholder="Uhrzeit"
                        value={newCourse.time}
                        onChange={(e) => setNewCourse({...newCourse, time: e.target.value})}
                    />
                    <input
                        className="border p-2 m-2"
                        type="text"
                        placeholder="Fach"
                        value={newCourse.subject}
                        onChange={(e) => setNewCourse({...newCourse, subject: e.target.value})}
                    />
                    <button className="bg-red-800 text-white p-2" onClick={addCourse}>
                        Hinzufügen
                    </button>
                </div>
                <table className="w-full max-w-4xl border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-red-800 text-white">
                        <th className="border px-6 py-3">Tag</th>
                        <th className="border px-6 py-3">Uhrzeit</th>
                        <th className="border px-6 py-3">Fach</th>
                        <th className="border px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedule.map((entry: any, index: number) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-200">
                            <td className="border px-6 py-3 text-center">{entry.day}</td>
                            <td className="border px-6 py-3 text-center">{entry.time}</td>
                            <td className="border px-6 py-3 text-center">{entry.subject}</td>
                            <td className="border px-6 py-3 text-center">
                                <button className="bg-red-500 text-white px-2 py-1" onClick={() => deleteCourse(index)}>
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Timetable;
