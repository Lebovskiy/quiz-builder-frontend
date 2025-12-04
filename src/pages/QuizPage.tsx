import { Group, Card, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

type QuizType = {
  id: string;
  title: string;
  questions: Record<string, string | string[] | undefined>[];
};

export default function QuizPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['quiz'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/findAll`);
      return res.data;
    },
  });
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Loader
        size="xl"
        variant="dots"
        color="blue"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      />
    );

  return (
    <DefaultLayout>
      <Group w={1200} m="0 auto" pt={100}>
        <Text w="100%" fw={600} c="var(--mantine-color-black)" fz={24} ta="center">
          Quiz list
        </Text>
        <Group style={{ cursor: 'pointer' }} w="100%" justify="start" wrap="wrap">
          {data.map((item: QuizType) => (
            <Card
              onClick={() => {
                navigate('/quiz/' + item.id + '/take');
              }}
              key={item.id}
              shadow="sm"
              p="lg"
              w="30%"
              radius="md"
              withBorder
            >
              <Text>{item.title}</Text>
              <Text> Question count: {item.questions ? item.questions.length : 0}</Text>
            </Card>
          ))}
        </Group>

        {data.length === 0 && (
          <Text w="100%" fw={600} c="var(--mantine-color-gray-6)" fz={20} ta="center" mt={50}>
            No quizzes found. Create your first quiz!
          </Text>
        )}
      </Group>
    </DefaultLayout>
  );
}
