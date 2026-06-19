// Client-side auth helpers — session stored in localStorage

const SESSION_KEY = 'dh_session_id';
const CUSTOMER_KEY = 'dh_customer';

export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  createdAt: string;
}

export function getSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getStoredCustomer(): Customer | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(sessionId: string, customer: Customer): void {
  localStorage.setItem(SESSION_KEY, sessionId);
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CUSTOMER_KEY);
}

export function authHeaders(): Record<string, string> {
  const sessionId = getSessionId();
  return sessionId ? { 'x-session-id': sessionId } : {};
}

// ── API calls ──────────────────────────────────────────────────────────────

export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<{ sessionId: string; customer: Customer }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Registration failed');
  saveSession(json.sessionId, json.customer);
  return json;
}

export async function login(email: string, password: string): Promise<{ sessionId: string; customer: Customer }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  saveSession(json.sessionId, json.customer);
  return json;
}

export async function logout(): Promise<void> {
  const sessionId = getSessionId();
  if (sessionId) {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'x-session-id': sessionId },
    }).catch(() => {});
  }
  clearSession();
}

export async function fetchProfile(): Promise<Customer> {
  const res = await fetch('/api/customers/me', { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to load profile');
  return json;
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch('/api/orders', { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to load orders');
  return json;
}

export interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  variantSize?: string;
  variantColor?: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: string;
  total: string;
  subtotal: string;
  shippingCost: string;
  tax: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingLine1: string;
  shippingLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  trackingNumber?: string;
  trackingCarrier?: string;
  createdAt: string;
  items: OrderItem[];
}
