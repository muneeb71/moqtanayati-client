"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import OtpInput from "@/components/form-fields/OtpInput";
import { useEffect, useState, useTransition } from "react";
import { useProfileStore } from "@/providers/profile-store-provider";
import RoundedButton from "../buttons/RoundedButton";
import CustomLink from "../link/CustomLink";
import { appName } from "@/lib/app-name";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/lib/api/auth/login";
import { loginUserWithPhone } from "@/lib/api/auth/phone-login";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import toast from "react-hot-toast";
import { getSellerOrdersClient } from "@/lib/api/orders/getSellerOrderClient";
import { getUserNotifications } from "@/lib/api/notification";
import { getMessagingIfSupported } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { notificationHandler } from "@/lib/notification-handler";
import { useNotificationStoreContext } from "@/providers/notification-store-provider";
import { socketManager } from "@/lib/socket-client";
import useTranslation from "@/hooks/useTranslation";

const LoginForm = ({ role }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const [loginMethod, setLoginMethod] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const [isPending, startTransition] = useTransition();
  const [createLoading, setCreateLoading] = useState(false);
  const { fetchNotifications, setNotifications } =
    useNotificationStoreContext();
  let setStore = null;
  let setOrders = null;
  let setSellerOrders = null;
  try {
    setStore = useProfileStore((state) => state.setStore);
    setOrders = useProfileStore((state) => state.setOrders);
    setSellerOrders = useProfileStore((state) => state.setSellerOrders);
  } catch (_) {
    setStore = null;
    setOrders = null;
    setSellerOrders = null;
  }

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

  const handleSendOtp = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await sendOtp({ phone });
      if (res.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtpAndLogin = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    startTransition(async () => {
      try {
        const verifyRes = await verifyOtp({ phone, otp: otpValue });
        if (verifyRes.success) {
          toast.success(verifyRes.message || "OTP verified successfully");
          
          let tokenToSend = deviceToken;
          if (!tokenToSend) {
            const savedToken =
              typeof window !== "undefined" && localStorage.getItem("deviceToken");
            if (savedToken) {
              tokenToSend = savedToken;
            }
          }

          const response = await loginUserWithPhone(phone, role, tokenToSend);

          if (response.success) {
            try {
              const user = response.data?.user;
              const store = user?.store || user?.sellerStore || null;
              if (store && setStore) {
                const normalizedStore = {
                  ...store,
                  products: Array.isArray(store.products) ? store.products : [],
                };
                setStore(normalizedStore);
              }

              try {
                const ordersRes = await getSellerOrdersClient();
                if (ordersRes.success) {
                  if (setOrders) setOrders(ordersRes.data);
                  if (setSellerOrders) setSellerOrders(ordersRes.data);
                }
              } catch (_) {}

              try {
                const notificationsRes = await getUserNotifications();
                if (notificationsRes.success) {
                  if (setNotifications) {
                    setNotifications(notificationsRes.data || []);
                  }
                }
              } catch (_) {}
            } catch (_) {}

            const roleLower = String(response.data.user.role || "").toLowerCase();
            const rolePath =
              roleLower === "admin"
                ? "/admin"
                : roleLower === "seller"
                  ? "/seller"
                  : "/buyer";
            if (roleLower === "buyer" && returnUrl && returnUrl.startsWith("/buyer")) {
              router.push(returnUrl);
            } else {
              router.push(rolePath);
            }

            // Establish socket connection
            (() => {
              const userId = response.data?.user?.id;
              if (!userId) return;
              try {
                socketManager.setCurrentUser(userId);
              } catch (_) {}
              socketManager
                .connect()
                .then(() => socketManager.joinUser(userId))
                .catch(() => {});
            })();
          } else {
            toast.error(response.message || "Login failed");
          }
        } else {
          toast.error(verifyRes.message || "Invalid OTP");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to verify OTP and login");
      } finally {
        setVerifyingOtp(false);
      }
    });
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    if (loginMethod === "phone") {
      if (!otpSent) {
        await handleSendOtp();
        return;
      }
      await handleVerifyOtpAndLogin();
      return;
    }

    startTransition(async () => {
      let tokenToSend = deviceToken;

      if (!tokenToSend) {
        const savedToken =
          typeof window !== "undefined" && localStorage.getItem("deviceToken");
        if (savedToken) {
          tokenToSend = savedToken;
          setDeviceToken(savedToken);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const delayedToken =
            typeof window !== "undefined" &&
            localStorage.getItem("deviceToken");
          if (delayedToken) {
            tokenToSend = delayedToken;
            setDeviceToken(delayedToken);
          }
        }
      }

      const response = await loginUser(identifier, password, role, tokenToSend);

      if (response.success) {
        try {
          const user = response.data?.user;
          const store = user?.store || user?.sellerStore || null;
          if (store && setStore) {
            const normalizedStore = {
              ...store,
              products: Array.isArray(store.products) ? store.products : [],
            };
            setStore(normalizedStore);
          }

          try {
            const ordersRes = await getSellerOrdersClient();
            if (ordersRes.success) {
              if (setOrders) setOrders(ordersRes.data);
              if (setSellerOrders) setSellerOrders(ordersRes.data);
            }
          } catch (_) {}

          try {
            const notificationsRes = await getUserNotifications();
            if (notificationsRes.success) {
              if (setNotifications) {
                setNotifications(notificationsRes.data || []);
              }
            }
          } catch (_) {}
        } catch (_) {}
        const roleLower = String(response.data.user.role || "").toLowerCase();
        const rolePath =
          roleLower === "admin"
            ? "/admin"
            : roleLower === "seller"
              ? "/seller"
              : "/buyer";
        if (roleLower === "buyer" && returnUrl && returnUrl.startsWith("/buyer")) {
          router.push(returnUrl);
        } else {
          router.push(rolePath);
        }

            (() => {
              const userId = response.data?.user?.id;
              if (!userId) return;
              try {
                socketManager.setCurrentUser(userId);
              } catch (_) {}
              socketManager
                .connect()
                .then(() => socketManager.joinUser(userId))
                .catch(() => {});
            })();

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

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const resetOtpFlow = () => {
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col gap-5 min-w-0">
      <input type="hidden" value={deviceToken} onChange={() => {}} readOnly />
      <div className="flex items-center gap-4 mb-2 w-full min-w-0">
        <button
          type="button"
          onClick={() => {
            setLoginMethod("email");
            resetOtpFlow();
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink ${
            loginMethod === "email"
              ? "bg-moonstone text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Email / Phone / National ID / Password
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMethod("phone");
            resetOtpFlow();
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink ${
            loginMethod === "phone"
              ? "bg-moonstone text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Phone / OTP
        </button>
      </div>

      {loginMethod === "email" ? (
        <>
          <div className="flex w-full flex-col">
            <Label htmlFor="identifier" text="Email / Phone / National ID" />
            <InputField
              icon={envelopeIcon}
              type="text"
              placeholder="Enter your Email / Phone / National ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label htmlFor="password" text={t("login.password_label")} />
            <InputField
              icon={lockIcon}
              placeholder={t("login.password_placeholder")}
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
                <span className="text-sm">{t("login.keep_me_logged_in")}</span>
              </div>
              <CustomLink
                className="text-sm"
                href={`/${role}/login/forget-password`}
              >
                {t("login.forgot_password")}
              </CustomLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col">
            <Label htmlFor="phone" text="Phone Number" />
            <InputField
              icon={profilePhoneIcon}
              type="tel"
              placeholder="Enter your phone number (e.g., +966501234567)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={otpSent}
            />
          </div>
          {otpSent && (
            <div className="flex w-full flex-col gap-2">
              <Label text="Enter OTP" />
              <OtpInput value={otp} onChange={handleOtpChange} />
              <div className="flex items-center justify-between py-2">
                <button
                  type="button"
                  onClick={resetOtpFlow}
                  className="text-sm text-moonstone underline"
                >
                  Change phone number
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="text-sm text-moonstone underline disabled:opacity-50"
                >
                  {sendingOtp ? "Sending..." : "Resend OTP"}
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center justify-end py-2">
            <CustomLink
              className="text-sm"
              href={`/${role}/login/forget-password`}
            >
              {t("login.forgot_password")}
            </CustomLink>
          </div>
        </>
      )}

      <div className="flex flex-col items-center gap-5 self-center pt-16">
        <RoundedButton
          type="submit"
          className="w-fit px-10"
          disabled={isPending || sendingOtp || verifyingOtp}
          loading={isPending || sendingOtp || verifyingOtp || undefined}
          title={
            loginMethod === "phone"
              ? otpSent
                ? verifyingOtp
                  ? "Verifying..."
                  : "Verify & Login"
                : sendingOtp
                  ? "Sending OTP..."
                  : "Send OTP"
              : isPending
                ? t("login.logging_in")
                : t("login.login_cta")
          }
        />
        <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
          {t("login.new_to")} {appName}?
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-moonstone underline disabled:opacity-60"
            disabled={createLoading}
          >
            {createLoading ? (
              <span className="inline-flex items-center gap-2">
                <span>{t("common.loading")}</span>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            ) : (
              t("login.create_account")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
