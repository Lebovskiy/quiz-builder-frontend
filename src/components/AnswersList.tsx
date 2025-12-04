import { Group } from '@mantine/core';
import type { AnswerType } from '../pages/AnswersPage';
import { Answer } from './Answer';

type Props = {
  answers: AnswerType[];
};

export const AnswersList = ({ answers }: Props) => {
  return (
    <Group mt={120} w="100%">
      {answers.map((answer) => (
        <Answer answer={answer} />
      ))}
    </Group>
  );
};
