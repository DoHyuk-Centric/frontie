import { Button } from "@/components/ui/button";
import LogoIcon from "@/components/icons/LogoIcon";
import Code from "@/components/icons/chat/Code";

export default function Chat() {
  return (
    <main className="flex flex-col items-center">
      <LogoIcon />
      <h2 className="text-[24px]">프론트에게 물어보세요.</h2>
      <p className="text-[14px] text-[#717182] text-center">
        무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접 질문해보세요.
      </p>

      <div className="flex flex-col w-full">
        <Button className="flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 h-auto w-full shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl shrink-0">
            <Code />
          </div>
          <div className="flex flex-col items-start text-black">
            <p className="text-[16px] font-medium">코드 작성 도움</p>
            <p className="text-[13px] text-gray-400">
              React 컴포넌트를 만드는 방법을 알려주세요.
            </p>
          </div>
        </Button>
      </div>
    </main>
  );
}
