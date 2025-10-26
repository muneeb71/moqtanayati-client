// Q&A Error Handler Utility
export const handleQAError = (error) => {
  console.error("🔍 [QA Error Handler] Error:", error);

  // Handle different types of errors
  if (error.message) {
    switch (error.message) {
      case "Product not found":
        return "This product no longer exists";
      case "Sellers cannot ask questions about their own products":
        return "You cannot ask questions about your own products";
      case "Only the product owner can answer this question":
        return "You can only answer questions about your own products";
      case "This question has already been answered":
        return "This question has already been answered";
      case "Question not found":
        return "The question you're trying to answer no longer exists";
      case "Unauthorized":
        return "You don't have permission to perform this action";
      case "Authentication required":
        return "Please log in to continue";
      case "Invalid question":
        return "Please enter a valid question";
      case "Invalid answer":
        return "Please enter a valid answer";
      default:
        return error.message;
    }
  }

  // Handle network errors
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }

  // Handle timeout errors
  if (error.name === "AbortError") {
    return "Request timed out. Please try again.";
  }

  // Default error message
  return "An unexpected error occurred. Please try again.";
};

// Success messages
export const getSuccessMessage = (action) => {
  const messages = {
    questionSubmitted: "Question submitted successfully!",
    answerSubmitted: "Answer submitted successfully!",
    questionDeleted: "Question deleted successfully!",
    dataLoaded: "Data loaded successfully!",
  };

  return messages[action] || "Action completed successfully!";
};

// Loading messages
export const getLoadingMessage = (action) => {
  const messages = {
    submittingQuestion: "Submitting question...",
    submittingAnswer: "Submitting answer...",
    deletingQuestion: "Deleting question...",
    loadingData: "Loading data...",
  };

  return messages[action] || "Processing...";
};
