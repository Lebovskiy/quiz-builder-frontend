/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { QuizFromValues } from '../hooks/useQuizFrom';
import { Button, Group, Stack } from '@mantine/core';
import { OptionInput } from './OptionInput';

type Props = { questionIndex: number };

export const OptionsList = ({ questionIndex }: Props) => {
  const { control } = useFormContext<QuizFromValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options` as const,
    keyName: 'id',
  });

  return (
    <Stack gap="xs">
      {fields.map((f, optIdx) => (
        <OptionInput
          key={f.id}
          name={`questions.${questionIndex}.options.${optIdx}.value`}
          label={`Option ${optIdx + 1}`}
          onRemove={() => remove(optIdx)}
        />
      ))}

      <Group justify="flex-start">
        <Button variant="transparent" onClick={() => append('' as any)}>
          + Add option
        </Button>
      </Group>
    </Stack>
  );
};
