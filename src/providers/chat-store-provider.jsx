'use client';

import { createChatStore, initChatStore } from '@/stores/chat-store';
import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

export const ChatStoreContext = createContext(undefined);

export const ChatStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createChatStore(initChatStore());
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStore = (selector) => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext) {
    throw new Error('useChatStore must be used within ChatStoreProvider');
  }

  return useStore(chatStoreContext, selector);
};
