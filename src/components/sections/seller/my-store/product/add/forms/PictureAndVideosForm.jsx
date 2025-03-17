import { camera2Icon, videoCameraIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import TextareaField from "@/components/form-fields/CustomTextArea";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { cn } from "@/lib/utils";

const PictureAndVideosForm = ({
  nextTab = () => {},
  prevTab = () => {},
  images,
  setImages,
  video,
  setVideo,
  productTitle,
  setProductTitle,
  productDescription,
  setProductDescription,
}) => {

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [...prev, ...files].slice(0, 12)); // Limit to 12 images
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideo(file); // Only one video allowed
  };
  return (
    <div className="flex w-full max-w-md flex-col gap-5 py-10">
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-xl font-medium">Pictures & Videos</h1>
          <span className="text-sm text-battleShipGray">
            You can upload up to 12 photos and a 1-minute video to cover every
            angle of the product.
          </span>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {/* Image Upload */}
          <div className="flex w-full flex-col gap-1">
            <span className="text-sm">{images.length}/12</span>
            <button
              className={cn(
                "flex h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-moonstone",
                "transition-all duration-100 ease-in hover:border-2 hover:border-solid hover:bg-moonstone/5",
              )}
              onClick={() => document.getElementById("imageInput").click()}
            >
              {camera2Icon}
              <span className="mt-1 text-sm">Capture images</span>
              <span className="text-xs text-moonstone">or Upload images</span>
            </button>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </div>

          {/* Video Upload */}
          <div className="flex w-full flex-col gap-1">
            <span className="text-sm">{video ? "1/1" : "0/1"}</span>
            <button
              className={cn(
                "flex h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-moonstone",
                "transition-all duration-100 ease-in hover:border-2 hover:border-solid hover:bg-moonstone/5",
              )}
              onClick={() => document.getElementById("videoInput").click()}
            >
              {videoCameraIcon}
              <span className="mt-1 text-sm">Make Video</span>
              <span className="text-xs text-moonstone">or Upload video</span>
            </button>
            <input
              id="videoInput"
              type="file"
              accept="video/*"
              hidden
              onChange={handleVideoUpload}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label text="Product title" />
        <InputField
          type="text"
          placeholder="Add product title"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label text="Product description" />
        <TextareaField
          className="h-40"
          type="text"
          placeholder="The product is of the ..."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center pb-20 pt-8">
        <RoundedButton
          onClick={() => nextTab()}
          title="Next"
          showIcon
          className="w-64"
        />
      </div>
    </div>
  );
};

export default PictureAndVideosForm;
