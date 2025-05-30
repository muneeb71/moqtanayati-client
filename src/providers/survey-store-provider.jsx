'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  createSurveyStore,
  initSurveyStore,
} from '@/stores/survey-store';

export const SurveyStoreContext = createContext(undefined);

export const SurveyStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createSurveyStore(initSurveyStore());
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
    throw new Error('useSurveyStore must be used within SurveyStoreProvider');
  }

  return useStore(surveyStoreContext, selector);
};
