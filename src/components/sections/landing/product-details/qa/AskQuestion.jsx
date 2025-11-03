"use client";

import { useState } from "react";
import { sendIcon } from "@/assets/icons/common-icons";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import {
  handleQAError,
  getSuccessMessage,
  getLoadingMessage,
} from "@/utils/qaErrorHandler";
import api from "@/lib/api/axios";
import useTranslation from "@/hooks/useTranslation";

const AskQuestion = ({ productId, onQuestionAdded }) => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error(t("seller.qa.errors.enter_question"));
      return;
    }

    setSending(true);
    try {
      const userId = getCookie("userId");

      if (!userId) {
        toast.error(t("seller.qa.errors.login_to_ask"));
        setSending(false);
        return;
      }

      console.log(
        "🔍 [AskQuestion] Submitting question for product:",
        productId,
      );
      console.log("🔍 [AskQuestion] User ID:", userId);

      const response = await api.post(
        `/buyers/products/${productId}/questions`,
        {
          question: question.trim(),
          buyerId: userId,
        },
      );

      const data = response.data;

      if (data.success) {
        toast.success(t("seller.qa.success.submitted"));
        setQuestion("");
        onQuestionAdded?.();
      } else {
        toast.error(handleQAError({ message: data.message }));
      }
    } catch (error) {
      console.error("🔍 [AskQuestion] Error submitting question:", error);
      toast.error(handleQAError(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t border-[#F0F1F4] bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 p-4 pb-6"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("seller.qa.ask_placeholder")}
          className="h-[50px] w-full rounded-[10px] border border-gray-200 bg-[#F8F7FB] px-4 focus:border-moonstone focus:outline-none"
          disabled={sending}
          required
        />
        <button
          type="submit"
          disabled={sending || !question.trim()}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-moonstone text-white disabled:opacity-50"
        >
          {sending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
