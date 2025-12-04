import type { ReactNode } from 'react';
import { AppShell, Button, Group, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

type DefaultLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
};

export default function DefaultLayout({ children, header }: DefaultLayoutProps) {
  const navigate = useNavigate();
  return (
    <AppShell w="100vw" h="100vh">
      <AppShell.Header>
        {header || (
          <Group p="md" justify="space-between" align="center" w="100%">
            <Title onClick={() => navigate('/')}>Quiz App</Title>
            <Button
              h={40}
              w={40}
              radius="xl"
              variant="filled"
              color="blue"
              onClick={() => navigate('/create')}
              p={0}
            >
              <IconPlus size={25} stroke={2} color="var(--mantine-color-white)" />
            </Button>
          </Group>
        )}
      </AppShell.Header>
      {children}
    </AppShell>
  );
}
