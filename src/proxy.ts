import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Apex host used for www → non-www 301s (after custom domain is attached). */
const APEX_HOST = "fancifytext.com";

function isLocalHost(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".localhost")
  );
}

/** Non-canonical hosts must not be indexed (duplicate signals vs apex). */
function shouldNoindexHost(host: string): boolean {
  if (process.env.VERCEL_ENV === "preview") return true;
  if (isLocalHost(host)) return false;
  if (host === APEX_HOST) return false;
  // Production *.vercel.app (and any other non-apex host) stay noindex until
  // traffic is only served on the custom domain.
  return true;
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // www and production *.vercel.app → apex (single indexable host).
  if (
    host === `www.${APEX_HOST}` ||
    (host.endsWith(".vercel.app") && process.env.VERCEL_ENV === "production")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  if (shouldNoindexHost(host)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|ico)$).*)"],
};
