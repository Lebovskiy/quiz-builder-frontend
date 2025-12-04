import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type QuestionType = 'SINGLE' | 'MULTIPLE' | 'OPEN';

export type QuizFromValues = {
  title: string;
  questions: Array<{
    text: string;
    type: QuestionType;
    options?: Array<{ value: string }>;
  }>;
};

export const SELECT_OPTIONS = [
  { value: 'SINGLE', label: 'One answer' },
  { value: 'MULTIPLE', label: 'Few answers' },
  { value: 'OPEN', label: 'Detailed answer' },
] as const;

export const useQuizFrom = () => {
  const navigate = useNavigate();
  const form = useForm<QuizFromValues>({
    defaultValues: {
      title: '',
      questions: [{ text: '', type: 'SINGLE', options: [{ value: '' }, { value: '' }] }],
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    shouldFocusError: false,
    criteriaMode: 'firstError',
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    keyName: 'id',
  });

  const { mutate } = useMutation({
    mutationFn: async (data: {
      title: string;
      questions: Array<{
        text: string;
        type: QuestionType;
        options?: Array<string>;
      }>;
    }) => {
      await axios.post(`${import.meta.env.VITE_API_URL}/quiz`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });

  const onSubmit = (data: QuizFromValues) => {
    const questions = data.questions.map((question) => {
      return {
        ...question,
        options: question.options?.map((opt) => {
          return opt.value;
        }),
      };
    });

    mutate({
      ...data,
      questions,
    });

    navigate('/quiz');
  };

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
  };
};
