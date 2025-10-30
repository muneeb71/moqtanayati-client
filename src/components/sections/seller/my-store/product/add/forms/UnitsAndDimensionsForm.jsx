"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/providers/product-store-provider";
import { XIcon } from "lucide-react/dist/cjs/lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { updateProductUnitAndDimensions } from "@/lib/api/product/update";
import { productAndServicesCategories } from "@/lib/categories";
import { useProfileStore } from "@/providers/profile-store-provider";
import { getUserProfileClient } from "@/lib/api/profile/getProfileClient";
import { getProductById } from "@/lib/api/product/getById";
import { getCookie } from "cookies-next";
import { getSellerSurvey } from "@/lib/api/seller-survey/getSurvey";

const UnitsAndDimensionsForm = () => {
  const {
    stock,
    length,
    width,
    height,
    weight,
    conditionRating,
    productCategories,
    productCondition,
    setStock,
    setLength,
    setWidth,
    setHeight,
    setWeight,
    setConditionRating,
    setProductCategories,
    setProductCondition,
  } = useProductStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");

  if (!id || id === "") {
    router.back();
  }

  const { store } = useProfileStore((state) => state);

  const [errors, setErrors] = useState({});
  const errorTimeoutRef = useRef();

  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [modalSelection, setModalSelection] = useState([]);
  const [allowedCategories, setAllowedCategories] = useState(
    productAndServicesCategories || [],
  );

  const productConditionsList = ["New", "Old"];

  // Prefill on edit
  useEffect(() => {
    const hydrate = async () => {
      try {
        if (!id) return;
        const p = await getProductById(id);
        if (!p) return;
        setStock(p.stock ?? "");
        setLength(p.length ?? "");
        setWidth(p.width ?? "");
        setHeight(p.height ?? "");
        setWeight(p.weight ?? "");
        setConditionRating(p.conditionRating ?? "");
        setProductCategories(
          Array.isArray(p.categories)
            ? p.categories
            : p.productCategories || [],
        );
        setProductCondition(p.productCondition || p.condition || "New");
      } catch (_) {}
    };
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Determine allowed categories based on seller type and survey selection
  useEffect(() => {
    const decideCategories = async () => {
      try {
        const res = await getUserProfileClient();
        const user = res?.data || {};
        const sellerType = (
          user?.sellerType ||
          user?.sellertype ||
          ""
        ).toUpperCase();
        const userId = user?.id || user?._id;
        let survey = user?.sellerSurvey || user?.survey || user?.surveyDetail;
        let rawSelected =
          survey?.productAndServices || survey?.productandservices;

        // If seller is BUSINESS but survey not present in profile, fetch from API
        if (
          !rawSelected &&
          (user?.sellerType || "").toUpperCase() === "BUSINESS"
        ) {
          const sv = await getSellerSurvey(userId);
          const svData = sv?.data || sv; // backend may return {data:{...}} or raw
          survey = svData || survey || {};
          rawSelected =
            survey?.productAndServices || survey?.productandservices || [];
          console.log("[UnitsAndDimensions] Loaded survey from API.");
        }
        if (!rawSelected) rawSelected = [];
        // Normalize survey selection to array of lowercase tokens
        const selectedArray = Array.isArray(rawSelected)
          ? rawSelected
          : typeof rawSelected === "string"
            ? rawSelected.split(/[;,|]/)
            : [];
        const selectedLower = new Set(
          selectedArray
            .map((s) =>
              String(s || "")
                .trim()
                .toLowerCase(),
            )
            .filter(Boolean),
        );
        if (sellerType === "BUSINESS" && selectedLower.size > 0) {
          console.log(
            "[UnitsAndDimensions] BUSINESS seller — survey productAndServices (raw):",
            rawSelected,
          );
          console.log(
            "[UnitsAndDimensions] BUSINESS seller — normalized selection (lowercased):",
            Array.from(selectedLower),
          );
          const filtered = (productAndServicesCategories || []).filter((c) => {
            const label = String(c.label || "").toLowerCase();
            const value = String(c.value || "").toLowerCase();
            return selectedLower.has(label) || selectedLower.has(value);
          });
          console.log(
            "[UnitsAndDimensions] BUSINESS seller — allowed categories after filter:",
            filtered.map((c) => c.label),
          );
          if (filtered.length > 0) {
            setAllowedCategories(filtered);
            return;
          }
        }
        setAllowedCategories(productAndServicesCategories || []);
      } catch (_) {
        setAllowedCategories(productAndServicesCategories || []);
      }
    };
    decideCategories();
  }, []);

  // Clear loading when next step route is active
  useEffect(() => {
    if (
      isLoading &&
      pathname?.startsWith("/seller/my-store/product/add/") &&
      pathname.includes("price-and-shipping")
    ) {
      setIsLoading(false);
    }
  }, [pathname, isLoading]);

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};
    const integerRegex = /^\d+$/; // e.g., 2, 879
    const decimalRegex = /^\d+(\.\d+)?$/; // e.g., 2, 9.8, 879

    if (!stock || !integerRegex.test(String(stock)))
      newErrors.stock = "Enter valid units (e.g., 2, 879).";
    if (!length || !decimalRegex.test(String(length)))
      newErrors.length = "Enter a valid length (e.g., 2, 9.8, 879).";
    if (!width || !decimalRegex.test(String(width)))
      newErrors.width = "Enter a valid width (e.g., 2, 9.8, 879).";
    if (!height || !decimalRegex.test(String(height)))
      newErrors.height = "Enter a valid height (e.g., 2, 9.8, 879).";
    if (!weight || !decimalRegex.test(String(weight)))
      newErrors.weight = "Enter a valid weight (e.g., 2, 9.8, 879).";
    if (!conditionRating || isNaN(parseFloat(conditionRating)))
      newErrors.conditionRating = "Condition rating is required.";
    if (!productCategories || productCategories.length === 0)
      newErrors.productCategories = "Product category is required.";
    if (!productCondition || productCondition.trim() === "")
      newErrors.productCondition = "Product condition is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors({}), 3000);
    }
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Next Button
  const handleNext = async () => {
    console.log("Categories before submit:", productCategories);

    if (validate()) {
      try {
        setIsLoading(true);

        const productData = {
          stock: parseFloat(stock),
          length: parseFloat(length),
          width: parseFloat(width),
          height: parseFloat(height),
          weight: parseFloat(weight),
          conditionRating: parseFloat(conditionRating),
          productCategories,
          productCondition,
          storeId: store.id,
          status: "DRAFT",
        };

        const response = await updateProductUnitAndDimensions(id, productData);

        if (response.success) {
          router.push(
            `/seller/my-store/product/add/price-and-shipping?id=${response.data.id}`,
          );
          // Do not clear loading here; it will clear when pathname updates
        } else {
          setErrors({
            submit:
              response.message || "Failed to save product. Please try again.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        setErrors({
          submit: "An unexpected error occurred. Please try again. " + error,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-5 py-10">
      <div className="flex w-full flex-col gap-1">
        <h1 className="text-xl font-medium">Units & Dimensions</h1>
        <span className="text-sm text-battleShipGray">
          Add the measurements of your product.
        </span>
      </div>

      <div className="grid w-full gap-5 md:grid-cols-2 md:gap-10">
        {/* ================= LEFT SIDE ================= */}
        <div className="flex w-full flex-col gap-5">
          {[
            { label: "Available units/stock", value: stock, set: setStock },
            { label: "Length 0.00 in", value: length, set: setLength },
            { label: "Width 0.00 in", value: width, set: setWidth },
            { label: "Height 0.00 in", value: height, set: setHeight },
            { label: "Weight 0.00 kg", value: weight, set: setWeight },
          ].map(({ label, value, set }, idx) => (
            <div className="flex flex-col gap-1" key={idx}>
              <InputField
                type="number"
                placeholder={label}
                value={value}
                step="0.01"
                onChange={(e) => set(e.target.value)}
              />
              {errors[label.toLowerCase().split(" ")[0]] && (
                <span className="text-xs text-red-500">
                  {errors[label.toLowerCase().split(" ")[0]]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex w-full flex-col gap-5">
          {/* Product condition */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {productConditionsList.map((condition, index) => (
                <button
                  key={index}
                  className={cn(
                    "rounded-lg border px-8 py-2",
                    productCondition === condition
                      ? "border-moonstone bg-moonstone text-white"
                      : "border-battleShipGray",
                  )}
                  onClick={() => setProductCondition(condition)}
                >
                  {condition}
                </button>
              ))}
            </div>
            {errors.productCondition && (
              <span className="text-xs text-red-500">
                {errors.productCondition}
              </span>
            )}
          </div>

          {/* Condition rating */}
          <div className="flex flex-col gap-1">
            <InputField
              type="number"
              placeholder="Condition Rating (0/10)"
              value={conditionRating}
              min={1}
              max={10}
              step="0.1"
              onChange={(e) => {
                const val = e.target.value;
                if (
                  val === "" ||
                  (parseFloat(val) >= 1 && parseFloat(val) <= 10)
                ) {
                  setConditionRating(val === "" ? "" : parseFloat(val));
                }
              }}
            />
            {errors.conditionRating && (
              <span className="text-xs text-red-500">
                {errors.conditionRating}
              </span>
            )}
          </div>

          {/* ✅ Category multi-select via popup */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-battleShipGray">
              Select Categories
            </label>
            <button
              type="button"
              onClick={() => {
                setCategoryQuery("");
                setModalSelection(
                  Array.isArray(productCategories) ? productCategories : [],
                );
                setShowCategoryModal(true);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm hover:border-moonstone focus:border-moonstone focus:outline-none"
            >
              {Array.isArray(productCategories) && productCategories.length > 0
                ? `${productCategories.length} selected`
                : "Choose product & services"}
            </button>

            {/* Category chips */}
            {Array.isArray(productCategories) &&
              productCategories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {productCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="relative flex items-center rounded-full bg-moonstone px-2 py-1 text-[10px] font-light text-white"
                    >
                      {cat}
                      <button
                        type="button"
                        className="ml-1 focus:outline-none"
                        onClick={() => {
                          const newCategories = productCategories.filter(
                            (_, i) => i !== idx,
                          );
                          setProductCategories(newCategories);
                        }}
                        aria-label={`Remove ${cat}`}
                      >
                        <XIcon size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            {errors.productCategories && (
              <span className="text-xs text-red-500">
                {errors.productCategories}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium">Select Product & Services</h4>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="rounded p-1 hover:bg-gray-100"
                aria-label="Close"
              >
                <XIcon size={16} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
              className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-moonstone focus:outline-none"
            />
            <div className="max-h-64 overflow-auto rounded border border-gray-200">
              <div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-2">
                {(allowedCategories || [])
                  .filter((c) =>
                    (c.label || "")
                      .toLowerCase()
                      .includes(categoryQuery.toLowerCase()),
                  )
                  .map((c) => {
                    const checked = modalSelection.includes(c.label);
                    return (
                      <label
                        key={c.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm",
                          checked ? "bg-moonstone/10" : "",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setModalSelection((prev) => {
                              const s = new Set(prev || []);
                              if (s.has(c.label)) s.delete(c.label);
                              else s.add(c.label);
                              return Array.from(s);
                            });
                          }}
                          className="accent-moonstone"
                        />
                        <span>{c.label}</span>
                      </label>
                    );
                  })}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setProductCategories(modalSelection);
                  setShowCategoryModal(false);
                }}
                className="rounded bg-moonstone px-3 py-1.5 text-sm text-white hover:bg-moonstone/90"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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

export default UnitsAndDimensionsForm;
