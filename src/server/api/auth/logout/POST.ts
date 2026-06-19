import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { sessions } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const sessionId = req.headers['x-session-id'] as string;
    if (sessionId) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    }
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Logout failed', message: String(error) });
  }
}
