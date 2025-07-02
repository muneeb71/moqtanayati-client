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

const CustomerSupportContactForm = () => {
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !description) {
      toast.error("Please fill all required fields.");
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
      toast.success("Support request sent successfully!");
      setName("");
      setEmail("");
      setDescription("");
      setFile(null);
      setSelectedCategory(categories[0]);
    } catch (e) {
      toast.error("Failed to send support request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center py-10 gap-16">
      <div className="grid w-full gap-10 sm:grid-cols-2">
        <div className="flex h-full w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* <Label text="Name" /> */}
            <InputField placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Category" /> */}
            <CustomSelect
              placeholder="Category"
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
            <InputField type="email" placeholder="alex@oqtanayati.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Description" /> */}
            <TextareaField
              placeholder="Enter Issue Description"
              className="h-60"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <RoundedButton title={loading ? "Submitting..." : "Submit"} className="w-72" onClick={handleSubmit} disabled={loading} />
    </div>
  );
};

export default CustomerSupportContactForm;
