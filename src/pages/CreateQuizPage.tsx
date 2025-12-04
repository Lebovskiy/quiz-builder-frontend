import { Button, Group, Stack, Title, Divider } from '@mantine/core';
import DefaultLayout from '../layout/DefaultLayout';
import { FormProvider } from 'react-hook-form';

import { useQuizFrom } from '../hooks/useQuizFrom';
import { QuestionRow } from '../components/QuestionRow';
import { TitleInput } from '../components/TitleInput';

export default function CreateQuizPage() {
  const { form, fields, append, remove, onSubmit } = useQuizFrom();

  return (
    <DefaultLayout>
      <Group w={800} m="0 auto" justify="space-between" pt={100} align="center" pb={30}>
        <FormProvider {...form}>
          <form style={{ width: '100%' }}>
            <Stack gap="lg">
              <Title order={3}>Create quiz</Title>

              <TitleInput />

              <Divider />

              <Stack gap="md">
                {fields.map((field, idx) => (
                  <QuestionRow key={field.id} index={idx} onRemove={() => remove(idx)} />
                ))}
              </Stack>

              <Group justify="space-between">
                <Button
                  variant="light"
                  onClick={() =>
                    append({
                      text: '',
                      type: 'SINGLE',
                      options: [{ value: '' }, { value: '' }],
                    })
                  }
                >
                  + Add question
                </Button>

                <Button onClick={() => onSubmit(form.getValues())}>Save</Button>
              </Group>
            </Stack>
          </form>
        </FormProvider>
      </Group>
    </DefaultLayout>
  );
}
