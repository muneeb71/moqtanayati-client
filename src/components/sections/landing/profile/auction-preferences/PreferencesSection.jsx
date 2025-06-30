"use client";

import {
  electronicsIcon,
  furnitureIcon,
} from "@/assets/icons/category-slider-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import toast from "react-hot-toast";
import { updateAuctionPreference } from "@/lib/api/profile/updatePreference";

const BAR_MAX = 20000;

const PreferencesSection = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, BAR_MAX / 2]);
  const [alertEnding, setAlertEnding] = useState(false);
  const [alertNew, setAlertNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUserProfile();
        
        const prefs = res?.data?.preferences[0];
        if (prefs) {
          setSelectedCategories((prefs.categories || []).map((cat) => ({ title: cat })));
          const min = prefs.minPrice ?? 0;
          const max = prefs.maxPrice ?? BAR_MAX;
          setSelectedPriceRange([min, max]);
          setAlertEnding(!!prefs.alertEnding);
          setAlertNew(!!prefs.alertNew);
        } else {
          setSelectedCategories([]);
          setSelectedPriceRange([0, BAR_MAX / 2]);
          setAlertEnding(false);
          setAlertNew(false);
        }
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCategoryInput = (e) => setCategoryInput(e.target.value);
  const handleCategoryKeyDown = (e) => {
    if (e.key === "Enter" && categoryInput.trim()) {
      if (!selectedCategories.some((cat) => cat.title === categoryInput.trim())) {
        setSelectedCategories([...selectedCategories, { title: categoryInput.trim() }]);
      }
      setCategoryInput("");
    }
  };
  const handleRemoveCategory = (title) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((category) => category.title !== title),
    );
  };

  const handleSliderChange = (values) => {
    setSelectedPriceRange(values);
  };
  const handleInputChange = (index, value) => {
    let val = value ? parseInt(value, 10) : 0;
    if (isNaN(val) || val < 0) val = 0;
    let newRange = [...selectedPriceRange];
    newRange[index] = val;
    // Clamp values between 0 and BAR_MAX
    if (newRange[0] < 0) newRange[0] = 0;
    if (newRange[1] > BAR_MAX) newRange[1] = BAR_MAX;
    if (newRange[0] > newRange[1]) newRange[0] = newRange[1];
    setSelectedPriceRange(newRange);
  };

  const handleSavePreferences = async () => {
    const data = {
      categories: selectedCategories.map((cat) => cat.title),
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      alertEnding,
      alertNew,
    };
    try {
      const res = await updateAuctionPreference(data);
      if (res.success) {
        toast.success("Preferences updated!");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex w-full max-w-[470px] flex-col gap-6 p-5">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Category Selection
        </h1>
        <div className="flex gap-2 mb-2">
          <input
            className="border-b border-moonstone outline-none bg-transparent px-2 py-1 flex-1"
            placeholder="Type and press Enter or click Add"
            value={categoryInput}
            onChange={handleCategoryInput}
            onKeyDown={handleCategoryKeyDown}
          />
          <button
            className="w-fit text-start font-semibold text-moonstone cursor-pointer"
            onClick={() => {
              if (
                categoryInput.trim() &&
                !selectedCategories.some((cat) => cat.title === categoryInput.trim())
              ) {
                setSelectedCategories([
                  ...selectedCategories,
                  { title: categoryInput.trim() },
                ]);
                setCategoryInput("");
              }
            }}
            disabled={
              !categoryInput.trim() ||
              selectedCategories.some((cat) => cat.title === categoryInput.trim())
            }
          >
            Add
          </button>
        </div>
        <div className="no-scrollbar flex max-w-full items-center gap-5 overflow-auto">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-[#CCCCCC1A] py-2 pl-4 pr-3"
              >
                {category.title}
                <button onClick={() => handleRemoveCategory(category.title)}>
                  <X className="size-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-battleShipGray">
              No categories selected
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Price Range
        </h1>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full justify-between mb-1">
          </div>
          <RangeSlider
            min={0}
            max={BAR_MAX}
            value={selectedPriceRange}
            onInput={handleSliderChange}
            id="custom-slider"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <InputField
            className="w-full max-w-36"
            type="number"
            value={selectedPriceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            placeholder="$0"
          />
          <span>-</span>
          <InputField
            className="w-full max-w-36"
            type="number"
            value={selectedPriceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder={`$${BAR_MAX.toLocaleString()}`}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Auction Alerts
        </h1>
        <span className="text-xs text-battleShipGray">
          Toggles to enable notifications for:
        </span>
        <div className="flex w-full flex-col gap-2 py-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-davyGray">
              Auction ending soon
            </span>
            <Switch checked={alertEnding} onCheckedChange={setAlertEnding} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-davyGray">
              New listings in preferred categories
            </span>
            <Switch checked={alertNew} onCheckedChange={setAlertNew} />
          </div>
        </div>
      </div>
      <RoundedButton
        title="Save Preferences"
        className="my-10 w-fit self-center"
        onClick={handleSavePreferences}
      />
    </div>
  );
};

export default PreferencesSection;
