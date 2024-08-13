// pages/api/flashcards/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../utils/db';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query('SELECT * FROM Flashcards ORDER BY createdAt DESC');
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: 'Failed to retrieve flashcards' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return Response.json({ error: 'Question and answer are required' });
  }

  try {
    const result = await query(
      'INSERT INTO Flashcards (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to add flashcard' });
  }
};

export async function PATCH (req: NextApiRequest, res: NextApiResponse) {
  const { id, question, answer } = req.body;

  if (!id || !question || !answer) {
    return Response.json({ error: 'ID, question, and answer are required' });
  }

  try {
    const result = await query(
      'UPDATE Flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
      [question, answer, id]
    );
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to update flashcard' });
  }
};