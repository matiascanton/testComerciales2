const TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import usersData from "./users.json";
import { User } from "@/app/models/User";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const headersInstance = headers();
    const authorization = headersInstance.get("authorization");

    if (!authorization || authorization !== TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");

    if (password) {
      return getUserByPassword(parseInt(password, 10));
    } else {
      return getAllUsers();
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function getAllUsers() {
  try {
    const data: User[] = usersData.users;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getUserByPassword(password: number) {
  try {
    const data: User[] = usersData.users;
    const user = data.find((user) => user.password === password);

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
