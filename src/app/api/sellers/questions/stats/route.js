import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sellers/questions/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

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
