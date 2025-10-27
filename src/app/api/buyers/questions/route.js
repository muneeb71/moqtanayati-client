import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/api/axios";

// GET - Get my questions
export async function GET(request) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    console.log("🔍 [Q&A API] Fetching user questions for user:", userId);

    // Use the standard api.get method with query parameters
    const response = await api.get(`/buyers/questions`, {
      params: {
        page,
        limit,
      },
    });

    const data = response.data;

    if (data.success) {
      return NextResponse.json({
        success: true,
        data: {
          questions: data.data.questions || [],
          pagination: {
            page,
            limit,
            total: data.data.total || 0,
            totalPages: Math.ceil((data.data.total || 0) / limit),
          },
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to fetch questions",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error fetching user questions:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
