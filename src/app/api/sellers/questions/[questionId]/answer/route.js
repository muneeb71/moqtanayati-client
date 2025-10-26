import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/api/axios";

// POST - Answer a question
export async function POST(request, { params }) {
  try {
    const { questionId } = params;
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { answer } = body;

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { success: false, message: "Answer is required" },
        { status: 400 },
      );
    }

    console.log("🔍 [Q&A API] Answering question:", questionId);

    const response = await api.post(`/sellers/questions/${questionId}/answer`, {
      answer: answer.trim(),
      sellerId: userId, // Updated to match backend expectation
    });

    const data = response.data;

    if (data.success) {
      return NextResponse.json({
        success: true,
        data: data.data,
        message: data.message || "Answer submitted successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to submit answer",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error answering question:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
