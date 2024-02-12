import { useEffect } from 'react';
import { applyMode as applyTheme, applyDensity } from '@cloudscape-design/global-styles';
import { usePreferencesStore } from '@/stores/use-preferences-store';

export const useUserPreferencesEffects = () => {
  const theme = usePreferencesStore((s) => s.theme);
  const density = usePreferencesStore((s) => s.density);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyDensity(density);
  }, [density]);
};
