// pages/api/test-db.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../utils/db';

export const testdb = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await query('SELECT NOW()');
    res.status(200).json({ time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
};
