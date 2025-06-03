"use client";

import { auctionHammerIcon, priceTagIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import CustomSelect from "@/components/form-fields/CustomSelect";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Country, City } from "country-state-city";
import Switch from "react-switch";

const PriceAndShippingForm = ({
  pricingFormats,
  selectedPricingFormat,
  setSelectedPricingFormat,
  price,
  setPrice,
  quantity,
  setQuantity,
  shippingMethods,
  selectedShippingMethod,
  setSelectedShippingMethod,
}) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [domesticReturns, setDomesticReturns] = useState(false);
  const [internationalReturns, setInternationalReturns] = useState(false);
  const [domesticShipping, setDomesticShipping] = useState(false);
  const [localPickup, setLocalPickup] = useState(false);
  const [shippingType, setShippingType] = useState("");
  const [domesticShippingType, setDomesticShippingType] = useState("");
  const [handlingTime, setHandlingTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [auctionDuration, setAuctionDuration] = useState("7 Days");
  const [auctionLaunchDate, setAuctionLaunchDate] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [buyItNow, setBuyItNow] = useState("");
  const [minimumOffer, setMinimumOffer] = useState("");
  const [autoAccept, setAutoAccept] = useState("");

  // Initialize country options on component mount
  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      const cities =
        City.getCitiesOfCountry(selectedCountry)?.map((city) => ({
          value: city.name,
          label: city.name,
        })) || [];
      setCityOptions(cities);
      setSelectedCity(""); // Reset selected city when country changes
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  const handleCountrySelect = (label) => {
    const country = countryOptions.find((c) => c.label === label);
    if (country) {
      setSelectedCountry(country.value);
    }
  };

  const handleCitySelect = (label) => {
    const city = cityOptions.find((c) => c.label === label);
    if (city) {
      setSelectedCity(city.value);
    }
  };

  console.log(countryOptions);

  const shippingOptions = [
    "Standard Shipping: Small to Medium Products",
    "Express Shipping: 1-2 Business Days",
    "Freight: Oversized items",
  ];

  const domesticShippingOptions = [
    "Flat rate: Same cost regardless of buyer location",
  ];

  const handlingTimeOptions = [
    "Flat rate: Same cost regardless of buyer location",
  ];

  // Example categories - replace with your actual categories
  const allCategories = [
    "electronics",
    "lamp",
    "furniture",
    "clothing",
    "books",
    "sports",
  ];

  const handleAddCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setSearchCategory("");
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchCategory.trim()) {
      if (!selectedCategories.includes(searchCategory.trim())) {
        setSelectedCategories([...selectedCategories, searchCategory.trim()]);
        setSearchCategory("");
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 px-8 py-10">
      <div
        className={cn(
          "flex w-full transition-all duration-300 ease-out",
          selectedPricingFormat === "Fixed Price"
            ? "justify-evenly gap-10"
            : selectedPricingFormat === "Auctions"
              ? "justify-around"
              : "justify-center",
        )}
      >
        {/* Pricing Section */}
        <div className="flex w-[550px] flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-lg font-medium text-delftBlue">Pricing</span>
            <span className="text-sm font-light text-battleShipGray">
              Select Buy it now or Auction
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-medium text-darkBlue">Pricing Format</span>
            <div className="grid w-full grid-cols-2 gap-4">
              {pricingFormats.map((format, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-4",
                    format === selectedPricingFormat
                      ? "border-[1.2px] border-moonstone bg-moonstone/5 font-medium text-moonstone"
                      : "bg-[#CCCCCC40]",
                  )}
                  onClick={() => setSelectedPricingFormat(format)}
                >
                  <span
                    className={
                      selectedPricingFormat === format
                        ? "text-moonstone"
                        : "text-battleShipGray"
                    }
                  >
                    {format == "Auctions" ? auctionHammerIcon : priceTagIcon}
                  </span>
                  <span>{format}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price/Quantity/Shipping Section - Only shows when a pricing format is selected */}
          {selectedPricingFormat && (
            <div className="grid w-full grid-cols-2 gap-4">
              {selectedPricingFormat === "Fixed Price" ? (
                // Fixed Price Inputs
                <>
                  <div className="flex flex-col gap-1">
                    {/* <Label text="Price" /> */}
                    <InputField
                      type="number"
                      value={price}
                      placeholder="Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* <Label text="Quantity" /> */}
                    <InputField
                      type="number"
                      value={quantity}
                      placeholder="Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  {/* Moved Shipping here - spans full width */}
                  <div className="col-span-2 flex flex-col gap-1">
                    <Label
                      text="Shipping"
                      className="text-base text-darkBlue"
                    />
                    <CustomSelect
                      options={shippingMethods}
                      selectedOption={selectedShippingMethod}
                      setSelectedOption={setSelectedShippingMethod}
                      placeholder="Freight: Oversized items"
                      className="text-base text-darkBlue"
                    />
                  </div>
                </>
              ) : selectedPricingFormat === "Auctions" ? (
                // Auction Inputs
                <>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Auction Duration"
                      className="text-base text-darkBlue"
                    />
                    <CustomSelect
                      options={["3 Days", "5 Days", "7 Days", "10 Days"]}
                      selectedOption={auctionDuration}
                      setSelectedOption={setAuctionDuration}
                      placeholder="7 Days"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Auction Launch date"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="datetime-local"
                      value={auctionLaunchDate}
                      onChange={(e) => setAuctionLaunchDate(e.target.value)}
                      className="px-3 py-[14px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Starting Bid"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="number"
                      value={startingBid}
                      placeholder="$0.00"
                      onChange={(e) => setStartingBid(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Buy it now (optional)"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="number"
                      value={buyItNow}
                      placeholder="$0.00"
                      onChange={(e) => setBuyItNow(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Minimum offer (optional)"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="number"
                      value={minimumOffer}
                      placeholder="$0.00"
                      onChange={(e) => setMinimumOffer(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Auto-accept (optional)"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="number"
                      value={autoAccept}
                      placeholder="$0.00"
                      onChange={(e) => setAutoAccept(e.target.value)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Categories Section - Only visible for Auctions */}
        <div
          className={cn(
            "w-[404px] transition-all duration-300",
            selectedPricingFormat === "Auctions"
              ? "translate-x-0 opacity-100"
              : "w-0 -translate-x-full overflow-hidden opacity-0",
          )}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-[#3D3D5D]">
                All Categories
              </span>
              <span className="text-sm font-light text-battleShipGray">
                Add the shipping details
              </span>
            </div>

            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Add category of your product"
                className="w-full rounded-[9.6px] border border-[#F8F7FB] bg-[#F8F7FB] px-4 py-3 pr-10 text-[16.8px] focus:border-moonstone focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Selected categories */}
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-2 rounded-full bg-moonstone/10 px-3 py-1.5 text-sm text-moonstone"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="text-moonstone hover:text-moonstone/80"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Suggested categories */}
            {searchCategory && (
              <div className="mt-2 rounded-lg border border-gray-100 bg-white shadow-sm">
                {allCategories
                  .filter(
                    (category) =>
                      category
                        .toLowerCase()
                        .includes(searchCategory.toLowerCase()) &&
                      !selectedCategories.includes(category),
                  )
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => handleAddCategory(category)}
                      className="w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                    >
                      {category}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Shipping and Location Sections */}
        <div
          className={cn(
            "grid grid-cols-2 gap-16 transition-all duration-300",
            selectedPricingFormat === "Fixed Price"
              ? "w-full translate-x-0 opacity-100"
              : "w-0 -translate-x-full overflow-hidden opacity-0",
          )}
        >
          {/* Shipping Section */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-delftBlue">
                Shipping
              </span>
              <span className="text-sm font-light text-battleShipGray">
                Add the shipping details
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Shipping Method at the top */}
              <div className="flex flex-col gap-1">
                <Label
                  text="Shipping Method"
                  className="text-base text-darkBlue"
                />
                <CustomSelect
                  options={shippingOptions}
                  selectedOption={shippingType}
                  setSelectedOption={setShippingType}
                  placeholder="Select shipping type"
                />
              </div>

              {/* Weight and Dimensions */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label
                    text="Weight(kg)"
                    className="text-base text-darkBlue"
                  />
                  <InputField type="number" placeholder="0.00 kg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Length(in)"
                      className="text-base text-darkBlue"
                    />
                    <InputField type="number" placeholder="0.00 in" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Width(in)"
                      className="text-base text-darkBlue"
                    />
                    <InputField type="number" placeholder="0.00 in" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    text="Height(in)"
                    className="text-base text-darkBlue"
                  />
                  <InputField type="number" placeholder="0.00 in" />
                </div>
              </div>

              {/* Expandable Shipping Details - Only show for Standard Shipping */}
              {shippingType ===
                "Standard Shipping: Small to Medium Products" && (
                <div className="flex flex-col gap-4">
                  {/* Domestic Shipping */}
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Domestic Shipping"
                      className="text-base text-darkBlue"
                    />
                    <CustomSelect
                      options={domesticShippingOptions}
                      selectedOption={domesticShippingType}
                      setSelectedOption={setDomesticShippingType}
                      placeholder="Select domestic shipping type"
                    />
                  </div>

                  {/* Add Primary Service Button */}
                  <button className="flex w-56 items-center gap-2 rounded-full bg-moonstone px-4 py-3 text-sm text-white">
                    <span className="text-lg">+</span> Add Primary Service
                  </button>

                  {/* Local Pickup */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-medium text-darkBlue">
                        Local pickup
                      </span>
                      <span className="text-sm text-delftBlue">
                        Add local pickup
                      </span>
                      <span className="text-sm text-iconGray">
                        Buyers near you can pick the product from the location
                        of your choice
                      </span>
                    </div>
                    <Switch
                      checked={localPickup}
                      onChange={setLocalPickup}
                      onColor="#00A9B5"
                      offColor="#D1D1D1"
                      height={24}
                      width={44}
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>

                  {/* Handling Time */}
                  <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
                    <Label
                      text="Handling time"
                      className="text-base font-medium text-darkBlue"
                    />
                    <CustomSelect
                      options={handlingTimeOptions}
                      selectedOption={handlingTime}
                      setSelectedOption={setHandlingTime}
                      placeholder="Select handling time"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-delftBlue">
                Location
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Country Select */}
              <div className="flex flex-col gap-1">
                <Label text="Country" className="text-base text-darkBlue" />
                <div className="z-[20]">
                  <CustomSelect
                    options={countryOptions.map((country) => country.label)}
                    selectedOption={
                      selectedCountry
                        ? countryOptions.find(
                            (c) => c.value === selectedCountry,
                          )?.label
                        : ""
                    }
                    setSelectedOption={handleCountrySelect}
                    placeholder="Select country"
                    className="border-gray-200 bg-white"
                  />
                </div>
              </div>

              {/* City Select */}
              <div className="flex flex-col gap-1">
                <Label text="City" className="text-base text-darkBlue" />
                <div className="z-[10]">
                  <CustomSelect
                    options={cityOptions.map((city) => city.label)}
                    selectedOption={
                      selectedCity
                        ? cityOptions.find((c) => c.value === selectedCity)
                            ?.label
                        : ""
                    }
                    setSelectedOption={handleCitySelect}
                    placeholder="Select city"
                    className="border-gray-200 bg-white"
                    isDisabled={!selectedCountry}
                  />
                </div>
              </div>

              {/* Returns Sections */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <Label
                    text="Domestic Returns"
                    className="text-base text-darkBlue"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-battleShipGray">
                      Accept returns for items purchased domestically
                    </span>
                    <Switch
                      checked={domesticReturns}
                      onChange={setDomesticReturns}
                      onColor="#00A9B5"
                      offColor="#D1D1D1"
                      height={24}
                      width={44}
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    text="International Returns"
                    className="text-base text-darkBlue"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-battleShipGray">
                      Accept returns for items purchased internationally
                    </span>
                    <Switch
                      checked={internationalReturns}
                      onChange={setInternationalReturns}
                      onColor="#00A9B5"
                      offColor="#D1D1D1"
                      height={24}
                      width={44}
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoundedButton
        className="my-10 w-full max-w-60 self-center"
        title="Next"
        showIcon
        onClick={() => router.push("/seller/my-store")}
      />
    </div>
  );
};

export default PriceAndShippingForm;
