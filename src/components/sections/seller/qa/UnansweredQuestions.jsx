"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { handleQAError, getSuccessMessage } from "@/utils/qaErrorHandler";

const UnansweredQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [answering, setAnswering] = useState({});

  const fetchUnansweredQuestions = async () => {
    setLoading(true);
    try {
      console.log("🔍 [UnansweredQuestions] Fetching unanswered questions");

      const response = await fetch("/api/sellers/questions/unanswered");
      const data = await response.json();

      if (data.success) {
        setQuestions(data.data.questions || []);
        console.log(
          "🔍 [UnansweredQuestions] Questions loaded:",
          data.data.questions?.length || 0,
        );
      } else {
        console.error(
          "🔍 [UnansweredQuestions] Failed to fetch questions:",
          data.message,
        );
        toast.error(handleQAError({ message: data.message }));
      }
    } catch (error) {
      console.error(
        "🔍 [UnansweredQuestions] Error fetching questions:",
        error,
      );
      toast.error(handleQAError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId) => {
    const answer = answers[questionId];
    if (!answer?.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    setAnswering((prev) => ({ ...prev, [questionId]: true }));

    try {
      console.log("🔍 [UnansweredQuestions] Answering question:", questionId);

      const response = await fetch(
        `/api/sellers/questions/${questionId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer: answer.trim() }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(getSuccessMessage("answerSubmitted"));
        // Remove from unanswered list
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
        setAnswers((prev) => ({ ...prev, [questionId]: "" }));
      } else {
        toast.error(handleQAError({ message: data.message }));
      }
    } catch (error) {
      console.error(
        "🔍 [UnansweredQuestions] Error answering question:",
        error,
      );
      toast.error(handleQAError(error));
    } finally {
      setAnswering((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchUnansweredQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="unanswered-questions">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Unanswered Questions
        </h2>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
          {questions.length} pending
        </span>
      </div>

      {questions.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              All Caught Up!
            </h3>
            <p className="text-gray-500">
              No unanswered questions at the moment.
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

              {/* Answer Form */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Your Answer
                </label>
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: e.target.value,
                    }))
                  }
                  placeholder="Type your answer here..."
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-moonstone focus:outline-none focus:ring-1 focus:ring-moonstone"
                  rows={3}
                  disabled={answering[question.id]}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleAnswer(question.id)}
                    disabled={
                      answering[question.id] || !answers[question.id]?.trim()
                    }
                    className="rounded-lg bg-moonstone px-6 py-2 text-white hover:bg-moonstone/90 disabled:opacity-50"
                  >
                    {answering[question.id] ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting...
                      </div>
                    ) : (
                      "Submit Answer"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnansweredQuestions;
