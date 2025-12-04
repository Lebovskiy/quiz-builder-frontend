import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type QuestionType = 'SINGLE' | 'MULTIPLE' | 'OPEN';

export type QuizDto = {
  id: string;
  title: string;
  questions: Array<{
    answer: undefined;
    id: string;
    text: string;
    type: QuestionType;
    options?: string[];
  }>;
};

export type AnswerForm = {
  answers: Record<string, string | string[]>;
};

type AnswerFormType = {
  quizId: string;
};

export const useAnswerForm = ({ quizId }: AnswerFormType) => {
  const navigate = useNavigate();
  const form = useForm<AnswerForm>({
    defaultValues: { answers: {} },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: AnswerForm & { quizId: string }) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/answer/`, {
        content: data.answers,
        quizId: data.quizId,
      });
      return response.data;
    },
  });

  return {
    form,
    onSubmit: () => {
      const data = form.getValues();
      mutate({ ...data, quizId });
      navigate('/quiz');
    },
  };
};
