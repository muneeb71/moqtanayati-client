"use client"
import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SellerTypePage = () => {
    // Initialize with Individual Owner selected
    const [selectedType, setSelectedType] = useState("Individual Owner");
    const router = useRouter();
    return (
        <div className="flex flex-col gap-12">
            <p className="text-[20px] font-medium text-center">
                Choose Your Seller Type
            </p>
            <div className="flex flex-col gap-8">
                <SellerTypeCard
                    className={`bg-[#EEF4FF] ${selectedType === "Individual Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
                    title="Individual Owner"
                    description="Perfect for displaying singular items. No inventory management or auction access required."
                    image="/individual.svg"
                    onClick={() => setSelectedType("Individual Owner")}
                    isSelected={selectedType === "Individual Owner"}
                    imageClassName="w-[140px] h-[60px]"
                    showIcon={selectedType === "Individual Owner"}
                />
                <SellerTypeCard
                    className={`bg-[#FCF3FB] ${selectedType === "Business Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
                    title="Business Owner"
                    description="For businesses with stock items. Includes online store, inventory management, and auction access."
                    image="/business.svg"
                    onClick={() => setSelectedType("Business Owner")}
                    isSelected={selectedType === "Business Owner"}
                    imageClassName="w-[150px] h-[60px]"
                    showIcon={selectedType === "Business Owner"}
                />
                <SellerTypeCard
                    className={`bg-[#EEFCF5] ${selectedType === "Productive Family Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
                    title="Productive Family Owner"
                    description="Ideal for family businesses selling homemade items and food products."
                    image="/family.svg"
                    onClick={() => setSelectedType("Productive Family Owner")}
                    isSelected={selectedType === "Productive Family Owner"}
                    imageClassName="w-[110px] h-[60px]"
                    showIcon={selectedType === "Productive Family Owner"}
                />
            </div>

            <RoundedButton
                title="Get Started"
                showIcon
                className="w-fit self-center px-16"
                // onClick={() => console.log("Getting Started", selectedType)}
                onClick={() => router.push("/upload-document")}
            />
        </div>
    )
}

export default SellerTypePage;