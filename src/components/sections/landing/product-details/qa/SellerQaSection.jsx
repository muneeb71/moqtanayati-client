"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import api from "@/lib/api/axios";
import useTranslation from "@/hooks/useTranslation";

const SellerQaSection = ({ productId }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [answering, setAnswering] = useState({});

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      console.log(
        "🔍 [SellerQaSection] SELLER Q&A - Fetching questions for product:",
        productId,
      );

      const response = await api.get(
        `/buyers/products/${productId}/questions?page=1&limit=50`,
      );
      const data = response.data;

      if (data.success) {
        setQuestions(data.data.questions || []);
        console.log(
          "🔍 [SellerQaSection] Questions loaded:",
          data.data.questions?.length || 0,
        );
      } else {
        console.error(
          "🔍 [SellerQaSection] Failed to fetch questions:",
          data.message,
        );
        toast.error(t("seller.qa.errors.failed_fetch"));
      }
    } catch (error) {
      console.error("🔍 [SellerQaSection] Error fetching questions:", error);
      toast.error(t("seller.qa.errors.failed_fetch"));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId) => {
    const answer = answers[questionId];
    if (!answer?.trim()) {
      toast.error(t("seller.qa.errors.enter_answer"));
      return;
    }

    const userId = getCookie("userId");
    if (!userId) {
      toast.error(t("seller.qa.errors.login_to_answer"));
      return;
    }

    setAnswering((prev) => ({ ...prev, [questionId]: true }));

    try {
      console.log(
        "🔍 [SellerQaSection] SELLER Q&A - Answering question:",
        questionId,
      );
      console.log("🔍 [SellerQaSection] Seller ID:", userId);

      const response = await api.post(
        `/sellers/questions/${questionId}/answer`,
        {
          answer: answer.trim(),
          sellerId: userId,
        },
      );

      const data = response.data;

      if (data.success) {
        toast.success(t("seller.qa.success.answer_submitted"));
        // Refresh questions to show the answer
        fetchQuestions();
        setAnswers((prev) => ({ ...prev, [questionId]: "" }));
      } else {
        toast.error(data.message || t("seller.qa.errors.failed_submit"));
      }
    } catch (error) {
      console.error("🔍 [SellerQaSection] Error answering question:", error);
      toast.error(t("seller.qa.errors.failed_submit"));
    } finally {
      setAnswering((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return t("seller.qa.just_now");
    if (diffInHours < 24)
      return t("seller.qa.h_ago").replace("{count}", String(diffInHours));
    if (diffInHours < 168)
      return t("seller.qa.d_ago").replace(
        "{count}",
        String(Math.floor(diffInHours / 24)),
      );
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchQuestions();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between px-5 py-5">
        <p className="flex items-center gap-1 text-[14.4px]">
          <span className="font-medium">{questions.length}</span>
          <span className="text-davyGray">{t("seller.qa.questions")}</span>
        </p>
      </div>

      <div className="flex h-full w-full flex-col justify-between">
        <div className="no-scrollbar flex h-full max-h-[calc(100vh-200px)] w-full flex-col overflow-y-auto">
          {questions.length > 0 ? (
            <>
              {questions.map((question, index) => (
                <div
                  key={question.id || index}
                  className="flex items-start gap-2 border-t border-[#F0F1F4] px-5 py-3"
                >
                  <div className="grid size-[57px] min-w-[57px] place-items-center overflow-hidden rounded-full">
                    {question.buyer?.avatar || question.user?.avatar ? (
                      <Image
                        src={question.buyer?.avatar || question.user?.avatar}
                        width={100}
                        height={100}
                        alt="user"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col py-2">
                      <div className="flex items-center justify-between">
                        <h1 className="text-[14.4px] text-davyGray">
                          {question.buyer?.name ||
                            question.user?.name ||
                            "Anonymous"}
                        </h1>
                        <h1 className="text-xs text-davyGray">
                          {formatDate(question.createdAt)}
                        </h1>
                      </div>
                      <span className="text-[14.4px] text-eerieBlack">
                        {question.question}
                      </span>
                    </div>

                    {/* Answer Form - Only show if no answer yet */}
                    {!question.answer && (
                      <div className="mt-3 space-y-2">
                        <textarea
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: e.target.value,
                            }))
                          }
                          placeholder={t("seller.qa.type_answer_placeholder")}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-moonstone focus:outline-none focus:ring-1 focus:ring-moonstone"
                          rows={2}
                          disabled={answering[question.id]}
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleAnswer(question.id)}
                            disabled={
                              answering[question.id] ||
                              !answers[question.id]?.trim()
                            }
                            className="rounded-lg bg-moonstone px-4 py-2 text-sm text-white hover:bg-moonstone/90 disabled:opacity-50"
                          >
                            {answering[question.id] ? (
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                {t("seller.qa.submitting")}
                              </div>
                            ) : (
                              t("seller.qa.submit_answer")
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show existing answer if available */}
                    {question.answer && (
                      <div className="flex w-full gap-2 rounded-r-lg border-l-2 border-dashed border-green-200 bg-green-50 py-2 pl-3">
                        <div className="grid size-[57px] min-w-[57px] place-items-center overflow-hidden rounded-full">
                          {question.seller?.avatar ||
                          question.answeredBy?.avatar ? (
                            <Image
                              src={
                                question.seller?.avatar ||
                                question.answeredBy?.avatar
                              }
                              width={100}
                              height={100}
                              alt="seller"
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                              >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex w-full flex-col py-2">
                            <div className="flex items-center justify-between">
                              <h1 className="text-[14.4px] text-davyGray">
                                {question.seller?.name ||
                                  question.answeredBy?.name ||
                                  t("seller.qa.you")}{" "}
                                <span className="text-green-600">
                                  ({t("seller.qa.answered_label")})
                                </span>
                              </h1>
                              <h1 className="text-xs text-davyGray">
                                {formatDate(question.answeredAt)}
                              </h1>
                            </div>
                            <span className="text-[14.4px] text-eerieBlack">
                              {question.answer}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">💬</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  {t("seller.qa.no_questions_title")}
                </h3>
                <p className="text-gray-500">
                  {t("seller.qa.no_questions_sub")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerQaSection;
