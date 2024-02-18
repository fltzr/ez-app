import type { TableProps } from '@cloudscape-design/components/table';
import type { TableColumnDefinition } from '@/utils/table-utils';

type BaseReusableTableProps<T> = Pick<
  TableProps,
  'variant' | 'stickyHeader' | 'selectionType'
> & {
  localstorageKeyPrefix: string;
  resource: string;
  columnDefinitions: TableColumnDefinition<T>[];
  items: T[];
  selectedItems: T[];
  loading?: boolean;
  loadingText?: string;
  disableFilter?: boolean;
};

export type ReusableTableEventHandlers<T> = {
  setSelectedItems: (items: T[]) => void;
  onSelectionReset?: () => void;
  onSubmitEdit?: TableProps.SubmitEditFunction<T>;
  onRefreshClick?: () => void;
  onInfoClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (ids: string[]) => void;
  onCreateClick?: () => void;
};

export type ReusableTableProps<T> = BaseReusableTableProps<T> &
  ReusableTableEventHandlers<T>;
