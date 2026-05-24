"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import Chat from "@/components/chat/Chat";

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { chatList, setActiveId } = useChatStore();

  useEffect(() => {
    const id = Number(params.id);
    const exists = chatList.some((chat) => chat.id === id);
    exists ? setActiveId(id) : router.replace("/chat");
  }, [params.id]);

  return <Chat />;
}