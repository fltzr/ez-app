/* eslint-disable react/no-multi-comp */
import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { UserPreferencesModal } from '@/components/preferences-modal';

import { useAuthStore } from '@/stores/use-auth-store';
import { useNotificationStore } from '@/stores/use-notification-store';
import styles from './styles.module.css';

const HeaderPortal = ({ children }: PropsWithChildren) => {
  const dom = document.querySelector('#h');

  if (!dom) {
    return null;
  }

  return createPortal(children, dom);
};

export const Header = () => {
  const navigate = useNavigate();

  const addNotification = useNotificationStore(state => state.addNotification);
  const { user, setAuthState } = useAuthStore(state => ({
    user: state.user,
    setAuthState: state.setAuthState,
  }));

  const [userPreferencesModalOpen, setUserPreferencesModalOpen] = useState(false);

  return (
    <>
      <HeaderPortal>
        <div className={styles.header}>
          <TopNavigation
            identity={{
              title: 'ez app',
              href: '/',
              onFollow: event => {
                event.preventDefault();
                navigate('/');
              },
            }}
            utilities={
              user
                ? [
                    {
                      type: 'button',
                      iconName: 'settings',
                      onClick: () => {
                        setUserPreferencesModalOpen(!userPreferencesModalOpen);
                      },
                    },
                    {
                      type: 'menu-dropdown',
                      text: `Hello, ${user.firstName}!`,

                      description: user.email,
                      items: [
                        {
                          text: 'Sign out',
                          id: 'user-sign-out',
                        },
                      ],
                      onItemClick: event => {
                        if (event.detail.id !== 'user-sign-out') {
                          return;
                        }

                        setAuthState({ user: null, isAuthenticated: false });
                        navigate('/signin', { replace: true });
                        addNotification({
                          type: 'success',
                          id: `notification-user-sign-out-${Date.now()}`,
                          header: 'Successfully signed out.',
                          autoDismiss: true,
                        });
                      },
                    },
                  ]
                : undefined
            }
          />
        </div>
      </HeaderPortal>
      <UserPreferencesModal
        visible={userPreferencesModalOpen}
        onDismiss={() => {
          setUserPreferencesModalOpen(false);
        }}
      />
    </>
  );
};
