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
    const { firstName, lastName, phone } = req.body;

    const updates: Record<string, unknown> = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phone !== undefined) updates.phone = phone || null;

    if (Object.keys(updates).length > 0) {
      await db.update(customers).set(updates).where(eq(customers.id, customerId));
    }

    const updated = await db
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

    return res.json(updated[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update profile', message: String(error) });
  }
}
