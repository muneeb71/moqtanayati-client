"use client";

import React, { useRef, useState } from "react";
import { X, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (inputRef.current && files.length === 1) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-80 mx-auto mt-10 font-sans">
      <h1 className="text-3xl text-darkBlue">Upload Document(s)</h1>
      <p className="text-iconGray text-base mt-3">Please upload a document here</p>

      <div
        onClick={() => inputRef.current?.click()}
        className="mt-7 h-40 border w-full border-dashed border-[#D6D6D6] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
      >
        <CloudUpload className="text-iconGray" />
        <p className="text-sm mt-2 text-iconGray">
          <span className="text-moonstone">Click</span> to upload documents
        </p>
        <p className="text-xs text-iconGray mt-1">Max size 10MB</p>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
          multiple
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-48 overflow-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 rounded-md bg-[#F9F9FB] text-darkBlue text-sm"
            >
              <span className="truncate">{file.name}</span>
              <button onClick={() => removeFile(index)}>
                <X size={16} className="text-[#0B1437]" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/survey")}
        className="mt-16 w-full cursor-pointer bg-moonstone hover:bg-[#00A2C2] text-white text-base py-3 rounded-full transition"
      >
        Next
      </button>
    </div>
  );
};

export default Page;
