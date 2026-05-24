import { UIMessage } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Chat {
  id: number;
  title: string;
  messages: UIMessage[];
}

interface ChatStore {
  chatList: Chat[];
  activeId: number | null;
  addChat: () => number;
  setActiveId: (id: number) => void;
  deleteChat: (id: number) => void;
  updateMessages: (id: number, messages: UIMessage[]) => void;
  updateTitle: (id: number, title: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatList: [],
      activeId: null,

      addChat: () => {
        const newChat: Chat = {
          id: Date.now(),
          title: "새 대화",
          messages: [],
        };
        set((state) => ({
          chatList: [newChat, ...state.chatList],
          activeId: newChat.id,
        }));
        return newChat.id;
      },

      setActiveId: (id) => set({ activeId: id }),
      deleteChat: (id) =>
        set((state) => ({
          chatList: state.chatList.filter((chat) => chat.id !== id),
          activeId: state.activeId === id ? null : state.activeId,
        })),
      updateMessages: (id, messages) =>
        set((state) => ({
          chatList: state.chatList.map((chat) =>
            chat.id === id ? { ...chat, messages } : chat,
          ),
        })),
      updateTitle: (id, title) =>
        set((state) => ({
          chatList: state.chatList.map((chat) =>
            chat.id === id ? { ...chat, title } : chat,
          ),
        })),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ chatList: state.chatList }),
    },
  ),
);
