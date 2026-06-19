import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  decimal,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

// ── CUSTOMERS ──────────────────────────────────────────────────────────────
export const customers = mysqlTable('customers', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// ── ADDRESSES ──────────────────────────────────────────────────────────────
export const addresses = mysqlTable('addresses', {
  id: int('id').primaryKey().autoincrement(),
  customerId: int('customer_id').notNull(),
  label: varchar('label', { length: 50 }).default('home'), // home | work | other
  line1: varchar('line1', { length: 255 }).notNull(),
  line2: varchar('line2', { length: 255 }),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  country: varchar('country', { length: 2 }).notNull().default('CA'),
  isDefault: int('is_default').default(0), // 0 | 1
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── ORDERS ─────────────────────────────────────────────────────────────────
export const orders = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  orderNumber: varchar('order_number', { length: 20 }).notNull().unique(),
  customerId: int('customer_id'), // nullable — guest checkout
  guestEmail: varchar('guest_email', { length: 255 }),

  // Status
  status: mysqlEnum('status', [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ])
    .notNull()
    .default('pending'),

  // Shipping address (snapshot at time of order)
  shippingFirstName: varchar('shipping_first_name', { length: 100 }).notNull(),
  shippingLastName: varchar('shipping_last_name', { length: 100 }).notNull(),
  shippingLine1: varchar('shipping_line1', { length: 255 }).notNull(),
  shippingLine2: varchar('shipping_line2', { length: 255 }),
  shippingCity: varchar('shipping_city', { length: 100 }).notNull(),
  shippingState: varchar('shipping_state', { length: 100 }).notNull(),
  shippingPostalCode: varchar('shipping_postal_code', { length: 20 }).notNull(),
  shippingCountry: varchar('shipping_country', { length: 2 }).notNull().default('CA'),

  // Totals
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).notNull().default('0.00'),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull().default('0.00'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),

  // Tracking
  trackingNumber: varchar('tracking_number', { length: 100 }),
  trackingCarrier: varchar('tracking_carrier', { length: 50 }),
  notes: text('notes'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// ── ORDER ITEMS ────────────────────────────────────────────────────────────
export const orderItems = mysqlTable('order_items', {
  id: int('id').primaryKey().autoincrement(),
  orderId: int('order_id').notNull(),
  productId: varchar('product_id', { length: 100 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  variantSize: varchar('variant_size', { length: 20 }),
  variantColor: varchar('variant_color', { length: 50 }),
  quantity: int('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  lineTotal: decimal('line_total', { precision: 10, scale: 2 }).notNull(),
});

// ── SESSIONS ───────────────────────────────────────────────────────────────
export const sessions = mysqlTable('sessions', {
  id: varchar('id', { length: 64 }).primaryKey(),
  customerId: int('customer_id').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
