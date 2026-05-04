// middleware.ts (root of project)
import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // POST /api/selling is public (user inquiry form), so the collection
  // path is intentionally omitted — middleware can't filter by method.
  // Admin checks for that path live in the route handler.
  matcher: ["/dashboard/:path*", "/api/selling/:id*"],
}