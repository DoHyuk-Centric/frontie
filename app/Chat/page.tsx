"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";

export default function ChatPage() {
  const { clearActiveId } = useChatStore();

  useEffect(() => {
    clearActiveId();
  }, []);

  return null;
}
