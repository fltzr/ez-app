import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import { useLayoutStore } from '@/common/stores/use-layout-store';

const Home = () => {
  const layoutState = useLayoutStore();

  return (
    <Container>
      <Box variant="pre">{JSON.stringify(layoutState, null, 2)}</Box>
      Protected Page!
    </Container>
  );
};

export const Component = Home;
