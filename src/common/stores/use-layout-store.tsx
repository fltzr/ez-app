import type { FlashbarProps } from '@cloudscape-design/components';
import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import { create } from 'zustand';
import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { load } from '../utils/local-storage';

type Notification = FlashbarProps.MessageDefinition & { autoDismiss?: boolean };

type LayoutState = {
  // Initial state
  theme: Theme;
  density: Density;
  domainTitle: string;
  activeHref: string;
  breadcrumbs: BreadcrumbGroupProps.Item[];
  notifications: Notification[];
  navigationHidden: boolean;
  navigationOpen: boolean;
  toolsHidden: boolean;
  toolsOpen: boolean;

  // Action
  setState: (state: Partial<LayoutState>) => void;
  removeNotification: (id: string) => void;
};

export const useLayoutStore = create<LayoutState>(set => ({
  // Initial state
  theme: load<Theme>('theme') ?? Theme.Dark,
  density: load<Density>('density') ?? Density.Comfortable,
  domainTitle: '',
  activeHref: '/',
  breadcrumbs: [],
  notifications: [],
  navigationHidden: false,
  navigationOpen: false,
  toolsHidden: false,
  toolsOpen: false,

  // Action
  setState: newState => {
    set(state => ({ ...state, ...newState }));
  },
  removeNotification: id => {
    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id),
    }));
  },
}));
