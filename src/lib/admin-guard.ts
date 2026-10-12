import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "./auth";

/** Second check inside every admin page and server action, in case a request reaches one without the middleware. */
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token, process.env.ADMIN_SESSION_SECRET))) redirect("/admin/login");
}
