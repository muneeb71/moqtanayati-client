"use client";

import { camera2Icon, videoCameraIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import TextareaField from "@/components/form-fields/CustomTextArea";
import InputField from "@/components/form-fields/InputField";
import { addProduct } from "@/lib/api/product/add";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/providers/product-store-provider";
import { useProfileStore } from "@/providers/profile-store-provider";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { updateProductBasics } from "@/lib/api/product/update";

const PictureAndVideosForm = ({ editProduct }) => {
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
    reset,
  } = useProductStore();

  const { store } = useProfileStore((state) => state);
  const setStore = useProfileStore((state) => state.setStore);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [previewUrls, setPreviewUrls] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [serverImageUrls, setServerImageUrls] = useState([]);
  const errorTimeoutRef = useRef();
  const router = useRouter();
  const pathname = usePathname();

  // Prefill or reset store depending on edit mode
  useEffect(() => {
    if (editProduct && editProduct.id) {
      setId(editProduct.id);
      // Keep store images empty (server images), but show previews for existing URLs
      const serverImages = Array.isArray(editProduct.images)
        ? editProduct.images.filter(Boolean)
        : [];
      setPreviewUrls(serverImages);
      setServerImageUrls(serverImages);
      const serverVideo = Array.isArray(editProduct?.videos)
        ? editProduct.videos[0]
        : editProduct?.video;
      setVideoPreview(serverVideo || null);
      setVideo(null);
      setProductTitle(editProduct.name || "");
      setProductDescription(editProduct.description || "");
    } else {
      reset();
      setPreviewUrls([]);
      setServerImageUrls([]);
      setVideoPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProduct?.id]);

  // Avoid revoking preview URLs on list changes to prevent breaking remaining images
  // We already revoke URLs when removing a specific image/video
  // Optional: add an unmount cleanup if needed
  useEffect(() => {
    return () => {};
  }, [previewUrls, videoPreview]);

  // When navigation completes (pathname changes to next step), stop loading
  useEffect(() => {
    if (
      isLoading &&
      pathname?.startsWith("/seller/my-store/product/add/") &&
      pathname.includes("units-and-dimensions")
    ) {
      setIsLoading(false);
    }
  }, [pathname, isLoading, setIsLoading]);

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
    // If editing, skip add API and go next with existing id
    if (editProduct && editProduct.id) {
      try {
        setIsLoading(true);
        const resp = await updateProductBasics(editProduct.id, {
          images, // new uploads only
          video,
          name: productTitle,
          description: productDescription,
          status: editProduct.status || "DRAFT",
          existingImageUrls: serverImageUrls,
        });
        // ignore errors for now, continue flow
      } catch (_) {
      } finally {
        setIsLoading(false);
      }
      router.push(
        `/seller/my-store/product/add/units-and-dimensions?id=${editProduct.id}`,
      );
      return;
    }

    if (validate()) {
      try {
        setIsLoading(true);

        console.log("🔍 [PictureAndVideosForm] Store ID:", store?.id);

        // Check if store exists and has an id
        if (!store || !store.id) {
          console.error(
            "🔍 [PictureAndVideosForm] Store is missing or has no ID:",
            {
              store,
              storeId: store?.id,
              storeKeys: store ? Object.keys(store) : "store is null/undefined",
            },
          );
          setErrors({
            submit:
              "Store information is missing. Please ensure you have a store set up before adding products.",
          });
          setIsLoading(false);
          return;
        }

        const response = await addProduct({
          images,
          video,
          name: productTitle,
          description: productDescription,
          storeId: store.id,
          status: "DRAFT",
        });

        console.log("🔍 [PictureAndVideosForm] AddProduct response:", response);
        console.log("🔍 [PictureAndVideosForm] Response data:", response?.data);

        if (!response?.success) {
          // Handle authentication errors specifically
          if (
            response?.message?.includes("Invalid JWT Signature") ||
            response?.message?.includes("invalid_grant")
          ) {
            setErrors({
              submit: "Your session has expired. Please log in again.",
            });
          } else {
            setErrors({
              submit:
                response?.message ||
                "Failed to create product. Please try again.",
            });
          }
          setIsLoading(false);
          return;
        }

        if (!response?.data?.id) {
          setErrors({
            submit: "Failed to create product. Please try again.",
          });
          setIsLoading(false);
          return;
        }

        setId(response.data.id);
        if (response.success) {
          // Optimistically update store products count
          try {
            if (store) {
              const currentProducts = Array.isArray(store?.products)
                ? store.products
                : [];
              const newProduct = {
                id: response.data.id,
                name: productTitle,
                images,
                address: store?.address || "",
                createdAt: new Date().toISOString(),
                status: "DRAFT",
              };
              setStore({
                ...store,
                products: [...currentProducts, newProduct],
              });
            }
          } catch (_) {}
          router.push(
            `/seller/my-store/product/add/units-and-dimensions?id=${response.data.id}`,
          );
          // Do NOT clear loading here; it will clear when pathname changes
        } else {
          setErrors({
            submit:
              response.message || "Failed to add product. Please try again.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        setErrors({
          submit: "An unexpected error occurred. Please try again." + error,
        });
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const MAX_IMAGES = 5;

    if (files.length === 0) return;

    const existingCount = serverImageUrls.length;
    const remainingSlots = Math.max(
      0,
      MAX_IMAGES - ((images?.length || 0) + existingCount),
    );
    if (remainingSlots === 0) {
      setErrors({ images: `You can upload up to ${MAX_IMAGES} images.` });
      // reset input so the same file selection can trigger again later
      event.target.value = "";
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      setErrors({
        images: `Only ${remainingSlots} more image${remainingSlots > 1 ? "s" : ""} allowed.`,
      });
    }

    // Create preview URLs for new images
    const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setImages([...(images || []), ...filesToAdd].slice(0, MAX_IMAGES));

    // reset input selection
    event.target.value = "";
  };

  const handleVideoUpload = (event) => {
    const file = (event.target.files || [])[0];
    if (!file) return;

    if (video) {
      setErrors({ submit: "Only 1 video is allowed." });
      event.target.value = "";
      return;
    }

    // Create preview URL for video
    const videoUrl = URL.createObjectURL(file);
    setVideoPreview(videoUrl);
    setVideo(file);

    // reset input selection
    event.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const serverCount = serverImageUrls.length;
    if (index < serverCount) {
      // Removing a server image
      const nextServer = serverImageUrls.filter((_, i) => i !== index);
      setServerImageUrls(nextServer);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    // Removing a newly added image
    const newIndex = index - serverCount;
    const nextImages = (images || []).filter((_, i) => i !== newIndex);
    setImages(nextImages);

    // Revoke and remove only the matching preview URL
    setPreviewUrls((prev) => {
      const url = prev[index];
      if (url) {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      try {
        URL.revokeObjectURL(videoPreview);
      } catch (_) {}
    }
    setVideoPreview(null);
    setVideo(null);
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
              <div key={idx} className="relative">
                <img
                  src={url}
                  alt={`uploaded-img-${idx}`}
                  className="h-20 w-20 rounded border object-cover"
                />
                <button
                  type="button"
                  className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-red-600 text-white shadow"
                  onClick={() => handleRemoveImage(idx)}
                  aria-label={`Remove image ${idx + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {videoPreview && (
          <div className="relative mb-2">
            <video
              src={videoPreview}
              controls
              className="w-full rounded border object-cover"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white shadow"
              onClick={handleRemoveVideo}
              aria-label="Remove video"
            >
              Remove
            </button>
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
