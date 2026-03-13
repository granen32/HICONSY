import { NextResponse } from "next/server";
import { seedFolders } from "@/lib/mocks/seed";

export async function GET() {
  return NextResponse.json(seedFolders);
}
