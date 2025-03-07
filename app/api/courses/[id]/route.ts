import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { courses } from "../data";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const course = courses.find(c => c.id === Number(id));

    if (!course) {
        return NextResponse.json({ error: "Kurs nicht gefunden" }, { status: 404 });
    }
    return NextResponse.json(course);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const index = courses.findIndex(c => c.id === Number(id));

    if (index === -1) {
        return NextResponse.json({ error: "Kurs nicht gefunden" }, { status: 404 });
    }

    courses.splice(index, 1);
    return new NextResponse(null, { status: 204 }); // 204 No Content (Standard für DELETE)
}
