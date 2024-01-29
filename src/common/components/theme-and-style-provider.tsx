import { type PropsWithChildren, useEffect } from 'react';
import { applyMode as applyTheme, applyDensity } from '@cloudscape-design/global-styles';
import { useLayoutStore } from '@/stores/use-layout-store';
import { save } from '@/utils/local-storage';

export const ThemeAndStyleProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useLayoutStore(state => ({ theme: state.theme }));
  const { density } = useLayoutStore(state => ({ density: state.density }));

  useEffect(() => {
    console.log(`Applying theme: ${theme} `);
    applyTheme(theme);
    save('theme', theme);
  }, [theme]);

  useEffect(() => {
    console.log(`Applying density: ${density} `);
    applyDensity(density);
    save('density', density);
  }, [density]);

  return <>{children}</>;
};
