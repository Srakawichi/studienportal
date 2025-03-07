import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { courses } from "../data";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params; // await, bevor du auf id zugreifst
    const course = courses.find(c => c.id === Number(id));

    if (!course) {
        return NextResponse.json({ error: "Kurs nicht gefunden" }, { status: 404 });
    }
    return NextResponse.json(course);
}

