import { Button, Group, TextInput } from '@mantine/core';
import { useController, useFormContext } from 'react-hook-form';
import type { QuizFromValues } from '../hooks/useQuizFrom';

type Props = {
  name: `questions.${number}.options.${number}.value`;
  label: string;
  onRemove: () => void;
};

export const OptionInput = ({ name, label, onRemove }: Props) => {
  const { control } = useFormContext<QuizFromValues>();
  const { field } = useController({ control, name });

  return (
    <Group wrap="nowrap">
      <TextInput
        style={{ flex: 1 }}
        label={label}
        placeholder="Option text"
        value={typeof field.value === 'string' ? field.value : ''}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        ref={field.ref}
      />
      <Button variant="subtle" color="red" onClick={onRemove}>
        Remove
      </Button>
    </Group>
  );
};
