import { NextRequest, NextResponse } from "next/server";
import exchangeData from "./exchange.json";
import { Exchange } from "@/app/models/Exchange";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data: Exchange[] = exchangeData.exchange;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
