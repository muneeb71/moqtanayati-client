"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { createSurveyStore, initSurveyStore } from "@/stores/survey-store";

export const SurveyStoreContext = createContext(undefined);

export const SurveyStoreProvider = ({ children, userData }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    const initialState = initSurveyStore();
    if (userData) {
      initialState.userData = userData;
    }
    storeRef.current = createSurveyStore(initialState);
  }

  return (
    <SurveyStoreContext.Provider value={storeRef.current}>
      {children}
    </SurveyStoreContext.Provider>
  );
};

export const useSurveyStore = (selector) => {
  const surveyStoreContext = useContext(SurveyStoreContext);

  if (!surveyStoreContext) {
    throw new Error("useSurveyStore must be used within SurveyStoreProvider");
  }

  return useStore(surveyStoreContext, selector);
};
