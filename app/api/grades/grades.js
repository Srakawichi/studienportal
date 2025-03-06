// app/api/grades/grades.js

import fs from 'fs';
import path from 'path';

// Der Pfad zur JSON-Datei
const gradesFilePath = path.join(process.cwd(), 'app/data/grades.json');

export async function handler(req, res) {
    if (req.method === 'GET') {
        // Versuche, die Noten zu laden
        try {
            if (fs.existsSync(gradesFilePath)) {
                // Datei existiert, versuche sie zu lesen
                const data = fs.readFileSync(gradesFilePath, 'utf8');
                console.log('Gelesene Datei:', data);  // Zeige den Inhalt der Datei in der Konsole an

                // Versuche, die Daten zu parsen
                try {
                    const grades = JSON.parse(data);
                    res.status(200).json(grades);
                } catch (jsonError) {
                    // Wenn ein Fehler beim Parsen auftritt
                    console.error('JSON-Fehler:', jsonError);
                    res.status(500).json({ error: 'Fehler beim Parsen der JSON-Daten' });
                }
            } else {
                // Datei existiert nicht, daher ein leeres Objekt zurückgeben
                console.log('Die Datei grades.json existiert nicht.');
                res.status(200).json({});
            }
        } catch (error) {
            // Fehler beim Lesen der Datei
            console.error('Fehler beim Lesen der Datei:', error);
            res.status(500).json({ error: 'Fehler beim Laden der Noten' });
        }
    } else if (req.method === 'POST') {
        // Speichern der Noten
        try {
            const grades = req.body;

            // Stelle sicher, dass grades ein gültiges Objekt ist
            console.log('Speichere Noten:', grades);

            // Speichere die Noten in der Datei
            fs.writeFileSync(gradesFilePath, JSON.stringify(grades, null, 2), 'utf8');
            res.status(200).json({ message: 'Noten erfolgreich gespeichert!' });
        } catch (error) {
            // Fehler beim Speichern der Noten
            console.error('Fehler beim Speichern der Noten:', error);
            res.status(500).json({ error: 'Fehler beim Speichern der Noten' });
        }
    } else {
        // Falls eine ungültige HTTP-Methode verwendet wird
        res.status(405).json({ error: 'Methode nicht erlaubt' });
    }
}
