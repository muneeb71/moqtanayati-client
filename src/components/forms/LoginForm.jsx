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
import { getMessagingIfSupported } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
        const saved =
          typeof window !== "undefined" && localStorage.getItem("deviceToken");
        if (saved) {
          setDeviceToken(saved);
          console.log("FCM deviceToken (saved):", saved);
          return;
        }

        if (!("serviceWorker" in navigator)) return;
        try {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
            scope: "/",
          });
        } catch (_) {}
        const registration = await navigator.serviceWorker.ready;

        const messaging = await getMessagingIfSupported();
        if (!messaging) return;
        if (typeof Notification !== "undefined") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") return;
        }
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });
        if (token) {
          setDeviceToken(token);
          localStorage.setItem("deviceToken", token);
          console.log("FCM deviceToken (new):", token);
        }
      } catch (e) {
        console.log("FCM setup error:", e);
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    startTransition(async () => {
      console.log("Sending deviceToken with login:", deviceToken);
      const response = await loginUser(email, password, role, deviceToken);

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
        } catch (_) {}
        console.log("suc : ", response.data.user.role.toLowerCase());
        const rolePath = `/seller`;
        router.push(rolePath);

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
          loading={isPending.toString()}
          title={isPending ? "Logging in..." : "Log into your account"}
        />
        <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
          New to {appName}?
          <CustomLink
            href={
              role === "buyer"
                ? "/" + role + "/sign-up"
                : "/" + role + "/seller-type"
            }
          >
            Create Account
          </CustomLink>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
