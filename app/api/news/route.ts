import { NextResponse } from "next/server";

// Simulierte News-Daten (würde in einem echten Backend aus einer Datenbank kommen)
const allNews = [
    { id: 1, title: "Neue Features!", content: "Wir haben neue Features hinzugefügt." },
    { id: 2, title: "Wartungsarbeiten", content: "Unsere Server werden heute gewartet." },
    { id: 3, title: "Veranstaltung", content: "Nächste Woche gibt es ein Meetup." },
    { id: 4, title: "Tag der offenen Tür", content: "Besuchen Sie uns am Tag der offenen Tür!" },
    { id: 5, title: "Sicherheitsupdate", content: "Ein wichtiges Sicherheitsupdate wurde eingespielt." },
    { id: 6, title: "Neue Kurse verfügbar", content: "Es wurden neue Kurse in unserem Studienportal veröffentlicht." },
    { id: 7, title: "Erfolgreicher Abschluss", content: "Glückwunsch an alle Absolventen dieses Semesters!" },
    { id: 8, title: "Neue Dozenten", content: "Wir begrüßen neue Dozenten im Fachbereich Informatik." },
    { id: 9, title: "Systemwartung", content: "Das System wird am Wochenende für Wartungsarbeiten offline sein." },
    { id: 10, title: "Sommerfest", content: "Meldet euch für das jährliche Sommerfest an!" }
];


// API-Route für News
export async function GET() {
    const randomNews = allNews.sort(() => 0.5 - Math.random()).slice(0, 4); // Zufällige Auswahl
    return NextResponse.json(randomNews);
}
