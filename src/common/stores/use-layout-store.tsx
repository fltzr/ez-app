import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { load } from '@/utils/local-storage';

type LayoutStore = {
  // Initial state
  theme: Theme;
  density: Density;
  domainTitle: string;
  activeHref: string;
  breadcrumbs: BreadcrumbGroupProps.Item[];
  navigationHidden: boolean;
  navigationOpen: boolean;
  toolsHidden: boolean;
  toolsOpen: boolean;

  // Action
  setState: (state: Partial<LayoutStore>) => void;
};

export const useLayoutStore = create<LayoutStore>(set => ({
  // Initial state
  theme: load<Theme>('theme') ?? Theme.Dark,
  density: load<Density>('density') ?? Density.Comfortable,
  domainTitle: '',
  activeHref: '/',
  breadcrumbs: [],
  navigationHidden: false,
  navigationOpen: false,
  toolsHidden: false,
  toolsOpen: false,

  // Action
  setState: newState => {
    set(state => ({ ...state, ...newState }));
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Layout Store', useLayoutStore);
}
