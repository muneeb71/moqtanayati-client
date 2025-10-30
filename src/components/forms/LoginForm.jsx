"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useEffect, useState, useTransition } from "react";
import { useProfileStore } from "@/providers/profile-store-provider";
import RoundedButton from "../buttons/RoundedButton";
import CustomLink from "../link/CustomLink";
import { appName } from "@/lib/app-name";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth/login";
import toast from "react-hot-toast";
import { getSellerOrdersClient } from "@/lib/api/orders/getSellerOrderClient";
import { getUserNotifications } from "@/lib/api/notification";
import { getMessagingIfSupported } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { notificationHandler } from "@/lib/notification-handler";
import { useNotificationStoreContext } from "@/providers/notification-store-provider";
import { socketManager } from "@/lib/socket-client";

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createLoading, setCreateLoading] = useState(false);
  const { fetchNotifications, setNotifications } =
    useNotificationStoreContext();
  let setStore = null;
  let setOrders = null;
  let setSellerOrders = null;
  try {
    // Safe access: auth pages might not be wrapped with ProfileStoreProvider
    setStore = useProfileStore((state) => state.setStore);
    setOrders = useProfileStore((state) => state.setOrders);
    setSellerOrders = useProfileStore((state) => state.setSellerOrders);
  } catch (_) {
    setStore = null;
    setOrders = null;
    setSellerOrders = null;
  }

  // Obtain FCM token once on mount (if supported)
  useEffect(() => {
    (async () => {
      try {
        if (!("serviceWorker" in navigator)) {
          console.log("Service worker not supported");
          return;
        }

        // Always register service worker first
        try {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
            scope: "/",
          });
          console.log("Service worker registered successfully");
        } catch (error) {
          console.log("Service worker registration failed:", error);
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        console.log("Service worker ready");

        const messaging = await getMessagingIfSupported();
        if (!messaging) {
          console.log("Firebase messaging not supported");
          return;
        }

        // Request notification permission
        if (typeof Notification !== "undefined") {
          const permission = await Notification.requestPermission();
          console.log("Notification permission:", permission);
          if (permission !== "granted") {
            console.log("Notification permission not granted");
            return;
          }
        }

        // Always generate a fresh token (don't rely on saved tokens)
        console.log("Generating fresh FCM token...");
        try {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });

          if (token) {
            console.log("FCM deviceToken generated:", token);
            console.log("Token length:", token.length);

            // Validate token format
            if (token.length < 100) {
              console.warn("Generated token seems too short, might be invalid");
            }

            setDeviceToken(token);
            localStorage.setItem("deviceToken", token);

            // Initialize notification handler for foreground messages
            await notificationHandler.initialize();
          } else {
            console.log(
              "FCM token generation failed - notifications may not work",
            );
          }
        } catch (error) {
          if (error.code === "messaging/permission-blocked") {
            console.log(
              "Notification permission blocked by user - skipping token generation",
            );
            localStorage.removeItem("deviceToken");
          } else if (error.code === "messaging/permission-default") {
            console.log(
              "Notification permission not granted - skipping token generation",
            );
          } else {
            console.error("FCM token generation error:", error);
          }
        }
      } catch (e) {
        console.log("FCM setup error:", e);
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    startTransition(async () => {
      // Ensure we have a valid device token before login
      let tokenToSend = deviceToken;

      if (!tokenToSend) {
        console.log("No device token found, attempting to generate one...");

        // Try to get from localStorage first
        const savedToken =
          typeof window !== "undefined" && localStorage.getItem("deviceToken");
        if (savedToken) {
          console.log("Using saved token from localStorage");
          tokenToSend = savedToken;
          setDeviceToken(savedToken);
        } else {
          // Wait for token generation to complete
          console.log("Waiting for token generation...");
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const delayedToken =
            typeof window !== "undefined" &&
            localStorage.getItem("deviceToken");
          if (delayedToken) {
            console.log("Using delayed token from localStorage");
            tokenToSend = delayedToken;
            setDeviceToken(delayedToken);
          } else {
            console.log("No device token available, proceeding without it");
          }
        }
      }

      console.log("Sending deviceToken with login:", tokenToSend);
      console.log("Device token exists:", !!tokenToSend);
      console.log("Device token length:", tokenToSend?.length || 0);

      // Validate token format if it exists
      if (tokenToSend && tokenToSend.length < 100) {
        console.warn("Device token seems too short, might be invalid");
      }

      const response = await loginUser(email, password, role, tokenToSend);

      if (response.success) {
        try {
          const user = response.data?.user;
          const store = user?.store || user?.sellerStore || null;
          if (store && setStore) {
            // ensure products array exists
            const normalizedStore = {
              ...store,
              products: Array.isArray(store.products) ? store.products : [],
            };
            setStore(normalizedStore);
          }

          // Fetch and hydrate orders immediately after login
          try {
            const ordersRes = await getSellerOrdersClient();

            if (ordersRes.success) {
              if (setOrders) setOrders(ordersRes.data);
              if (setSellerOrders) setSellerOrders(ordersRes.data);
            }
          } catch (_) {}

          // Fetch and hydrate notifications immediately after login
          try {
            console.log("Fetching notifications after login...");
            const notificationsRes = await getUserNotifications();

            if (notificationsRes.success) {
              console.log(
                "Notifications fetched successfully:",
                notificationsRes.data?.length || 0,
                "notifications",
              );
              if (setNotifications) {
                setNotifications(notificationsRes.data || []);
                console.log("Notifications set in store successfully");
              }
            } else {
              console.error(
                "Failed to fetch notifications:",
                notificationsRes.message,
              );
            }
          } catch (error) {
            console.error("Failed to fetch notifications:", error);
          }
        } catch (_) {}
        console.log("suc : ", response.data.user.role.toLowerCase());
        const roleLower = String(response.data.user.role || "").toLowerCase();
        const rolePath =
          roleLower === "admin"
            ? "/admin"
            : roleLower === "seller"
              ? "/seller"
              : "/buyer";
        router.push(rolePath);

        // Establish socket connection and join user room for realtime updates (non-blocking)
        (() => {
          const userId = response.data?.user?.id;
          if (!userId) return;
          try {
            socketManager.setCurrentUser(userId);
          } catch (_) {}
          // Fire-and-forget to avoid blocking navigation
          socketManager
            .connect()
            .then(() => socketManager.joinUser(userId))
            .catch(() => {});
        })();

        // if (response.data.user.sellerSuvery) {
        //   router.push("/" + response.data.user.role.toLowerCase());
        // } else {
        //   router.push("/" + response.data.user.role.toLowerCase());
        // }
      } else {
        toast.error(response.message || "Login failed");
      }
    });
  };

  const handleCreateAccount = async () => {
    if (createLoading) return;
    setCreateLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 100));
      router.push(
        role === "buyer"
          ? "/" + role + "/sign-up"
          : "/" + role + "/seller-type",
      );
    } catch (_) {
      setCreateLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col gap-5">
      {/* Optionally, capture device token. In production, populate via FCM or native bridge */}
      <input type="hidden" value={deviceToken} onChange={() => {}} readOnly />
      <div className="flex w-full flex-col">
        <Label htmlFor="email" text="Email" />
        <InputField
          icon={envelopeIcon}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col">
        <Label htmlFor="password" text="Password" />
        <InputField
          icon={lockIcon}
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <CustomCheckBox
              checked={keepLoggedIn}
              setChecked={setKeepLoggedIn}
            />
            <span className="text-sm">Keep me logged in</span>
          </div>
          <CustomLink
            className="text-sm"
            href={`/${role}/login/forget-password`}
          >
            Forgot password ?
          </CustomLink>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 self-center pt-16">
        <RoundedButton
          type="submit"
          className="w-fit px-10"
          disabled={isPending}
          loading={isPending || undefined}
          title={isPending ? "Logging in..." : "Log into your account"}
        />
        <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
          New to {appName}?
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-moonstone underline disabled:opacity-60"
            disabled={createLoading}
          >
            {createLoading ? (
              <span className="inline-flex items-center gap-2">
                <span>Loading...</span>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
