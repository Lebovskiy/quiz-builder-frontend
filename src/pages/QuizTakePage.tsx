import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Container,
  Title,
  Stack,
  Card,
  Text,
  Button,
  Radio,
  Checkbox,
  Textarea,
  Loader,
  Group,
} from '@mantine/core';
import { Controller, FormProvider } from 'react-hook-form';
import { useAnswerForm, type QuizDto } from '../hooks/useAnswerForm';
import DefaultLayout from '../layout/DefaultLayout';

export default function QuizTakePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<QuizDto>({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/${id}`);

      return res.data;
    },
    enabled: !!id,
  });

  const { mutate: removeQuiz } = useMutation({
    mutationFn: async (quizId: string) => {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/quiz/${quizId}/remove`);
      return res.data;
    },
  });

  const { form, onSubmit } = useAnswerForm({ quizId: id || '' });
  const { control } = form;

  if (isLoading) {
    <Container size="sm" py="lg">
      <Loader />
    </Container>;
  }

  const handleRemoveQuiz = () => {
    removeQuiz(id || '');
    navigate('/quiz');
  };

  if (error || !data) {
    return <Text> Something went wrong... </Text>;
  }

  return (
    <DefaultLayout>
      <Group w={800} m="0 auto" justify="space-between" pt={100} align="center">
        <Title order={2} mt="40" mb="md">
          {data.title}
        </Title>
        <Group>
          <Button onClick={handleRemoveQuiz} color="red">
            Delete quiz
          </Button>
          <Button onClick={() => navigate(`/quiz/${id}/answers`)}>Show answers</Button>
        </Group>
      </Group>

      <FormProvider {...form}>
        <form>
          <Stack gap="md" w={800} m="0 auto">
            {data?.questions.map((question, idx) => (
              <Card key={question.id} withBorder padding="md" radius="md">
                <Text fw={600} mb="xs">
                  {idx + 1}. {question.text}
                </Text>

                {question.type === 'SINGLE' && (
                  <Controller
                    name={`answers.${question.text}`}
                    control={control}
                    rules={{ required: 'Choose option' }}
                    render={({ field, fieldState }) => (
                      <Stack gap="xs">
                        {question.options?.map((opt, i) => (
                          <Radio
                            key={i}
                            value={opt}
                            label={opt}
                            checked={field.value === opt}
                            onChange={() => field.onChange(opt)}
                          />
                        ))}
                        {fieldState.error && (
                          <Text c="red" fz="sm">
                            {fieldState.error.message}
                          </Text>
                        )}
                      </Stack>
                    )}
                  />
                )}

                {question.type === 'MULTIPLE' && (
                  <Controller
                    name={`answers.${question.text}`}
                    control={control}
                    defaultValue={[]}
                    rules={{
                      validate: (val) =>
                        Array.isArray(val) && val.length > 0 ? true : 'Select at least one option',
                    }}
                    render={({ field, fieldState }) => (
                      <Checkbox.Group
                        value={Array.isArray(field.value) ? field.value : []}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                      >
                        <Stack gap="xs">
                          {question.options?.map((opt) => (
                            <Checkbox key={opt} value={opt} label={opt} />
                          ))}
                        </Stack>
                      </Checkbox.Group>
                    )}
                  />
                )}
                {question.type === 'OPEN' && (
                  <Controller
                    name={`answers.${question.text}`}
                    control={control}
                    rules={{ required: 'Enter answer' }}
                    render={({ field, fieldState }) => (
                      <>
                        <Textarea
                          placeholder="Your answer..."
                          minRows={3}
                          value={(field.value as string) ?? ''}
                          onChange={(e) => field.onChange(e.currentTarget.value)}
                        />
                        {fieldState.error && (
                          <Text c="red" fz="sm">
                            {fieldState.error.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                )}
              </Card>
            ))}

            <Button type="button" onClick={onSubmit} color="blue" fullWidth>
              Send answers
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </DefaultLayout>
  );
}
