import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function ExampleQuestion({
  title,
  subTitle,
  icon,
  onClick,
}: Props) {
  return (
    <Button
      onClick={onClick}
      className="flex justify-start gap-3 bg-white border rounded-2xl px-4 py-3 h-auto w-full shadow-sm"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl shrink-0">
        {icon}
      </div>
      <div className="flex flex-col items-start text-black">
        <p className="text-[16px] font-medium">{title}</p>
        <p className="text-[13px] text-gray-400">{subTitle}</p>
      </div>
    </Button>
  );
}
