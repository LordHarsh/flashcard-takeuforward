// pages/api/flashcards/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../utils/db';

const deleteFlashcard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    await query('DELETE FROM Flashcards WHERE id = $1', [id]);
    res.status(200).json({ message: 'Flashcard deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
};

export default deleteFlashcard;