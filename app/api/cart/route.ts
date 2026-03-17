import { NextResponse } from "next/server";
import { mockCartData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(mockCartData);
}
