# 📘 Studienportal Webanwendung

Dies ist eine Webanwendung zur Benutzerverwaltung für ein Studienportal. Sie basiert auf **Next.js**, **TypeScript** und **Tailwind CSS**.

---

## 🔧 Voraussetzungen

Um das Projekt lokal auszuführen, benötigst du:

- **Node.js** (empfohlen: Version 18 oder höher)  
  👉 [Download Node.js](https://nodejs.org/)

npm wird automatisch mit Node.js installiert.

---

## 🚀 Projekt lokal starten

### 1. Repository klonen

```bash
git clone <REPOSITORY-URL>
cd <projektordner>
npm install
npm run dev
```
Die Anwendung ist anschließend erreichbar unter:
👉 http://localhost:3000
## 🔐 Login und Profilverwaltung

Beim Öffnen der App gelangst du zunächst auf das Dashboard. Für weitere Informationen musst du dich über das **Login** anmelden.

- Nutzername: **admin** und passwort: **123**
- Nach erfolgreichem Login kannst du:

- dein Profil anzeigen
- Vorname, Nachname, E-Mail und Benutzername bearbeiten
- ein Profilbild (PNG oder JPG) hochladen

Die Matrikelnummer ist sichtbar, aber **nicht änderbar**.

---

## 📁 Projektstruktur (Auszug)

| Pfad                            | Beschreibung                                      |
|---------------------------------|---------------------------------------------------|
| `app/page.tsx`                  | Einstiegspunkt der App                           |
| `app/layout.tsx`                | Layout-Komponente für globale Struktur           |
| `app/login/`                    | Login-Formular und Login-Seite                   |
| `app/profil/`                   | Profilseite mit Bearbeitungsfunktionen           |
| `app/api/`                      | REST-API-Endpunkte für das Backend               |
| └ `courses/`, `grades/` etc.    | API-Routen für Kurse, Noten, Login, Profil usw.  |
| `app/navigation/`               | Navigations-Komponenten                         |
| `app/dashboard/`                | Dashboard-Ansicht                                |
| `app/documents/`                | Dokumentenseite                                  |
| `app/courseoverview/`           | Kursübersicht                                    |
| `app/overviewofgrades/`         | Notenübersicht                                   |
| `app/timetable/`                | Stundenplan                                      |
| `data/grades.json`              | Beispiel-Notendaten                              |
| `data/profile.json`             | Beispiel-Profildaten                             |
| `data/schedule.json`            | Beispiel-Stundenplan                             |
| `data/users.json`               | Beispiel-Benutzerdaten                           |
| `globals.css`                   | Globale CSS-Definitionen                         |
| `AuthProvider.tsx`              | Authentifizierungs-Provider                      |

---

## 📚 Technologien

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)

## 👥 Mitwirkende

Dieses Projekt wurde im Rahmen eines Studienprojekts entwickelt von:

- **Sinan Yurdakul** 
- **Mihoshi Nakamura**  
