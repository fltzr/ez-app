import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import { useLayoutStore } from '@/common/hooks/use-layout-store';

const Home = () => {
  const layoutState = useLayoutStore();

  return (
    <Container>
      <Box variant="pre">{JSON.stringify(layoutState, null, 2)}</Box>
    </Container>
  );
};

export const Component = Home;
