import { NextRequest, NextResponse } from "next/server";
import missionsData from "./missions.json";
import { Mission } from "@/app/models/Mission";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data: Mission[] = missionsData.missions;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
