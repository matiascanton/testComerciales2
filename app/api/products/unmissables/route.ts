import { NextRequest, NextResponse } from "next/server";
import unmissableData from "./unmissable.json";
import { Unmissable } from "@/app/models/Unmissable";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data: Unmissable[] = unmissableData.unmissable;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
