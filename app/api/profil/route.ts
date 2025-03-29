import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "profile.json");

// GET: Lädt Profildaten aus profile.json und gibt sie als JSON zurück
export async function GET() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ message: "Fehler beim Laden der Profildaten." }, { status: 500 });
    }
}
// POST: Überschreibt profile.json mit neuen Daten aus dem Request.
export async function POST(req: Request) {
    try {
        const body = await req.json();
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ message: "Profil gespeichert." });
    } catch (error) {
        return NextResponse.json({ message: "Fehler beim Speichern der Profildaten." }, { status: 500 });
    }
}
