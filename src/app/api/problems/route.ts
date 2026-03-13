import { NextResponse } from "next/server";
import { seedProblems } from "@/lib/mocks/seed";

export async function GET() {
  return NextResponse.json(seedProblems);
}
