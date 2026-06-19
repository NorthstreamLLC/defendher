import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { customers, sessions } from '../../../db/schema.js';
import { eq, and, gt } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const sessionId = req.headers['x-session-id'] as string;
    if (!sessionId) return res.status(401).json({ error: 'Not authenticated' });

    const sessionRows = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
      .limit(1);

    if (sessionRows.length === 0) return res.status(401).json({ error: 'Session expired or invalid' });

    const customerId = sessionRows[0].customerId;
    const customerRows = await db
      .select({
        id: customers.id,
        email: customers.email,
        firstName: customers.firstName,
        lastName: customers.lastName,
        phone: customers.phone,
        createdAt: customers.createdAt,
      })
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    if (customerRows.length === 0) return res.status(404).json({ error: 'Customer not found' });

    return res.json(customerRows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile', message: String(error) });
  }
}
