import { Group, Loader, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { AnswersList } from '../components';

export type AnswerType = {
  id: string;
  content: Record<string, string | undefined | string[]>;
  quizId: string;
};
export default function AnswersPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<AnswerType[]>({
    queryKey: ['answers', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/answer/${id}`);
      return res.json();
    },
  });

  if (isLoading)
    return (
      <Loader
        size="xl"
        variant="dots"
        color="blue"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      />
    );

  if (!data) return <Group> No answers found </Group>;

  return (
    <DefaultLayout>
      <Group w={1200} m="0 auto" justify="center" pt={100}>
        <Title>Answers for quiz: </Title>
        <AnswersList answers={data} />
      </Group>
    </DefaultLayout>
  );
}
