import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Apex host used for www → non-www 301s (after custom domain is attached). */
const APEX_HOST = "fancifytext.com";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (host === `www.${APEX_HOST}`) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  // Only noindex git preview deployments — production *.vercel.app stays indexable
  // until the custom domain is attached.
  if (process.env.VERCEL_ENV === "preview") {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|ico)$).*)"],
};
