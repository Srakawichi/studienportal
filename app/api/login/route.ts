// app/api/login/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (!fs.existsSync(usersFile)) {
        return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const user = users.find((u: { username: string, password: string }) => u.username === username && u.password === password);

    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
