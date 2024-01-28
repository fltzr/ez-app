/* eslint-disable react/no-multi-comp */
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';

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

  return (
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
        />
      </div>
    </HeaderPortal>
  );
};
