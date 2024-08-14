// pages/api/flashcards/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query(
      "SELECT * FROM Flashcards ORDER BY createdAt DESC"
    );
    console.log(result.rows);
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: "Failed to retrieve flashcards" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question, answer } = body;
  if (!question || !answer) {
    return Response.json({ error: "Question and answer are required" });
  }
  try {
    const result = await query(
      "INSERT INTO Flashcards (question, answer) VALUES ($1, $2) RETURNING *",
      [question, answer]
    );
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Failed to add flashcard" });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, question, answer } = body;

  if (!id || !question || !answer) {
    return Response.json({ error: "ID, question, and answer are required" });
  }

  try {
    const result = await query(
      "UPDATE Flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *",
      [question, answer, id]
    );
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Failed to update flashcard" });
  }
}
