import LogoIcon from "@/components/icons/LogoIcon";
import WelcomeActions from "./WelcomeActions";

export default function WelcomeScreen({
  onSend,
}: {
  onSend: (option: { text: string }) => void;
}) {
  return (
    <>
      <LogoIcon />
      <div className="text-center">
        <h2 className="text-[24px]">프론티에게 물어보세요.</h2>
        <p className="text-[14px] text-[#717182]">
          무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접
          질문해보세요.
        </p>
      </div>
      <WelcomeActions onSend={onSend} />
    </>
  );
}