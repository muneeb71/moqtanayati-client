"use client";

import { auctionHammerIcon, priceTagIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import CustomSelect from "@/components/form-fields/CustomSelect";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/providers/product-store-provider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Country, City } from "country-state-city";
import Switch from "react-switch";
import { useProfileStore } from "@/providers/profile-store-provider";
import { updateProductPriceAndShipping } from "@/lib/api/product/update";

const PriceAndShippingForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const {
    pricingFormat,
    price,
    shippingMethod,
    domesticShippingType,
    handlingTime,
    auctionDuration,
    auctionLaunchDate,
    startingBid,
    buyItNow,
    minimumOffer,
    autoAccept,
    selectedCountry,
    selectedCity,
    domesticReturns,
    internationalReturns,
    localPickup,
    setPricingFormat,
    setPrice,
    setShippingMethod,
    setDomesticShippingType,
    setHandlingTime,
    setAuctionDuration,
    setAuctionLaunchDate,
    setStartingBid,
    setBuyItNow,
    setMinimumOffer,
    setAutoAccept,
    setSelectedCountry,
    setSelectedCity,
    setDomesticReturns,
    setInternationalReturns,
    setLocalPickup,
  } = useProductStore((state) => state);

  const { store } = useProfileStore((state) => state);

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const errorTimeoutRef = useRef();

  const pricingFormats = ["Fixed Price", "Auctions"];
  const shippingMethods = [
    "Freight: Oversized items",
    "Local pickup only: Sell to Buyers near you",
  ];
  const shippingOptions = [
    "Standard Shipping: Small to Medium Products",
    "Express Shipping: 1-2 Business Days",
    "Freight: Oversized items",
  ];
  const domesticShippingOptions = [
    "Flat rate: Same cost regardless of buyer location",
    "Variable rate: Cost according to location",
  ];
  const handlingTimeOptions = [
    "1-2 business days",
    "3-5 business days",
    "5-7 business days",
  ];

  // Add this constant for the auction duration options
  const auctionDurationOptions = [
    { value: 3, label: "3 Days" },
    { value: 5, label: "5 Days" },
    { value: 7, label: "7 Days" },
    { value: 10, label: "10 Days" },
  ];

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
      setSelectedCity("");
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

  const validateFixedPrice = () => {
    const newErrors = {};
    if (!pricingFormat) newErrors.pricingFormat = "Pricing format is required.";
    if (!price || isNaN(parseFloat(price)))
      newErrors.price = "Valid price is required.";
    if (!shippingMethod)
      newErrors.shippingMethod = "Shipping method is required.";
    if (!handlingTime) newErrors.handlingTime = "Handling time is required.";
    if (!selectedCountry) newErrors.selectedCountry = "Country is required.";
    if (!selectedCity) newErrors.selectedCity = "City is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors({}), 3000);
    }
    return Object.keys(newErrors).length === 0;
  };

  const validateAuctions = () => {
    const newErrors = {};
    if (!pricingFormat) newErrors.pricingFormat = "Pricing format is required.";
    if (!auctionDuration)
      newErrors.auctionDuration = "Auction duration is required.";
    if (!auctionLaunchDate)
      newErrors.auctionLaunchDate = "Auction launch date is required.";
    if (!startingBid || isNaN(parseFloat(startingBid)))
      newErrors.startingBid = "Valid starting bid is required.";
    if (!buyItNow || isNaN(parseFloat(buyItNow)))
      newErrors.buyItNow = "Valid buy it now price is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors({}), 3000);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (pricingFormat == "") {
      setErrors({ pricingFormat: "Please select a pricing format" });
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors({}), 3000);
      return;
    }

    try {
      setIsLoading(true);
      const isValid =
        pricingFormat === "Fixed Price"
          ? validateFixedPrice()
          : validateAuctions();

      if (isValid) {
        const productData = {
          pricingFormat: pricingFormat,
          price: price ? parseFloat(price) : 0,
          shippingMethod: shippingMethod,
          country: selectedCountry,
          city: selectedCity,
          handlingTime: handlingTime || "",
          domesticReturns: domesticReturns,
          internationalReturns: internationalReturns,
          domesticShippingType: domesticShippingType,
          localPickup: localPickup,
          isAuction: pricingFormat === "Auctions",
          auctionDuration: auctionDuration,
          auctionLaunchDate: auctionLaunchDate
            ? new Date(auctionLaunchDate).toISOString()
            : null,
          startingBid: startingBid ? parseFloat(startingBid) : 0,
          buyItNow: buyItNow ? parseFloat(buyItNow) : 0,
          minimumOffer: minimumOffer ? parseFloat(minimumOffer) : 0,
          autoAccept: autoAccept ? parseFloat(autoAccept) : 0,
          storeId: store.id,
          status: "ACTIVE",
        };

        const response = await updateProductPriceAndShipping(id, productData);

        if (response.success) {
          router.push(`/seller/my-store`);
        } else {
          setErrors({
            submit:
              response.message || "Failed to save product. Please try again.",
          });
        }
      }
    } catch (error) {
      setErrors({
        submit: "An unexpected error occurred. Please try again." + error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 px-8 py-10">
      <div
        className={cn(
          "flex h-fit flex-wrap justify-center gap-16 transition-all duration-300 ease-out",
        )}
      >
        {/* Pricing Section */}
        <div className="flex h-fit max-w-sm flex-col gap-5">
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
                    format === pricingFormat
                      ? "border-[1.2px] border-moonstone bg-moonstone/5 font-medium text-moonstone"
                      : "bg-[#CCCCCC40]",
                  )}
                  onClick={() => setPricingFormat(format)}
                >
                  <span
                    className={
                      pricingFormat === format
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
          {pricingFormat && (
            <div className="grid w-full gap-4 md:grid-cols-2">
              {pricingFormat === "Fixed Price" ? (
                // Fixed Price Inputs
                <>
                  <div className="col-span-2 flex flex-col gap-1">
                    <Label text="Price" />
                    <InputField
                      type="number"
                      value={price}
                      placeholder="Price"
                      onChange={(e) => {
                        const val = e.target.value;
                        setPrice(val);
                      }}
                    />
                    {errors.price && (
                      <span className="text-sm text-red-500">
                        {errors.price}
                      </span>
                    )}
                  </div>
                </>
              ) : pricingFormat === "Auctions" ? (
                // Auction Inputs
                <>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Auction Duration"
                      className="text-base text-darkBlue"
                    />
                    <CustomSelect
                      options={auctionDurationOptions.map(
                        (option) => option.label,
                      )}
                      selectedOption={
                        auctionDurationOptions.find(
                          (opt) => opt.value === auctionDuration,
                        )?.label || ""
                      }
                      setSelectedOption={(label) => {
                        const option = auctionDurationOptions.find(
                          (opt) => opt.label === label,
                        );
                        if (option) {
                          setAuctionDuration(option.value);
                        }
                      }}
                      placeholder="7 Days"
                    />
                    {errors.auctionDuration && (
                      <span className="text-sm text-red-500">
                        {errors.auctionDuration}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label
                      text="Auction Launch date"
                      className="text-base text-darkBlue"
                    />
                    <InputField
                      type="datetime-local"
                      value={
                        auctionLaunchDate
                          ? new Date(auctionLaunchDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) => {
                        // Get the local datetime string and convert to UTC
                        const localDateTime = e.target.value;
                        if (localDateTime) {
                          // Create a date object in local timezone
                          const date = new Date(localDateTime + "Z");
                          setAuctionLaunchDate(date.toISOString());
                        } else {
                          setAuctionLaunchDate("");
                        }
                      }}
                      className="px-3 py-[14px]"
                    />
                    {errors.auctionLaunchDate && (
                      <span className="text-sm text-red-500">
                        {errors.auctionLaunchDate}
                      </span>
                    )}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setStartingBid(val);
                      }}
                    />
                    {errors.startingBid && (
                      <span className="text-sm text-red-500">
                        {errors.startingBid}
                      </span>
                    )}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setBuyItNow(val);
                      }}
                    />
                    {errors.buyItNow && (
                      <span className="text-sm text-red-500">
                        {errors.buyItNow}
                      </span>
                    )}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setMinimumOffer(val);
                      }}
                    />
                    {errors.minimumOffer && (
                      <span className="text-sm text-red-500">
                        {errors.minimumOffer}
                      </span>
                    )}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setAutoAccept(val);
                      }}
                    />
                    {errors.autoAccept && (
                      <span className="text-sm text-red-500">
                        {errors.autoAccept}
                      </span>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Shipping and Location Sections */}
        <div
          className={cn(
            "grid gap-16 transition-all duration-300 md:grid-cols-2",
            pricingFormat === "Fixed Price"
              ? "translate-x-0 opacity-100"
              : "hidden -translate-x-full overflow-hidden opacity-0",
          )}
        >
          {/* Shipping Section */}
          <div className="flex max-w-sm flex-col gap-5">
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
                  options={shippingMethods}
                  selectedOption={shippingMethod}
                  setSelectedOption={setShippingMethod}
                  placeholder="Select shipping type"
                />
                {errors.shippingMethod && (
                  <span className="text-sm text-red-500">
                    {errors.shippingMethod}
                  </span>
                )}
              </div>

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

              {/* Local Pickup */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium text-darkBlue">
                    Local pickup
                  </span>
                  <span className="text-sm text-battleShipGray">
                    Buyers near you can pick the product from the location of
                    your choice
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

                {errors.handlingTime && (
                  <span className="text-sm text-red-500">
                    {errors.handlingTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex max-w-sm flex-col gap-5">
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
                  />
                </div>
                {errors.selectedCountry && (
                  <span className="text-sm text-red-500">
                    {errors.selectedCountry}
                  </span>
                )}
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
                    isDisabled={!selectedCountry}
                  />
                </div>
                {errors.selectedCity && (
                  <span className="text-sm text-red-500">
                    {errors.selectedCity}
                  </span>
                )}
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

      {errors.submit && (
        <span className="text-center text-xs text-red-500">
          {errors.submit}
        </span>
      )}

      <RoundedButton
        className="mt-5 w-full max-w-60 self-center"
        title={isLoading ? "Loading..." : "Submit"}
        showIcon
        onClick={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
};

export default PriceAndShippingForm;
