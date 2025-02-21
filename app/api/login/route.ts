// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (username === 'admin' && password === '123') {
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
