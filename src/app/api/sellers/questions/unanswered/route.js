import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET - Get unanswered questions for my products
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

    console.log(
      "🔍 [Q&A API] Fetching unanswered questions for seller:",
      userId,
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellers/questions/unanswered?page=${page}&limit=${limit}`,
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
          message: data.message || "Failed to fetch unanswered questions",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error fetching unanswered questions:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
