"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { handleQAError } from "@/utils/qaErrorHandler";

const QAStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      console.log("🔍 [QAStats] Fetching Q&A statistics");

      const response = await fetch("/api/sellers/questions/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
        console.log("🔍 [QAStats] Stats loaded:", data.data);
      } else {
        console.error("🔍 [QAStats] Failed to fetch stats:", data.message);
        toast.error(handleQAError({ message: data.message }));
      }
    } catch (error) {
      console.error("🔍 [QAStats] Error fetching stats:", error);
      toast.error(handleQAError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">📊</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            No Statistics Available
          </h3>
          <p className="text-gray-500">
            Statistics will appear once you start receiving questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-stats">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Q&A Statistics
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Questions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Questions
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalQuestions || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Answered Questions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Answered</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.answeredQuestions || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Unanswered Questions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unanswered</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.unansweredQuestions || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Rate */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-full bg-moonstone/10 p-3">
              <svg
                className="h-6 w-6 text-moonstone"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Answer Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.answerRate ? stats.answerRate.toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.totalQuestions > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Answer Rate Progress
            </span>
            <span className="text-sm text-gray-500">
              {stats.answeredQuestions} of {stats.totalQuestions} questions
              answered
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-moonstone transition-all duration-300"
              style={{ width: `${stats.answerRate || 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QAStats;
