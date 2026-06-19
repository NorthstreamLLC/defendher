import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { orders, orderItems, sessions } from '../../db/schema.js';
import { eq, and, gt, desc } from 'drizzle-orm';

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

    const customerOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.customerId, customerId))
      .orderBy(desc(orders.createdAt));

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      customerOrders.map(async (order) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      })
    );

    return res.json(ordersWithItems);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch orders', message: String(error) });
  }
}
