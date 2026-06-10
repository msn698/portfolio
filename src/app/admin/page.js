import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminSession";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  // Server-side gate: the dashboard markup is never sent to the client
  // unless the signed session cookie verifies.
  const session = await verifySessionToken(token);

  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      {session ? <AdminDashboard email={session.sub} /> : <AdminLogin />}
    </main>
  );
}
