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

Beim Öffnen der App gelangst du zunächst zum **Login**.
Nutzername: **admin** und passwort: **123**
Nach erfolgreichem Login kannst du:

- dein Profil anzeigen
- Vorname, Nachname, E-Mail und Benutzername bearbeiten
- ein Profilbild (PNG oder JPG) hochladen

Die Matrikelnummer ist sichtbar, aber **nicht änderbar**.

---

## 📁 Projektstruktur (Auszug)

| Pfad                      | Beschreibung                            |
|---------------------------|------------------------------------------|
| `app/page.tsx`            | Hauptseite mit Login & Profil            |
| `login/loginForm.tsx`     | Login-Formular mit API-Anfrage           |
| `profile.json`            | Beispiel-Userdaten (für Entwicklung)     |
| `public/`                 | Statische Dateien wie Profilbilder       |
| `pages/api/`              | API-Endpunkte für Login & Profil         |

---

## 📚 Technologien

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
