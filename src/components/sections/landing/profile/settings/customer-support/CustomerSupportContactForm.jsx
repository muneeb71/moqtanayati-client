"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import CustomSelect from "@/components/form-fields/CustomSelect";
import TextareaField from "@/components/form-fields/CustomTextArea";
import FileUpload from "@/components/form-fields/FileUpload";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendSupportRequest } from "@/lib/api/support";
import useTranslation from "@/hooks/useTranslation";

const CustomerSupportContactForm = () => {
  const { t, locale } = useTranslation();
  const categories = [
    t("seller.profile.support.categories.1"),
    t("seller.profile.support.categories.2"),
    t("seller.profile.support.categories.3"),
    t("seller.profile.support.categories.4"),
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ensure selected label updates when language changes
  // or when categories array updates to translated labels
  if (selectedCategory && !categories.includes(selectedCategory)) {
    setSelectedCategory("");
  }

  const handleSubmit = async () => {
    if (!name || !email || !description) {
      toast.error(t("seller.profile.support.errors.fill_all"));
      return;
    }
    setLoading(true);
    try {
      await sendSupportRequest({
        name,
        email,
        category: selectedCategory,
        description,
        // file,
      });
      toast.success(t("seller.profile.support.success.sent"));
      setName("");
      setEmail("");
      setDescription("");
      setFile(null);
      setSelectedCategory(categories[0]);
    } catch (e) {
      toast.error(t("seller.profile.support.errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-16 py-10">
      <div className="grid w-full gap-10 sm:grid-cols-2">
        <div className="flex h-full w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* <Label text="Name" /> */}
            <InputField
              placeholder={t("seller.profile.support.placeholders.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Category" /> */}
            <CustomSelect
              placeholder={t("seller.profile.support.placeholders.category")}
              options={categories}
              selectedOption={selectedCategory}
              setSelectedOption={setSelectedCategory}
            />
          </div>
          <div className="flex h-full flex-col gap-1">
            {/* <Label text="Attachments" /> */}
            <FileUpload className="h-full" value={file} onChange={setFile} />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* <Label text="Email" /> */}
            <InputField
              type="email"
              placeholder={t("seller.profile.support.placeholders.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Description" /> */}
            <TextareaField
              placeholder={t("seller.profile.support.placeholders.description")}
              className="h-60"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <RoundedButton
        title={
          loading
            ? t("seller.profile.support.submitting")
            : t("seller.profile.support.submit")
        }
        className="w-72"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default CustomerSupportContactForm;
