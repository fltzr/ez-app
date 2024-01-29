/* eslint-disable react/no-multi-comp */
import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { UserPreferencesModal } from '@/components/preferences-modal';

import { useAuthStore } from '@/stores/use-auth-store';
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
  const [userPreferencesModalOpen, setUserPreferencesModalOpen] = useState(false);

  const user = useAuthStore(state => state.user);

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
