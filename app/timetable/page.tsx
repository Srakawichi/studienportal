import Navbar from "../navigation/navbar";
import React from "react";


type ScheduleEntry = {
    day: string;
    time: string;
    subject: string;
};

const schedule: ScheduleEntry[] = [
    { day: "Montag", time: "08:00 - 09:30", subject: "Mathematik" },
    { day: "Montag", time: "09:45 - 11:15", subject: "Englisch" },
    { day: "Dienstag", time: "08:00 - 09:30", subject: "Physik" },
    { day: "Dienstag", time: "09:45 - 11:15", subject: "Chemie" },
    { day: "Mittwoch", time: "08:00 - 09:30", subject: "Biologie" },
    { day: "Mittwoch", time: "09:45 - 11:15", subject: "Geschichte" },
    { day: "Donnerstag", time: "08:00 - 09:30", subject: "Sport" },
    { day: "Donnerstag", time: "09:45 - 11:15", subject: "Informatik" },
    { day: "Freitag", time: "08:00 - 09:30", subject: "Kunst" },
    { day: "Freitag", time: "09:45 - 11:15", subject: "Musik" },
];

const Timetable: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Stundenplan</h2>
                <table className="w-full max-w-4xl border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border border-blue-700 px-6 py-3">Tag</th>
                        <th className="border border-blue-700 px-6 py-3">Uhrzeit</th>
                        <th className="border border-blue-700 px-6 py-3">Fach</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedule.map((entry, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-200 hover:bg-blue-100 transition-colors">
                            <td className="border border-gray-300 px-6 py-3 text-center font-semibold">{entry.day}</td>
                            <td className="border border-gray-300 px-6 py-3 text-center">{entry.time}</td>
                            <td className="border border-gray-300 px-6 py-3 text-center text-blue-600 font-medium">{entry.subject}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Timetable;


