"use client";

import { useState } from "react";
import QAStats from "@/components/sections/seller/qa/QAStats";
import UnansweredQuestions from "@/components/sections/seller/qa/UnansweredQuestions";
import AnsweredQuestions from "@/components/sections/seller/qa/AnsweredQuestions";

const SellerQAPage = () => {
  const [activeTab, setActiveTab] = useState("stats");

  const tabs = [
    { id: "stats", label: "Statistics", component: QAStats },
    { id: "unanswered", label: "Unanswered", component: UnansweredQuestions },
    { id: "answered", label: "Answered", component: AnsweredQuestions },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Q&A Management</h1>
          <p className="mt-2 text-gray-600">
            Manage questions and answers for your products
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-moonstone text-moonstone"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default SellerQAPage;
