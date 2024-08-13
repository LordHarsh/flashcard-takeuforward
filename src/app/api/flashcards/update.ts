// pages/api/flashcards/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../utils/db';

const updateFlashcard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, question, answer } = req.body;

  if (!id || !question || !answer) {
    return res.status(400).json({ error: 'ID, question, and answer are required' });
  }

  try {
    const result = await query(
      'UPDATE Flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
      [question, answer, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
};

export default updateFlashcard;