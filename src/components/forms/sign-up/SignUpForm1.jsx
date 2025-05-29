"use client";

import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { checkExistingUser } from "@/lib/api/auth/check-existing";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const SignUpForm1 = ({ role }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { name, email, phone, setName, setEmail, setPhone } = useRegisterStore(
    (state) => state,
  );

  const handleNextClick = async () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields (name, email, and phone).");
      return;
    }

    startTransition(async () => {
      const response = await checkExistingUser({ email, phone });
      if (!response.data.isRegistered) {
        router.push("/auth/" + role + "/sign-up/id-proof");
      } else {
        toast.error(response.message || response.data.message);
      }
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 px-2 py-5 md:gap-5 md:py-10">
        <h1 className="text-lg md:text-2xl">Tell us about yourself</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="Full Name" />
          <InputField
            placeholder="Enter your full name"
            icon={profileUserIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoFocus
            autoComplete="name"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Email" />
          <InputField
            placeholder="Enter your email"
            icon={profileEmailIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Phone" />
          <InputField
            placeholder="Enter your phone number"
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <RoundedButton
          onClick={() => handleNextClick()}
          title={isPending ? "Checking Unique ..." : "Next"}
          disabled={isPending}
          loading={isPending.toString()}
          showIcon
          className="min-w-72"
        />
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href={"/auth/" + role + "/login"}>Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm1;
