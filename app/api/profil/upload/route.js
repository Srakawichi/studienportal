"use server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";


export async function POST(req) {
    try {
        const { image } = await req.json();

        if (!image) {
            return new Response(JSON.stringify({ message: "Kein Bild erhalten" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Upload-Ordner festlegen
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true }); // Erstellt den Ordner, falls er fehlt

        // Dateiname generieren
        const fileName = `profile_${Date.now()}.jpg`; // Eindeutiger Dateiname
        const filePath = path.join(uploadDir, fileName);

        // Base64 in Datei schreiben
        const base64Data = image.split(";base64,").pop();
        await writeFile(filePath, Buffer.from(base64Data, "base64"));

        return new Response(JSON.stringify({ imageUrl: `/uploads/${fileName}` }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fehler beim Speichern:", error);
        return new Response(JSON.stringify({ message: "Fehler beim Speichern des Bildes" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
