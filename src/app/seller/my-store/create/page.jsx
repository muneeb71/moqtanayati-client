"use client";
import { cameraIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import TextareaField from "@/components/form-fields/CustomTextArea";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import PageHeading from "@/components/headings/PageHeading";
import { cn } from "@/lib/utils";
import useTranslation from "@/hooks/useTranslation";

const CreateStorePage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3">
      <PageHeading>{t("store.create_store")}</PageHeading>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-20">
        <div className="flex flex-col items-center gap-1">
          <button
            className={cn(
              "flex size-36 flex-col items-center justify-center gap-1 rounded-full border border-dashed border-moonstone",
              "transition-all duration-200 ease-in hover:border-2 hover:border-solid hover:bg-moonstone/5",
            )}
          >
            {cameraIcon}
            <div className="text-xs">{t("store.upload_logo")}</div>
          </button>
          <span className="text-darkBlue">{t("store.add_store_logo")}</span>
          <span className="text-xs text-battleShipGray">
            {t("store.add_store_logo_sub")}
          </span>
        </div>
        <div className="grid w-full gap-5 md:grid-cols-2 md:gap-10">
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1">
              {/* <Label text="Store name" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.store_name") || ""}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* <Label text="Owner name" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.owner_name") || ""}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* <Label text="Business Email" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.business_email") || ""}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* <Label text="Phone Number" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.phone") || ""}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1">
              {/* <Label text="Address Location" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.address_location") || ""}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* <Label text="Store description" /> */}
              <TextareaField
                className="h-[8.8rem]"
                type="text"
                placeholder={t("store.placeholders.description") || ""}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* <Label text="Store Category" /> */}
              <InputField
                type="text"
                placeholder={t("store.placeholders.category") || ""}
              />
            </div>
          </div>
        </div>
        <div className="py-20">
          <RoundedButton title={t("store.create_store")} className="min-w-72" />
        </div>
      </div>
    </div>
  );
};

export default CreateStorePage;
