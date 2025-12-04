import { Box, Card, Stack, Text } from '@mantine/core';
import type { AnswerType } from '../pages/AnswersPage';

type Props = {
  answer: AnswerType;
};
export const Answer = ({ answer }: Props) => {
  return (
    <Card bd="1px solid gray" radius="md" p="md" w="100%" m="0 auto">
      {Object.entries(answer.content).map(([key, value]) => (
        <Stack key={key} mb="md">
          <Box bg="#d6d4d4" p={8} style={{ borderRadius: '4px' }}>
            <Text fz={24} fw={500}>
              {key}
            </Text>
          </Box>
          <Text fz={17}>Answer: {Array.isArray(value) ? value.join(', ') : value} </Text>
        </Stack>
      ))}
    </Card>
  );
};
