import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userId = request.cookies.get("userId")?.value;
  const surveyJson = request.cookies.get("survey")?.value;
  const survey = typeof surveyJson === "string" ? JSON.parse(surveyJson) : null;
  const role = request.cookies.get("role")?.value;
  const { pathname } = new URL(request.url);

  console.log("Middleware - pathname:", pathname, "role:", role);

  const isAdminLogin = pathname.startsWith("/admin/login");
  const isAuthPath = pathname.startsWith("/auth");
  const isLoginOrSignupPage =
    pathname.includes("/login") ||
    pathname.includes("/sign-up") ||
    pathname.includes("/seller-type") ||
    pathname.includes("/email-otp") ||
    pathname.includes("/phone-otp");

  // If visiting auth pages, proactively clear auth cookies to avoid auto-redirects
  if (isLoginOrSignupPage || isAdminLogin) {
    const response = NextResponse.next();
    try {
      response.cookies.delete("token");
      response.cookies.delete("userId");
      response.cookies.delete("role");
      response.cookies.delete("survey");
      response.cookies.delete("storeId");
    } catch (_) {}
    return response;
  }
  const isAuthRoute =
    isAdminLogin ||
    pathname.includes("/login") ||
    pathname.includes("/sign-up") ||
    pathname.includes("/email-otp") ||
    pathname.includes("/phone-otp");

  // If user visits any auth page, clear auth cookies to ensure a clean flow
  if (isAuthRoute) {
    const res = NextResponse.next();
    res.cookies.delete("token");
    res.cookies.delete("userId");
    res.cookies.delete("role");
    res.cookies.delete("survey");
    return res;
  }

  if (!token && !userId && (isAdminLogin || isAuthPath)) {
    return NextResponse.next();
  }

  if (!token && !userId && (isAdminLogin || isAuthPath)) {
    return NextResponse.next();
  }

  if (userId) {
    // Allow visiting auth pages (login/sign-up/otp) even if authenticated
    const isLoginOrSignup =
      pathname.includes("/login") ||
      pathname.includes("/sign-up") ||
      pathname.includes("/email-otp") ||
      pathname.includes("/phone-otp");
    if (isLoginOrSignup) {
      return NextResponse.next();
    }
    if (role === "ADMIN" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role === "SELLER") {
      // if (!survey && !pathname.startsWith("/survey")) {
      //   return NextResponse.redirect(new URL("/survey", request.url));
      // }
      if (!survey && !pathname.startsWith("/seller")) {
        return NextResponse.redirect(new URL("/seller", request.url));
      }
    }

    if (role === "BUYER" && !pathname.startsWith("/buyer")) {
      console.log("Redirecting BUYER from", pathname, "to /buyer");
      return NextResponse.redirect(new URL("/buyer", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|static|leaflet).*)",
};
