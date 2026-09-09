import { redirect } from 'next/navigation';
import { getSession } from './auth';

/**
 * Server utility to protect admin pages.
 * Redirects to /admin/login if not authenticated.
 * Call this at the top of any admin page or layout.
 */
export async function requireAdminAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}
