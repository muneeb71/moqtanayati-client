"use client";
import { bellIcon, cartIcon } from "@/assets/icons/header-icons";
import Image from "next/image";
import NavLinks from "./NavLinks";
import MobileSheet from "./MobileSheet";
import Link from "next/link";
import HeaderDropdown from "./HeaderDropdown";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserProfileClient } from "@/lib/api/profile/getProfileClient";
import { getCart } from "@/lib/api/cart/getCart";
import toast from "react-hot-toast";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import useTranslation from "@/hooks/useTranslation";

const Header = () => {
  const { t, dir } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState(null);

  // Check if current page is active
  const isNotificationsActive = pathname.includes("/buyer/notifications");
  const isCartActive = pathname.includes("/buyer/cart");

  const getUserData = async () => {
    try {
      const res = await getUserProfileClient();
      if (res?.success) {
        setUser(res?.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const getCartData = async () => {
    try {
      const res = await getCart();
      if (res.success) {
        const items = res?.data?.data?.items || [];
        setCartItems(items);
        const totalCount = items.reduce(
          (total, item) => total + (item.quantity || 0),
          0,
        );
        setCartItemCount(totalCount);
      } else {
        setCartItems([]);
        setCartItemCount(0);
      }
    } catch (error) {
      setCartItems([]);
      setCartItemCount(0);
    }
  };

  const handleNavigation = (destination) => {
    setIsNavigating(true);
    setNavigatingTo(destination);

    // Navigate to the destination
    if (destination === "notifications") {
      router.push("/buyer/notifications/all");
    } else if (destination === "cart") {
      router.push("/buyer/cart");
    }

    // Reset loading state after navigation
    // Use a longer timeout to ensure it covers the actual page load
    setTimeout(() => {
      setIsNavigating(false);
      setNavigatingTo(null);
    }, 4000); // 4 seconds to ensure it covers the full page load
  };
  useEffect(() => {
    getUserData();
    getCartData();
  }, []);

  // Listen for page visibility changes to reset loading state
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isNavigating) {
        // Page is visible again, navigation likely complete
        setTimeout(() => {
          setIsNavigating(false);
          setNavigatingTo(null);
        }, 500); // Small delay to ensure page is fully loaded
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isNavigating]);

  // Listen for cart updates (you can add a custom event listener here)
  useEffect(() => {
    const handleCartUpdate = () => {
      getCartData();
    };

    // Listen for custom cart update events
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const [profileLoading, setProfileLoading] = useState(false);
  // Reset profile loader when route changes (header persists across pages)
  useEffect(() => {
    setProfileLoading(false);
  }, [pathname]);
  return (
    <header
      className="flex w-full flex-col items-center justify-center"
      dir={dir}
    >
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-5">
        <Image
          src={"/static/logo.png"}
          width={121}
          height={61}
          alt="LOGO"
          loading="eager"
          quality={100}
          priority
          style={{ width: "auto", height: "auto" }}
        />
        <NavLinks />
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          <LanguageSwitcher />
          <div className="grid grid-cols-[1fr_1px_1fr] place-items-center gap-5">
            <Link
              href="/buyer/notifications/all"
              className={`grid size-12 place-items-center rounded-full border ${
                isNotificationsActive
                  ? "border-moonstone bg-moonstone/10"
                  : "border-[#3F175F1A]"
              } ${
                isNavigating && navigatingTo === "notifications"
                  ? "opacity-50"
                  : ""
              }`}
              onClick={() => handleNavigation("notifications")}
            >
              {isNavigating && navigatingTo === "notifications" ? (
                <svg
                  className="h-5 w-5 animate-spin text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                bellIcon
              )}
            </Link>
            <div className="h-[44px] w-[1px] bg-[#3F175F1A]"></div>
            <Link
              href="/buyer/cart"
              className={`relative grid size-12 place-items-center rounded-full border ${
                isCartActive
                  ? "border-moonstone bg-moonstone/10"
                  : "border-[#3F175F1A]"
              } ${isNavigating && navigatingTo === "cart" ? "opacity-50" : ""}`}
              onClick={() => handleNavigation("cart")}
            >
              {isNavigating && navigatingTo === "cart" ? (
                <svg
                  className="h-5 w-5 animate-spin text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                cartIcon
              )}
              {cartItemCount > 0 && !isNavigating && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
          </div>
          {user ? (
            <>
              <Link
                href="/buyer/profile"
                className="relative size-12 overflow-hidden rounded-full"
                onClick={() => {
                  if (profileLoading) return;
                  setProfileLoading(true);
                }}
                aria-busy={profileLoading || undefined}
              >
                {user?.avatar && user.avatar.trim() !== "" ? (
                  <Image
                    src={user.avatar}
                    width={250}
                    height={250}
                    loading="lazy"
                    alt="user image"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500"
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
                {profileLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                )}
              </Link>
              <HeaderDropdown />
            </>
          ) : (
            <Link
              href="/buyer/login"
              className="rounded-full border border-moonstone bg-moonstone/10 px-4 py-2 text-sm font-medium text-moonstone hover:bg-moonstone/20"
            >
              {t("header.sign_in")}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/buyer/cart"
            className={`relative grid size-10 place-items-center rounded-full border ${
              isCartActive
                ? "border-moonstone bg-moonstone/10"
                : "border-[#3F175F1A]"
            } ${isNavigating && navigatingTo === "cart" ? "opacity-50" : ""}`}
            onClick={() => handleNavigation("cart")}
          >
            {isNavigating && navigatingTo === "cart" ? (
              <svg
                className="h-4 w-4 animate-spin text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              cartIcon
            )}
            {cartItemCount > 0 && !isNavigating && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              href="/buyer/profile"
              className="size-10 overflow-hidden rounded-full"
            >
              {user?.avatar && user.avatar.trim() !== "" ? (
                <Image
                  src={user.avatar}
                  width={250}
                  height={250}
                  loading="lazy"
                  alt="user image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/buyer/login"
              className="rounded-full border border-moonstone bg-moonstone/10 px-3 py-1.5 text-sm font-medium text-moonstone hover:bg-moonstone/20"
            >
              {t("header.sign_in")}
            </Link>
          )}
          <MobileSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
