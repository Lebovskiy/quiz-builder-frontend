import { Stack, TextInput, Button } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  namePrefix: string;
  errorsMsg?: string;
  min?: number;
};

export const QuizOptions = ({ namePrefix, errorsMsg, min = 2 }: Props) => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${namePrefix}.options`,
  });

  return (
    <Stack gap="xs">
      <div style={{ fontSize: 12, opacity: 0.8 }}>Options (min {min})</div>

      {fields.map((field, index) => (
        <TextInput
          key={field.id}
          placeholder={`Option ${index + 1}`}
          {...register(`${namePrefix}.options.${index}` as const)}
        />
      ))}

      <Button size="xs" variant="light" onClick={() => append('')}>
        <IconPlus size={16} /> Add option
      </Button>

      {fields.length > min && (
        <Button size="xs" color="red" variant="subtle" onClick={() => remove(fields.length - 1)}>
          <IconMinus size={16} /> Remove last option
        </Button>
      )}

      {errorsMsg && <div style={{ color: 'crimson', fontSize: 12 }}>{errorsMsg}</div>}
    </Stack>
  );
};
