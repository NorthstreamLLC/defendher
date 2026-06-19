import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { orders, orderItems, sessions } from '../../db/schema.js';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `DH-${ts}-${rand}`;
}

export default async function handler(req: Request, res: Response) {
  try {
    const sessionId = req.headers['x-session-id'] as string;
    let customerId: number | null = null;

    if (sessionId) {
      const sessionRows = await db
        .select()
        .from(sessions)
        .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
        .limit(1);
      if (sessionRows.length > 0) customerId = sessionRows[0].customerId;
    }

    const { shipping, items, guestEmail } = req.body;

    if (!shipping || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing shipping info or items' });
    }
    if (!customerId && !guestEmail) {
      return res.status(400).json({ error: 'Guest email required for guest checkout' });
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: { unitPrice: number; quantity: number }) => sum + item.unitPrice * item.quantity, 0);
    const shippingCost = subtotal >= 75 ? 0 : 9.99;
    const tax = subtotal * 0.13; // 13% HST
    const total = subtotal + shippingCost + tax;

    const orderNumber = generateOrderNumber();

    const result = await db.insert(orders).values({
      orderNumber,
      customerId,
      guestEmail: guestEmail || null,
      status: 'confirmed',
      shippingFirstName: shipping.firstName,
      shippingLastName: shipping.lastName,
      shippingLine1: shipping.line1,
      shippingLine2: shipping.line2 || null,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingPostalCode: shipping.postalCode,
      shippingCountry: shipping.country || 'CA',
      subtotal: subtotal.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    });

    const orderId = Number(result[0].insertId);

    // Insert line items
    await db.insert(orderItems).values(
      items.map((item: { productId: string; productName: string; variantSize?: string; variantColor?: string; quantity: number; unitPrice: number }) => ({
        orderId,
        productId: item.productId,
        productName: item.productName,
        variantSize: item.variantSize || null,
        variantColor: item.variantColor || null,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toFixed(2),
        lineTotal: (item.unitPrice * item.quantity).toFixed(2),
      }))
    );

    return res.status(201).json({
      orderId,
      orderNumber,
      total: total.toFixed(2),
      status: 'confirmed',
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ error: 'Failed to create order', message: String(error) });
  }
}
