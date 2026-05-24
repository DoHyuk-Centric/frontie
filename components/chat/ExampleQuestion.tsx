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
    <button
      onClick={onClick}
      className="flex dark:text-gray-100 [&_svg]:size-auto cursor-pointer justify-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 h-auto w-[50%] min-w-84 shadow-sm"
    >
      <div className="w-10 h-10 shrink-0 overflow-visible flex items-center justify-center">
        {icon}
      </div>

      <div className="flex flex-col items-start">
        <p className="text-[16px] font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-[13px] text-gray-400 dark:text-gray-400">
          {subTitle}
        </p>
      </div>
    </button>
  );
}
