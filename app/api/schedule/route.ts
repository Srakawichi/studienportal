import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "schedule.json");

// Stundenplan laden
const loadSchedule = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
};

// Stundenplan speichern
const saveSchedule = (schedule: any) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(schedule, null, 2));
};

// GET: Stundenplan abrufen
export async function GET() {
    return NextResponse.json(loadSchedule());
}

// POST: Kurs hinzufügen
export async function POST(req: Request) {
    const newCourse = await req.json();
    const schedule = loadSchedule();
    schedule.push(newCourse);
    saveSchedule(schedule);
    return NextResponse.json({ message: "Kurs hinzugefügt", schedule });
}

// DELETE: Kurs löschen
export async function DELETE(req: Request) {
    const { index } = await req.json();
    const schedule = loadSchedule();
    if (index >= 0 && index < schedule.length) {
        schedule.splice(index, 1);
        saveSchedule(schedule);
        return NextResponse.json({ message: "Kurs gelöscht", schedule });
    }
    return NextResponse.json({ message: "Ungültiger Index" }, { status: 400 });
}
