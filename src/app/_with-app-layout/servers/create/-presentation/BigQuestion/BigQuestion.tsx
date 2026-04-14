import type { ReactNode } from 'react';

import { MessageCircleQuestionIcon } from 'lucide-react';

export default function BigQuestion(props: Props) {
  const { questionIcon, question, questionExplanation, children } = props;

  const Icon = questionIcon || MessageCircleQuestionIcon;

  return (
    <div className="flex flex-col px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col w-[90%] sm:w-[80%] lg:w-[60%]">
        <Icon className="w-12 h-12" />
        <h1 className="mt-4 font-bold text-3xl">{question}</h1>
        {questionExplanation && (
          <h1 className="mt-2 text-lg">{questionExplanation}</h1>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

interface Props {
  questionIcon?: (props: { className?: string }) => ReactNode;
  question: string;
  questionExplanation?: string;
  children: ReactNode;
}
