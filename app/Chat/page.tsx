import LogoIcon from "@/components/icons/LogoIcon";
import ExampleQuestion from "@/components/chat/ExampleQuestion";
import Code from "@/components/icons/chat/Code";
import Docs from "@/components/icons/chat/Docs";
import ElectricBulb from "@/components/icons/chat/ElectircBulb";
import Idea from "@/components/icons/chat/Idea";

const questions = [
  {
    title: "코드 작성 도움",
    subTitle: "React 컴포넌트를 만드는 방법을 알려주세요.",
    icon: <Code />,
  },
  {
    title: "문서 요약",
    subTitle: "이 문서의 주요 내용을 요약해주세요.",
    icon: <Docs />,
  },
  {
    title: "아이디어 브레인스토밍",
    subTitle: "새로운 프로젝트 아이디어를 제안해주세요.",
    icon: <ElectricBulb />,
  },
  {
    title: "창의적인 글쓰기",
    subTitle: "창의적인 이야기를 작성해주세요.",
    icon: <Idea />,
  },
];

export default function Chat() {
  return (
    <main className="flex flex-col items-center p-4">
      <LogoIcon />
      <h2 className="text-[24px]">프론트에게 물어보세요.</h2>
      <p className="text-[14px] text-[#717182] text-center">
        무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접 질문해보세요.
      </p>

      <div className="flex flex-col w-full">
        {questions.map((q, index) => (
          <ExampleQuestion
            key={index}
            title={q.title}
            subTitle={q.subTitle}
            icon={q.icon}
          />
        ))}
      </div>
    </main>
  );
}
