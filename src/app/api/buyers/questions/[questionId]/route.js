import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/api/axios";

// DELETE - Delete my unanswered question
export async function DELETE(request, { params }) {
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

    console.log("🔍 [Q&A API] Deleting question:", questionId);

    // Use the standard api.delete method
    const response = await api.delete(`/buyers/questions/${questionId}`);

    const data = response.data;

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Question deleted successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to delete question",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error deleting question:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
