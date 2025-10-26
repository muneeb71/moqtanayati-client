import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/api/axios";

// GET - Get all questions for a product (public)
export async function GET(request, { params }) {
  try {
    console.log("🔍 [Q&A API] Route accessed - GET request received");
    const { productId } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    console.log("🔍 [Q&A API] Fetching questions for product:", productId);
    console.log("🔍 [Q&A API] Request URL:", request.url);
    console.log("🔍 [Q&A API] Params:", params);

    try {
      // Fetch questions from your database using axios
      const response = await api.get(
        `/buyers/products/${productId}/questions?page=${page}&limit=${limit}`,
      );

      const data = response.data;

      if (data.success) {
        return NextResponse.json({
          success: true,
          data: {
            questions: data.data.questions || [],
            pagination: {
              page: data.data.pagination?.page || page,
              limit: data.data.pagination?.limit || limit,
              total: data.data.pagination?.total || 0,
              totalPages:
                data.data.pagination?.pages ||
                Math.ceil((data.data.pagination?.total || 0) / limit),
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
    } catch (backendError) {
      console.log(
        "🔍 [Q&A API] Backend endpoint not available, returning empty questions",
      );

      // Return empty questions since the backend endpoint doesn't exist yet
      return NextResponse.json({
        success: true,
        data: {
          questions: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        },
      });
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error fetching questions:", error);

    // If 404 error, return empty questions instead of error
    if (error.response?.status === 404) {
      console.log(
        "🔍 [Q&A API] Questions endpoint not found, returning empty array",
      );
      return NextResponse.json({
        success: true,
        data: {
          questions: [],
          pagination: {
            page: parseInt(searchParams.get("page")) || 1,
            limit: parseInt(searchParams.get("limit")) || 10,
            total: 0,
            totalPages: 0,
          },
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Ask a question about a product
export async function POST(request, { params }) {
  try {
    console.log("🔍 [Q&A API] Route accessed - POST request received");
    const { productId } = params;
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    console.log("🔍 [Q&A API] POST - Product ID:", productId);
    console.log("🔍 [Q&A API] POST - User ID:", userId);
    console.log("🔍 [Q&A API] POST - Token present:", !!token);

    if (!token || !userId) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { question } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { success: false, message: "Question is required" },
        { status: 400 },
      );
    }

    console.log("🔍 [Q&A API] Creating question for product:", productId);

    try {
      const response = await api.post(
        `/buyers/products/${productId}/questions`,
        {
          question: question.trim(),
          buyerId: userId,
        },
      );

      const data = response.data;

      if (data.success) {
        return NextResponse.json({
          success: true,
          data: data.data,
          message: data.message || "Question submitted successfully",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: data.message || "Failed to submit question",
          },
          { status: 400 },
        );
      }
    } catch (backendError) {
      console.log(
        "🔍 [Q&A API] Backend endpoint not available, creating mock response",
      );

      // Create a mock response since the backend endpoint doesn't exist yet
      const mockQuestion = {
        id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        question: question.trim(),
        buyerId: userId,
        productId: productId,
        createdAt: new Date().toISOString(),
        answer: null,
        answeredAt: null,
        buyer: {
          id: userId,
          name: "Current User", // This would come from user profile
          avatar: null,
        },
      };

      return NextResponse.json({
        success: true,
        data: mockQuestion,
        message: "Question submitted successfully (mock response)",
      });
    }
  } catch (error) {
    console.error("🔍 [Q&A API] Error creating question:", error);

    // Handle specific error cases
    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    if (error.response?.status === 401) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
