import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { customers, sessions } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default async function handler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const rows = await db.select().from(customers).where(eq(customers.email, email.toLowerCase())).limit(1);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const customer = rows[0];
    const valid = await bcrypt.compare(password, customer.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db.insert(sessions).values({ id: sessionId, customerId: customer.id, expiresAt });

    return res.json({
      sessionId,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        createdAt: customer.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed', message: String(error) });
  }
}
