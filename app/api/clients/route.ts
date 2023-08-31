import { NextRequest, NextResponse } from "next/server";

import clientsData from "./clients.json";
import { Client } from "@/app/models/Client";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      return getClientById(id);
    } else {
      return getAllClients();
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getClientById(id: string) {
  try {
    const data: Client[] = clientsData.clients;
    const client = data.find((client) => client.id === parseInt(id));

    if (client) {
      return NextResponse.json(client);
    } else {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getAllClients() {
  try {
    const data: Client[] = clientsData.clients;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
