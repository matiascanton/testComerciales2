import { User } from "../models/User";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    //: "http://localhost:3000/api";
    : "http://localhost:3000/api/v3/comerciales";

const token = process.env.NEXT_PUBLIC_SECRET_TOKEN;
const TOKEN = 'Bearer FeMsA@2022'
/*export async function getUserByPassword(password: number) {
  try {
    const response = await fetch(`${URL}/users?password=${password}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching user by password");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user by password:", error);
    return []; // Devuelve un objeto literal vacío
  }
}*/

export async function getUserByPassword(password: string) {
  try {
    const response = await fetch(`${URL}/info/user/${password}`, 
      {
        headers: { Authorization: TOKEN },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching user by password");
    }
    const data = await response.json();
console.log('userrrrrrrr', data)
    return data;
  } catch (error) {
    console.error("Error fetching user by password:", error);
    return []; // Devuelve un objeto literal vacío
  }
}
