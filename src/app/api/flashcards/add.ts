// pages/api/flashcards/add.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../utils/db';

const addFlashcard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  try {
    const result = await query(
      'INSERT INTO Flashcards (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add flashcard' });
  }
};

export default addFlashcard;