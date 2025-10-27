import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/api/axios";

// GET - Get Q&A statistics
export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    console.log("🔍 [Q&A API] Fetching Q&A stats for seller:", userId);

    // Use the standard api.get method
    const response = await api.get(`/sellers/questions/stats`);

    const data = response.data;

    if (data.success) {
      return NextResponse.json({
        success: true,
        data: data.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to fetch Q&A stats",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error fetching Q&A stats:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
