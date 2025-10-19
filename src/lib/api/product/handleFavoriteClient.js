"use client";

import api from "../axios";

export const handleFavoriteClient = async (productId, pricingFormat = null) => {
  try {
    // Get token from cookies for debugging
    let token = null;
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) token = parts.pop().split(";").shift();
    }

    console.log("🔍 [handleFavoriteClient] Token present:", Boolean(token));
    console.log("🔍 [handleFavoriteClient] Product ID:", productId);
    console.log("🔍 [handleFavoriteClient] Pricing Format:", pricingFormat);

    // Only handle auction products for watchlist
    if (pricingFormat === "Auctions") {
      try {
        console.log(
          "🔍 [handleFavoriteClient] Trying watchlist API for auction product",
        );
        const response = await api.post(`/buyers/watchlist/${productId}`, {});
        console.log(
          "🔍 [handleFavoriteClient] Watchlist API success:",
          response.data,
        );
        return {
          success: true,
          data: response.data,
        };
      } catch (watchlistError) {
        console.log(
          "🔍 [handleFavoriteClient] Watchlist API failed:",
          watchlistError.response?.data || watchlistError.message,
        );

        // Check if the error is "Item already in watchlist" - this is actually success
        if (
          watchlistError.response?.data?.message === "Item already in watchlist"
        ) {
          console.log(
            "🔍 [handleFavoriteClient] Item already in watchlist - this is success",
          );
          return {
            success: true,
            data: { message: "Item already in watchlist" },
          };
        }

        // For auction products, if watchlist fails, return error
        return {
          success: false,
          error:
            watchlistError.response?.data?.message ||
            "Failed to add to watchlist",
          status: watchlistError.response?.status,
        };
      }
    } else {
      // For regular products, return a message that favorites are not available
      console.log(
        "🔍 [handleFavoriteClient] Regular product - favorites not available",
      );
      return {
        success: false,
        error: "Favorites are only available for auction products",
        warning: "This product cannot be added to favorites",
      };
    }
  } catch (error) {
    console.log(
      "🔍 [handleFavoriteClient] Error handling favorite:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update favorite",
      status: error.response?.status,
    };
  }
};
