"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { handleQAError } from "@/utils/qaErrorHandler";
import api from "@/lib/api/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTranslation from "@/hooks/useTranslation";

const ProductQuestionsList = ({ productId }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const sortOptions = ["newest", "oldest"];

  const fetchQuestions = async (pageNum = 1, reset = false) => {
    if (!productId) return;

    setLoading(true);
    try {
      console.log(
        "🔍 [ProductQuestionsList] Fetching questions for product:",
        productId,
      );

      const response = await api.get(
        `/buyers/products/${productId}/questions?page=${pageNum}&limit=10`,
      );
      const data = response.data;

      if (data.success) {
        const newQuestions = data.data.questions || [];
        if (reset) {
          setQuestions(newQuestions);
        } else {
          setQuestions((prev) => [...prev, ...newQuestions]);
        }
        setHasMore(newQuestions.length === 10);
        console.log(
          "🔍 [ProductQuestionsList] Questions loaded:",
          newQuestions.length,
        );
      } else {
        console.error(
          "🔍 [ProductQuestionsList] Failed to fetch questions:",
          data.message,
        );
        // Don't show error toast for empty questions, just set empty array
        if (
          data.message?.includes("not found") ||
          data.message?.includes("404")
        ) {
          setQuestions([]);
        } else {
          toast.error(handleQAError({ message: data.message }));
        }
      }
    } catch (error) {
      console.error(
        "🔍 [ProductQuestionsList] Error fetching questions:",
        error,
      );
      // For 404 errors or network errors, show empty state instead of error
      if (
        error.response?.status === 404 ||
        error.message?.includes("Failed to fetch") ||
        error.message?.includes("500")
      ) {
        setQuestions([]);
      } else {
        toast.error(handleQAError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOption === "newest" ? dateB - dateA : dateA - dateB;
  });

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchQuestions(nextPage, false);
    }
  };

  useEffect(() => {
    fetchQuestions(1, true);
  }, [productId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return t("qa.just_now");
    if (diffInHours < 24)
      return t("seller.qa.h_ago").replace("{count}", String(diffInHours));
    if (diffInHours < 168)
      return t("seller.qa.d_ago").replace(
        "{count}",
        String(Math.floor(diffInHours / 24)),
      );
    return date.toLocaleDateString();
  };

  return (
    <div className="max-h-auto flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between px-5 py-5">
        <p className="flex items-center gap-1 text-[14.4px]">
          <span className="font-medium">{questions.length}</span>
          <span className="text-davyGray">{t("seller.qa.questions")}</span>
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-medium">
            {t(`seller.qa.sort.${sortOption}`)}{" "}
            <ChevronDown className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortOptions.map((option, index) => (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer text-xs"
                onClick={() => setSortOption(option)}
              >
                {t(`seller.qa.sort.${option}`)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex h-[calc(100%-100px)] w-full flex-col justify-between">
        <div className="no-scrollbar flex h-full max-h-full w-full flex-col overflow-auto">
          {loading && questions.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
            </div>
          ) : sortedQuestions.length > 0 ? (
            <>
              {sortedQuestions.map((question, index) => (
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
                            t("seller.qa.anonymous")}
                        </h1>
                        <h1 className="text-xs text-davyGray">
                          {formatDate(question.createdAt)}
                        </h1>
                      </div>
                      <span className="text-[14.4px] text-eerieBlack">
                        {question.question}
                      </span>
                    </div>

                    {question.answer && (
                      <div className="flex w-full gap-2 border-l-2 border-dashed border-black/10 pl-3">
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
                                  t("seller.qa.seller")}{" "}
                                <span className="text-moonstone">
                                  ({t("seller.qa.seller_label")})
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

              {hasMore && (
                <div className="flex justify-center py-4">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="rounded-lg bg-moonstone px-4 py-2 text-white disabled:opacity-50"
                  >
                    {loading ? t("seller.common.loading") : t("qa.load_more")}
                  </button>
                </div>
              )}
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

export default ProductQuestionsList;
