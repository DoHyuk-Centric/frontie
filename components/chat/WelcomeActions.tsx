"use client";

import ExampleQuestion from "./ExampleQuestion";
import Code from "@/components/icons/chat/Code";
import Docs from "@/components/icons/chat/Docs";
import ElectricBulb from "@/components/icons/chat/ElectircBulb";
import Idea from "@/components/icons/chat/Idea";

const questions = [
  { title: "코드 작성 도움", subTitle: "React 컴포넌트를 만드는 방법을 알려주세요.", icon: <Code /> },
  { title: "문서 요약", subTitle: "이 문서의 주요 내용을 요약해주세요.", icon: <Docs /> },
  { title: "아이디어 브레인스토밍", subTitle: "새로운 프로젝트 아이디어를 제안해주세요.", icon: <ElectricBulb /> },
  { title: "창의적인 글쓰기", subTitle: "창의적인 이야기를 작성해주세요.", icon: <Idea /> },
];

export default function WelcomeActions({
  onSend,
}: {
  onSend: (option: { text: string; files?: File[] }) => void;
}) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      {questions.map((q, index) => (
        <ExampleQuestion
          key={index}
          title={q.title}
          subTitle={q.subTitle}
          icon={q.icon}
          onClick={() => onSend({ text: q.subTitle })}
        />
      ))}
    </div>
  );
}