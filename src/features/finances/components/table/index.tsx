import { ReusableTable } from '@/components/table';
import type { BudgetItem } from '../../types';
import { budgetItemColumnDefinitions } from './config';

type BudgetItemsTableProps = {
  loading: boolean;
  budgetItems: BudgetItem[];
  onRefreshClick?: () => void;
  onInfoClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (ids: string[]) => void;
  onCreateClick?: () => void;
};
export const BudgetItemsTable = ({
  loading,
  budgetItems,
  ...clickHandlers
}: BudgetItemsTableProps) => (
  <ReusableTable<BudgetItem>
    stickyHeader
    variant='borderless'
    localstorageKeyPrefix='Budget-Items'
    resource='Budget Item'
    columnDefinitions={budgetItemColumnDefinitions}
    items={budgetItems}
    loading={loading}
    loadingText='Loading resources...'
    selectionType='multi'
    onRefreshClick={clickHandlers.onRefreshClick}
    onCreateClick={clickHandlers.onCreateClick}
    onDeleteClick={clickHandlers.onDeleteClick}
    // onViewClick={onViewClick}
    // onEditClick={onEditClick}
    // onDeleteClick={onDeleteClick}
    // onCreateClick={onCreateClick}
  />
);
