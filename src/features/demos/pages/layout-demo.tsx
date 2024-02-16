import Box from '@cloudscape-design/components/box';
import ContentLayout from '@cloudscape-design/components/content-layout';
import { useLayoutStore } from '@/stores/use-layout-store';

const LayoutDemoPage = () => {
  const { navigationHidden, navigationOpen, toolsHidden, toolsOpen } =
    useLayoutStore();

  return (
    <ContentLayout>
      <Box variant='code'>
        navigationHidden: {navigationHidden}, navigationOpen: {navigationOpen},
        toolsHidden: {toolsHidden}, toolsOpen: {toolsOpen}
      </Box>
    </ContentLayout>
  );
};

export const Component = LayoutDemoPage;
