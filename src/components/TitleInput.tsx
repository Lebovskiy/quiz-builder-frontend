import { TextInput } from '@mantine/core';
import { useController, useFormContext, useFormState } from 'react-hook-form';
import type { QuizFromValues } from '../hooks/useQuizFrom';

export const TitleInput = () => {
  const { control } = useFormContext<QuizFromValues>();
  const { field } = useController({ control, name: 'title' });
  const { errors } = useFormState<QuizFromValues>({ name: 'title' });

  return (
    <TextInput
      label="Title"
      placeholder="Title"
      value={field.value ?? ''}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={field.onBlur}
      ref={field.ref}
      error={errors.title?.message}
    />
  );
};
