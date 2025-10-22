"use server";

import api from "../axios";

export async function updateProductUnitAndDimensions(id, data) {
  try {
    const formData = new FormData();

    formData.append("stock", data.stock);
    formData.append("length", data.length);
    formData.append("width", data.width);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("conditionRating", data.conditionRating);
    formData.append("condition", data.productCondition);
    formData.append("status", data.status);
    formData.append("categories", JSON.stringify(data.productCategories));

    const response = await api.patch(`products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    return {
      success: true,
      data: response.data.data || response.data,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update product data.",
    };
  }
}

export async function updateProductPriceAndShipping(id, data) {
  try {
    const formData = new FormData();

    formData.append("pricingFormat", data.pricingFormat);
    formData.append("price", data.price);
    formData.append("shippingMethod", data.shippingMethod);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("handlingTime", data.handlingTime);
    formData.append("domesticReturns", data.domesticReturns);
    formData.append("internationalReturns", data.internationalReturns);
    formData.append("domesticShippingType", data.domesticShippingType);
    formData.append("localPickup", data.localPickup);
    formData.append("isAuction", data.isAuction);
    formData.append("status", data.status);

    // Auction specific fields
    if (data.isAuction) {
      formData.append("auctionDuration", data.auctionDuration);
      formData.append("auctionLaunchDate", data.auctionLaunchDate);
      formData.append("startingBid", data.startingBid);
      formData.append("buyItNow", data.buyItNow);
      formData.append("minimumOffer", data.minimumOffer);
      formData.append("autoAccept", data.autoAccept);
    }

    console.log("product adding : ", formData);

    const response = await api.patch(`products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    return {
      success: true,
      data: response.data.data || response.data,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update product data.",
    };
  }
}

export async function updateProductBasics(id, data) {
  try {
    const formData = new FormData();

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Preserve existing images when editing (server URLs)
    if (Array.isArray(data.existingImageUrls)) {
      formData.append(
        "existingImageUrls",
        JSON.stringify(data.existingImageUrls),
      );
      // Also append as repeated fields for backends expecting array params
      data.existingImageUrls.forEach((url) => {
        formData.append("existingImageUrls[]", url);
        formData.append("existingImages[]", url);
      });
      formData.append("mergeImages", "true");
    }

    if (data.video) {
      formData.append("video", data.video);
    }

    if (typeof data.name !== "undefined") {
      formData.append("name", data.name);
    }

    if (typeof data.description !== "undefined") {
      formData.append("description", data.description);
    }

    if (typeof data.status !== "undefined") {
      formData.append("status", data.status);
    }

    const response = await api.patch(`products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    return {
      success: true,
      data: response.data.data || response.data,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update product data.",
    };
  }
}
