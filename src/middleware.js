import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userId = request.cookies.get("userId")?.value;
  const surveyJson = request.cookies.get("survey")?.value;
  const survey = typeof surveyJson === "string" ? JSON.parse(surveyJson) : null;
  const role = request.cookies.get("role")?.value;
  const { pathname } = new URL(request.url);

  const isAdminLogin = pathname.startsWith("/admin/login");
  const isAuthPath = pathname.startsWith("/auth");

  if (!token && !userId && (isAdminLogin || isAuthPath)) {
    return NextResponse.next();
  }

  if (!token && !userId && (isAdminLogin || isAuthPath)) {
    return NextResponse.next();
  }
  

  if (userId) {
    if (role === "SELLER") {
      if (!survey && !pathname.startsWith("/survey")) {
        return NextResponse.redirect(new URL("/survey", request.url));
      }
      if (survey && !pathname.startsWith("/seller")) {
        return NextResponse.redirect(new URL("/seller", request.url));
      }
    }

    if (role === "BUYER" && !pathname.startsWith("/buyer")) {
      return NextResponse.redirect(new URL("/buyer", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|static|leaflet).*)",
};
