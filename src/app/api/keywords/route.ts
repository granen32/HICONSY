import { NextResponse } from "next/server";
import { seedKeywords } from "@/lib/mocks/seed";

export async function GET() {
  return NextResponse.json(seedKeywords);
}
