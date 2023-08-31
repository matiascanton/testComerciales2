import { NextRequest, NextResponse } from "next/server";
import usersData from "./products.json";
import { Product } from "@/app/models/Product";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data: Product[] = usersData.products;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
