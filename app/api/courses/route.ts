import { NextResponse } from "next/server";
import { courses } from "../courses/data";

export async function GET() {
    return NextResponse.json(courses);
}