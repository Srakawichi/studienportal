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
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const times = ["08:00 - 09:30", "09:45 - 11:15", "12:00 - 13:30", "13:45 - 15:15", "15:30 - 17:00"];

    return (
        <div>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Stundenplan</h2>
                <div className="grid grid-cols-6 gap-1 w-full max-w-5xl border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-blue-500 text-white p-4 text-center font-bold border-r border-gray-300">Zeit</div>
                    {days.map(day => (
                        <div key={day} className="bg-blue-500 text-white p-4 text-center font-bold border-r border-gray-300">{day}</div>
                    ))}
                    {times.map(time => (
                        <>
                            <div key={time} className="bg-gray-300 p-4 text-center font-semibold border-b border-gray-300">{time}</div>
                            {days.map(day => {
                                const entry = schedule.find(e => e.day === day && e.time === time);
                                return (
                                    <div key={day + time} className={`p-4 text-center border border-gray-300 ${entry ? 'bg-blue-100' : 'bg-white'}`}>{entry ? entry.subject : "-"}</div>
                                );
                            })}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timetable;
