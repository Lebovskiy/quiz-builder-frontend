import { Stack, TextInput, Select, Group, Button } from '@mantine/core';
import { useFormContext, useController, useFormState, Controller } from 'react-hook-form';
import { SELECT_OPTIONS, type QuestionType, type QuizFromValues } from '../hooks/useQuizFrom';
import { OptionsList } from './OptionsList';

type Props = {
  index: number;
  onRemove: () => void;
};

export const QuestionRow = ({ index, onRemove }: Props) => {
  const { control, getValues, setValue } = useFormContext<QuizFromValues>();

  const textCtrl = useController({ control, name: `questions.${index}.text` as const });
  const typeCtrl = useController({ control, name: `questions.${index}.type` as const });

  const { errors } = useFormState<QuizFromValues>({
    name: [`questions.${index}.text`, `questions.${index}.type`, `questions.${index}.options`],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qErr = (errors.questions as any)?.[index];

  const handleTypeChange = (v: string | null) => {
    const nextType = (v as QuestionType) ?? 'OPEN';
    typeCtrl.field.onChange(nextType);
    if (nextType === 'OPEN') {
      setValue(`questions.${index}.options`, undefined, { shouldDirty: true, shouldTouch: true });
    } else {
      const opts = getValues(`questions.${index}.options`) ?? [];
      if (opts.length < 2) {
        setValue(`questions.${index}.options`, [{ value: '' }, { value: '' }], {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    }
  };

  const currentType = typeCtrl.field.value;

  return (
    <Stack p="md" style={{ border: '1px solid #eee', borderRadius: 12 }} gap="sm">
      <TextInput
        label={`Question ${index + 1}`}
        placeholder="Question ..."
        value={textCtrl.field.value ?? ''}
        onChange={(e) => textCtrl.field.onChange(e.target.value)}
        onBlur={textCtrl.field.onBlur}
        ref={textCtrl.field.ref}
        error={qErr?.text?.message}
      />

      <Controller
        control={control}
        name={`questions.${index}.type` as const}
        render={() => (
          <Select
            label="Type"
            data={SELECT_OPTIONS}
            value={currentType}
            onChange={handleTypeChange}
            error={qErr?.type?.toString()}
          />
        )}
      />

      {(currentType === 'SINGLE' || currentType === 'MULTIPLE') && (
        <OptionsList questionIndex={index} />
      )}

      <Group justify="space-between">
        <Button variant="subtle" color="red" onClick={onRemove}>
          - Remove question
        </Button>
      </Group>
    </Stack>
  );
};
