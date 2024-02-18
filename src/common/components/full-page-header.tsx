import type { ReactNode } from 'react';
import Button from '@cloudscape-design/components/button';
import Header, { type HeaderProps } from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { InfoLink } from '@/common/components/info-link';

type Action = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type FullPageHeaderProps = HeaderProps & {
  title: string;
  selectedItemsCount: number;
  createButtonText?: string;
  actions?: Action[];
  extraActions?: ReactNode;
  onInfoLinkClick?: () => void;
  onViewResourceClick?: () => void;
  onEditResourceClick?: () => void;
  onDeleteResourceClick?: () => void;
  onCreateResourceClick?: () => void;
};
export const FullPageHeader = ({
  title,
  selectedItemsCount,
  createButtonText = 'Create',
  actions,
  extraActions,
  onInfoLinkClick,
  onViewResourceClick,
  onEditResourceClick,
  onDeleteResourceClick,
  onCreateResourceClick,
  ...props
}: FullPageHeaderProps) => {
  const isOnlyOneItemSelected = selectedItemsCount === 1;

  return (
    <Header
      {...props}
      variant='awsui-h1-sticky'
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size='xs' direction='horizontal'>
          {extraActions}
          {actions?.map((action) => (
            <Button
              key={action.label}
              data-test-id={`header-btn-${action.label.toLowerCase()}`}
              disabled={action.disabled}
              onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
          {onViewResourceClick && (
            <Button
              data-test-id='header-btn-view'
              disabled={!isOnlyOneItemSelected}
              onClick={onViewResourceClick}>
              View
            </Button>
          )}
          {onEditResourceClick && (
            <Button
              data-test-id='header-btn-edit'
              disabled={!isOnlyOneItemSelected}
              onClick={onEditResourceClick}>
              Edit
            </Button>
          )}
          {onDeleteResourceClick && (
            <Button
              data-test-id='header-btn-delete'
              disabled={selectedItemsCount <= 0}
              onClick={onDeleteResourceClick}>
              Delete
            </Button>
          )}
          {onCreateResourceClick && createButtonText && (
            <Button
              data-test-id='header-btn-create'
              variant='primary'
              onClick={onCreateResourceClick}>
              {createButtonText}
            </Button>
          )}
        </SpaceBetween>
      }>
      {title}
    </Header>
  );
};
