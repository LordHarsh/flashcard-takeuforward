import { query } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const result = await query("SELECT * FROM Users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];
      if (user) {
        throw new Error("Email already registered");
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const resultInsert = await query(
        "INSERT INTO Users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, "admin"]
      );
      const newUser = resultInsert.rows[0];
      console.log({ newUser });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: e.message }, { status: 400 });
  }

  return NextResponse.json({ message: "success" });
}