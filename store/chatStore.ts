import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Chat {
  id: number;
  title: string;
}

interface ChatStore {
  chatList: Chat[];
  activeId: number | null;
  addChat: () => void;
  setActiveId: (id: number) => void;
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
        };
        set((state) => ({
          chatList: [newChat, ...state.chatList],
          activeId: newChat.id,
        }));
      },

      setActiveId: (id) => set({ activeId: id }),
    }),
    { name: "chat-storage" },
  ),
);
