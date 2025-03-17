import Image from "next/image";

const SellerTypeCard = ({ title, description, image, className, onClick, imageClassName }) => {
    return (
        <div 
            className={`flex flex-row gap-5 rounded-2xl px-6 cursor-pointer py-6 ${className}`}
            onClick={onClick}
        >
            <div className={`rounded-full flex items-center justify-center ${imageClassName} bg-white`}>
                <Image
                    src={image}
                    width={30}
                    height={30}
                    alt="User profile image"

                />

            </div>
            <div className="flex flex-col ">
                <p className="text-[18px] font-medium">
                    {title}
                </p>
                <p className="font-normal text-[15px] text-davyGray/80">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SellerTypeCard;
