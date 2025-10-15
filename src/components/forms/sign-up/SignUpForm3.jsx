"use client";

import { lockIcon } from "@/assets/icons/input-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpForm3 = ({ role }) => {
  const router = useRouter();
  const { password, confirmPassword, setPassword, setConfirmPassword } =
    useRegisterStore((state) => state);

  const handleNextClick = () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    } else if (!confirmPassword) {
      toast.error("Please re-enter password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    router.push(`/${role}/location-selection`);
  };
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">Tell us about yourself</h1>
        <div className="flex w-full flex-col">
          <Label text="Password" />
          <InputField
            type="password"
            placeholder="Enter your Password"
            icon={lockIcon}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex w-full flex-col">
          <Label text="Confirm Password" />
          <InputField
            type="password"
            placeholder="Re-enter your Password"
            icon={lockIcon}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <RoundedButton
          onClick={() => handleNextClick()}
          title="Create my account"
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

export default SignUpForm3;
