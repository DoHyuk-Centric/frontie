import { Button } from "@/components/ui/button";
import LogoIcon from "@/components/icons/LogoIcon";

export default function Chat() {
  return (
    <main className="flex flex-col items-center">
      <LogoIcon />
      <h2 className="text-[24px]">프론트에게 물어보세요.</h2>
      <p className="text-[14px] text-[#717182] text-center">
        무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접 질문해보세요.
      </p>

      <div className="flex flex-col w-full">
        <Button>코드 작성 도움</Button>
        <Button>코드 작성 도움</Button>
        <Button>코드 작성 도움</Button>
        <Button>코드 작성 도움</Button>
      </div>
    </main>
  );
}
