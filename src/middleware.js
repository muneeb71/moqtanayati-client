import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userId = request.cookies.get("userId")?.value;
  const surveyJson = request.cookies.get("survey")?.value;
  const survey = typeof surveyJson === "string" ? JSON.parse(surveyJson) : null;
  const role = request.cookies.get("role")?.value;
  const { pathname } = new URL(request.url);

  const isAdminLogin = pathname.startsWith("/admin/login");
  const isAdminPath = pathname.startsWith("/admin");
  const isAuthPath = pathname.startsWith("/auth");
  const isBuyerPath = pathname.startsWith("/buyer");
  const isSellerPath = pathname.startsWith("/seller");
  const isSellerOnboarding = pathname.startsWith("/seller/onboarding");
  const roleUpper = (role || "").toUpperCase();

  // Buyer routes that guests can access (browse without signing in)
  const isBuyerGuestPath =
    pathname === "/buyer" ||
    pathname.startsWith("/buyer/category") ||
    pathname.startsWith("/buyer/product-details") ||
    pathname.startsWith("/buyer/auctions") ||
    pathname.startsWith("/buyer/search") ||
    pathname.startsWith("/buyer/help-center") ||
    pathname.startsWith("/buyer/login") ||
    pathname.startsWith("/buyer/sign-up");

  const isLoginOrSignupPage =
    pathname.includes("/login") ||
    pathname.includes("/sign-up") ||
    pathname.includes("/seller-type") ||
    pathname.includes("/email-otp") ||
    pathname.includes("/phone-otp") ||
    pathname.includes("/location-selection") ||
    isSellerOnboarding;

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
    pathname.includes("/phone-otp") ||
    pathname.includes("/location-selection") ||
    isSellerOnboarding;

  // If user visits any auth page, clear auth cookies to ensure a clean flow
  if (isAuthRoute) {
    const res = NextResponse.next();
    res.cookies.delete("token");
    res.cookies.delete("userId");
    res.cookies.delete("role");
    res.cookies.delete("survey");
    return res;
  }

  // Helper to clear cookies and redirect to start page
  const clearAndRedirectToStart = () => {
    const res = NextResponse.redirect(new URL("/", request.url));
    try {
      res.cookies.delete("token");
      res.cookies.delete("userId");
      res.cookies.delete("role");
      res.cookies.delete("survey");
      res.cookies.delete("storeId");
    } catch (_) {}
    return res;
  };

  // If no cookies and trying to access protected areas
  if (!token || !userId) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isSellerPath && !isSellerOnboarding) {
      return clearAndRedirectToStart();
    }
    // Buyer: allow guests on browsing routes only; require login for cart, profile, etc.
    if (isBuyerPath) {
      if (isBuyerGuestPath) {
        return NextResponse.next();
      }
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/buyer/login?returnUrl=${returnUrl}`, request.url),
      );
    }
  }

  // Protect admin routes strictly: only ADMIN role allowed, otherwise clear and go to start
  if (isAdminPath && !isAdminLogin) {
    const isAuthenticatedAdmin = Boolean(
      token && userId && roleUpper === "ADMIN",
    );
    if (!isAuthenticatedAdmin) {
      return clearAndRedirectToStart();
    }
  }

  if (userId) {
    // Allow visiting auth pages (login/sign-up/otp) even if authenticated
    const isLoginOrSignup =
      pathname.includes("/login") ||
      pathname.includes("/sign-up") ||
      pathname.includes("/email-otp") ||
      pathname.includes("/phone-otp") ||
      pathname.includes("/location-selection") ||
      isSellerOnboarding;
    if (isLoginOrSignup) {
      return NextResponse.next();
    }
    // Only one privileged case: allow BUYER cookies to access /buyer
    if (isBuyerPath) {
      if (roleUpper !== "BUYER") {
        return NextResponse.redirect(
          new URL(roleUpper === "SELLER" ? "/seller" : "/admin", request.url),
        );
      }
    } else if (isSellerPath) {
      // Allow only SELLER role on /seller
      if (roleUpper !== "SELLER") {
        return NextResponse.redirect(
          new URL(roleUpper === "BUYER" ? "/buyer" : "/admin", request.url),
        );
      }
    } else if (isAdminPath && !isAdminLogin) {
      // already handled above; keep for clarity
      if (roleUpper !== "ADMIN") return clearAndRedirectToStart();
    } else {
      // If logged in as BUYER and not on /buyer, guide to buyer home
      if (roleUpper === "BUYER" && !pathname.startsWith("/buyer")) {
        return NextResponse.redirect(new URL("/buyer", request.url));
      }
      // For any other role/path combination, snap to role root (do not clear cookies)
      if (
        !(
          (roleUpper === "BUYER" && isBuyerPath) ||
          (roleUpper === "SELLER" && isSellerPath)
        )
      ) {
        const roleRoot =
          roleUpper === "SELLER"
            ? "/seller"
            : roleUpper === "ADMIN"
              ? "/admin"
              : "/buyer";
        return NextResponse.redirect(new URL(roleRoot, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|static|leaflet).*)",
};
