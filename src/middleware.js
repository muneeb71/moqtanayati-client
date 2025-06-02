import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  const { pathname } = new URL(request.url);

  if (!token && !user) {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  if (user) {
    let parsedUser;
    parsedUser = JSON.parse(user);

    if (parsedUser.role === "SELLER") {
      if (!parsedUser.sellerSurvey && !pathname.startsWith("/survey")) {
        return NextResponse.redirect(new URL("/survey", request.url));
      }
      if (parsedUser.sellerSurvey && !pathname.startsWith("/seller")) {
        return NextResponse.redirect(new URL("/seller", request.url));
      }
    }

    if (parsedUser.role === "BUYER" && !pathname.startsWith("/buyer")) {
      return NextResponse.redirect(new URL("/buyer", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|static|leaflet).*)",
};
