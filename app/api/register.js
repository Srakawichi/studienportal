// Funktion bleibt: Benutzerregistrierung mit JSON-Datei.
import fs from 'fs';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ username, password });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'User registered successfully' });
}
