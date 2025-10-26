"use client";

import api from "../axios";

export async function updateOrderStatus(orderId, deliveryStatusKey) {
  try {
    if (!orderId || !deliveryStatusKey) {
      return {
        success: false,
        message: "Order ID and delivery status are required",
      };
    }
    // Map UI keys to DB deliveryStatus values
    const map = {
      PENDING: "PENDING", // UI "Received" corresponds to PENDING in DB
      PROCESSING: "PROCESSING",
      SHIPPED: "SHIPPED",
      DELIVERED: "DELIVERED",
    };
    const deliveryStatus = map[deliveryStatusKey] || deliveryStatusKey;
    const payload = { deliveryStatus };
    console.log(
      "[updateOrderStatus] sending payload:",
      JSON.stringify(payload),
      "for order:",
      orderId,
    );
    if (deliveryStatus === "DELIVERED") {
      // When delivered, mark overall order status as COMPLETED
      payload.status = "COMPLETED";
    }
    console.log(
      "[updateOrderStatus] final payload after rules:",
      JSON.stringify(payload),
    );
    const response = await api.patch(`/orders/${orderId}/status`, payload);
    const ok = response?.data?.success !== false;
    return {
      success: ok,
      data: response?.data?.data || response?.data,
      message: response?.data?.message || (ok ? "Status updated" : "Failed"),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update status",
    };
  }
}
