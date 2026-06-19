import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { orders, orderItems, sessions } from '../../../db/schema.js';
import { eq, and, gt } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const orderId = parseInt(String(req.params.id), 10);
    if (isNaN(orderId)) return res.status(400).json({ error: 'Invalid order ID' });

    const sessionId = req.headers['x-session-id'] as string;

    const orderRows = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (orderRows.length === 0) return res.status(404).json({ error: 'Order not found' });

    const order = orderRows[0];

    // Verify ownership if logged in
    if (order.customerId !== null) {
      if (!sessionId) return res.status(401).json({ error: 'Not authenticated' });

      const sessionRows = await db
        .select()
        .from(sessions)
        .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
        .limit(1);

      if (sessionRows.length === 0) return res.status(401).json({ error: 'Session expired' });
      if (sessionRows[0].customerId !== order.customerId) return res.status(403).json({ error: 'Forbidden' });
    }

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    return res.json({ ...order, items });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch order', message: String(error) });
  }
}
