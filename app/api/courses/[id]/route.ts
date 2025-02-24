import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { courses } from "../data";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const course = courses.find(c => c.id === Number(params.id));
    if (!course) {
        return NextResponse.json({ error: "Kurs nicht gefunden" }, { status: 404 });
    }
    return NextResponse.json(course);
}