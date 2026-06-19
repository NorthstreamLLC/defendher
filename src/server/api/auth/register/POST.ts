import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { customers, sessions } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default async function handler(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check existing
    const existing = await db.select({ id: customers.id }).from(customers).where(eq(customers.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db.insert(customers).values({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      phone: phone || null,
    });

    const customerId = Number(result[0].insertId);

    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await db.insert(sessions).values({ id: sessionId, customerId, expiresAt });

    const customer = await db.select({
      id: customers.id,
      email: customers.email,
      firstName: customers.firstName,
      lastName: customers.lastName,
      phone: customers.phone,
      createdAt: customers.createdAt,
    }).from(customers).where(eq(customers.id, customerId)).limit(1);

    return res.status(201).json({ sessionId, customer: customer[0] });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Registration failed', message: String(error) });
  }
}
