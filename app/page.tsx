import Header from "@/components/header/page";
import Chat from "@/app/Chat/page";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Chat />
    </div>
  );
}
