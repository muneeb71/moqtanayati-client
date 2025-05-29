import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  const { pathname } = new URL(request.url);

  if (!token) {
    if (pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  if (user) {
    let parsedUser;
    try {
      parsedUser = JSON.parse(user);
    } catch (e) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (parsedUser.role === "SELLER" && !pathname.startsWith("/seller")) {
      return NextResponse.redirect(new URL("/seller", request.url));
    }

    if (parsedUser.role === "BUYER" && !pathname.startsWith("/buyer")) {
      return NextResponse.redirect(new URL("/buyer", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth|static|leaflet).*)",
};
