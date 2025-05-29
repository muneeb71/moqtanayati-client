"use client"

import Image from "next/image";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Mr Alex Jhons",
    phone: "+92 3334412433",
    email: "adminemplyee@gmail.com",
    cnic: "11334455667788",
    location: "Islamabad",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#EDF3F7] flex items-center flex-col justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md bg-white">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/static/testuser.svg"
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold mt-4">Fuzzy Duck</h2>
          <p className="text-gray-500 text-sm">Joined Jan, 2024</p>
        </div>

        <div className="space-y-4">
          {[
            { field: "name", value: profile.name },
            { field: "phone", value: profile.phone },
            { field: "email", value: profile.email },
            { field: "cnic", value: profile.cnic },
            { field: "location", value: profile.location },
          ].map(({ field, value }) => (
            <div
              key={field}
              className="flex items-center bg-[#F2F0FE] p-3 rounded-md justify-between"
            >
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
              <Pencil className="w-4 h-4 text-gray-500 ml-2" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => console.log("Saved", profile)}
          className=" mt-6 px-32 py-4 bg-moonstone hover:bg-moonstone/80 text-lg font-medium rounded-full text-white text-md"
        >
          Save
        </button>
        </div>
    </div>
  );
}
