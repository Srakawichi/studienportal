import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "grades.json");

// Hilfsfunktion zum Laden der Noten
const loadGrades = () => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify({}, null, 2), "utf8");
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
};

// Hilfsfunktion zum Speichern der Noten
const saveGrades = (grades: any) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(grades, null, 2), "utf8");
};

// GET: Noten abrufen
export async function GET() {
    return NextResponse.json(loadGrades());
}

// POST: Noten speichern
export async function POST(req: Request) {
    const grades = await req.json();

    // Final-Fail-Status aktualisieren
    for (const courseId in grades) {
        const entry = grades[courseId];

        // Falls 3 Versuche UND Note schlechter als 4.0 -> endgültig nicht bestanden
        entry.finalFail = entry.attempt === 3 && entry.grade > 4.0;
    }

    saveGrades(grades);
    return NextResponse.json({ message: "Noten gespeichert!" });
}
