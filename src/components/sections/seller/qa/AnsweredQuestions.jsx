"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { handleQAError } from "@/utils/qaErrorHandler";

const AnsweredQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnsweredQuestions = async (pageNum = 1, reset = false) => {
    setLoading(true);
    try {
      console.log(
        "🔍 [AnsweredQuestions] Fetching answered questions, page:",
        pageNum,
      );

      const response = await fetch(
        `/api/sellers/questions/answered?page=${pageNum}&limit=10`,
      );
      const data = await response.json();

      if (data.success) {
        const newQuestions = data.data.questions || [];
        if (reset) {
          setQuestions(newQuestions);
        } else {
          setQuestions((prev) => [...prev, ...newQuestions]);
        }
        setHasMore(newQuestions.length === 10);
        console.log(
          "🔍 [AnsweredQuestions] Questions loaded:",
          newQuestions.length,
        );
      } else {
        console.error(
          "🔍 [AnsweredQuestions] Failed to fetch questions:",
          data.message,
        );
        toast.error(handleQAError({ message: data.message }));
      }
    } catch (error) {
      console.error("🔍 [AnsweredQuestions] Error fetching questions:", error);
      toast.error(handleQAError(error));
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnsweredQuestions(nextPage, false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchAnsweredQuestions(1, true);
  }, []);

  if (loading && questions.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="answered-questions">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Answered Questions
        </h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          {questions.length} answered
        </span>
      </div>

      {questions.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              No Answered Questions Yet
            </h3>
            <p className="text-gray-500">
              Your answered questions will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Product Info */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg">
                  <Image
                    src={question.product?.images?.[0] || "/dummy-items/1.jpeg"}
                    width={48}
                    height={48}
                    alt={question.product?.name || "Product"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {question.product?.name || "Product"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Product ID: {question.productId}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={question.buyer?.avatar || "/dummy-user/1.jpeg"}
                      width={32}
                      height={32}
                      alt={question.buyer?.name || "Buyer"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">
                    {question.buyer?.name || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {formatDate(question.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700">{question.question}</p>
              </div>

              {/* Answer */}
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={question.seller?.avatar || "/dummy-user/1.jpeg"}
                      width={32}
                      height={32}
                      alt={question.seller?.name || "Seller"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">
                    {question.seller?.name || "You"}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {formatDate(question.answeredAt)}
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Answered
                  </span>
                </div>
                <p className="text-gray-700">{question.answer}</p>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center py-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-lg bg-moonstone px-6 py-2 text-white hover:bg-moonstone/90 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnsweredQuestions;
