"use client";

import { camera2Icon, videoCameraIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import TextareaField from "@/components/form-fields/CustomTextArea";
import InputField from "@/components/form-fields/InputField";
import { addProduct } from "@/lib/api/product/add";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/providers/product-store-provider";
import { useProfileStore } from "@/providers/profile-store-provider";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const PictureAndVideosForm = () => {
  const {
    images,
    video,
    productTitle,
    productDescription,
    isLoading,
    setId,
    setImages,
    setVideo,
    setProductTitle,
    setProductDescription,
    setIsLoading,
  } = useProductStore();

  const { store } = useProfileStore((state) => state);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [previewUrls, setPreviewUrls] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const errorTimeoutRef = useRef();
  const router = useRouter();

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [previewUrls, videoPreview]);

  // Handle form submission on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!images || images.length === 0)
      newErrors.images = "At least one image is required.";
    if (!productTitle || productTitle.trim() === "")
      newErrors.title = "Product title is required.";
    if (!productDescription || productDescription.trim() === "")
      newErrors.description = "Product description is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors({}), 3000);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        const response = await addProduct({
          images,
          video,
          name: productTitle,
          description: productDescription,
          storeId: store.id,
          status: "DRAFT",
        });
        console.log("RESPONSE", response)
        setId(response.data.id);
        if (response.success) {
          router.push(`/seller/my-store/product/add/units-and-dimensions?id=${response.data.id}`);
        } else {
          setErrors({
            submit:
              response.message || "Failed to add product. Please try again.",
          });
        }
      } catch (error) {
        setErrors({
          submit: "An unexpected error occurred. Please try again."+ error,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Create preview URLs for new images
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
      setImages([...images, ...files].slice(0, 5));
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create preview URL for video
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setVideo(file);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-5 py-10">
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-xl font-medium">Pictures & Videos</h1>
          <span className="text-sm text-battleShipGray">
            You can upload up to 5 photos and a 1-minute video to cover every
            angle of the product.
          </span>
        </div>
        {previewUrls.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`uploaded-img-${idx}`}
                className="h-20 w-20 rounded border object-cover"
              />
            ))}
          </div>
        )}
        {videoPreview && (
          <div className="mb-2">
            <video
              src={videoPreview}
              controls
              className="w-full rounded border object-cover"
            />
          </div>
        )}
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {/* Image Upload */}
          <div className="flex w-full flex-col gap-1">
            <span className="text-sm">{images.length}/5</span>
            <button
              className={cn(
                "flex h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-moonstone",
                "transition-all duration-100 ease-in hover:border-2 hover:border-solid hover:bg-moonstone/5",
              )}
              onClick={() => imageInputRef.current?.click()}
            >
              {camera2Icon}
              <span className="mt-1 text-sm">Capture images</span>
              <span className="text-xs text-moonstone">or Upload images</span>
            </button>
            <input
              ref={imageInputRef}
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
              onClick={() => videoInputRef.current?.click()}
            >
              {videoCameraIcon}
              <span className="mt-1 text-sm">Make Video</span>
              <span className="text-xs text-moonstone">or Upload video</span>
            </button>
            <input
              ref={videoInputRef}
              id="videoInput"
              type="file"
              accept="video/*"
              hidden
              onChange={handleVideoUpload}
            />
          </div>
        </div>
        {errors.images && (
          <span className="text-xs text-red-500">{errors.images}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <InputField
          type="text"
          placeholder="Add product title"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <TextareaField
          className="h-40"
          type="text"
          placeholder="The product is of the ..."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {errors.description && (
          <span className="text-xs text-red-500">{errors.description}</span>
        )}
      </div>
      {errors.submit && (
        <span className="text-center text-xs text-red-500">
          {errors.submit}
        </span>
      )}
      <div className="flex items-center justify-center pb-20 pt-8">
        <RoundedButton
          onClick={handleNext}
          title={isLoading ? "Loading..." : "Next"}
          showIcon
          className="w-64"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default PictureAndVideosForm;
