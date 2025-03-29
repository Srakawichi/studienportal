import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Prüft, ob username und password vorhanden sind
    if (!username || !password) {
        return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }

    if (users.some((user: { username: string }) => user.username === username)) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    users.push({ username, password });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
