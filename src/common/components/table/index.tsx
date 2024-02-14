import { useState } from 'react';
import { capitalize } from 'lodash-es';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table, { type TableProps } from '@cloudscape-design/components/table';
import {
  getHeaderCounterText,
  getTextFilterCounterText,
  type TableColumnDefinition,
} from '@/common/utils/table-utils';
import { useTableState } from '@/hooks/use-table-state';
import { FullPageHeader } from '../full-page-header';
import { ManualRefresh } from './manual-refresh-button';
import { Preferences } from './table-preferences';

type ReusableTableProps<T> = Pick<TableProps, 'variant' | 'stickyHeader' | 'selectionType'> & {
  localstorageKeyPrefix: string;
  resource: string;
  columnDefinitions: TableColumnDefinition<T>[];
  items: T[];
  loading?: boolean;
  loadingText?: string;
  disableFilter?: boolean;
  onRefreshClick?: () => void;
  onInfoClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (ids: string[]) => void;
  onCreateClick?: () => void;
};

export const ReusableTable = <T extends { id: string }>({
  localstorageKeyPrefix,
  resource,
  loading,
  loadingText,
  disableFilter = false,
  ...props
}: ReusableTableProps<T>) => {
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);

  const {
    items,
    selectedItems,
    setSelectedItems,
    columnDefinitions,
    preferences,
    setPreferences,
    saveWidths,
    filteredItemsCount,
    collectionProps,
    propertyFilterProps,
    paginationProps,
  } = useTableState<T>({ localstorageKeyPrefix, resource, ...props });

  const onRefreshClickSideEffect = () => {
    props.onRefreshClick?.();
    setRefreshedAt(new Date());
  };

  return (
    <Table
      {...collectionProps}
      resizableColumns
      variant={props.variant}
      stickyHeader={props.stickyHeader}
      columnDefinitions={columnDefinitions}
      items={items}
      selectionType={props.selectionType}
      selectedItems={selectedItems}
      loading={loading}
      loadingText={loadingText}
      columnDisplay={preferences.contentDisplay}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      pagination={<Pagination {...paginationProps} />}
      header={
        <FullPageHeader
          title={`${capitalize(resource)}s`}
          selectedItemsCount={selectedItems.length}
          counter={getHeaderCounterText({
            items,
            selectedItems,
            totalItems: paginationProps.pagesCount * (preferences.pageSize ?? items.length),
          })}
          extraActions={
            props.onRefreshClick && (
              <ManualRefresh
                loading={loading ?? false}
                lastRefresh={refreshedAt}
                onRefresh={onRefreshClickSideEffect}
              />
            )
          }
          onInfoLinkClick={props.onInfoClick}
          onViewResourceClick={
            props.onViewClick ?
              () => {
                props.onViewClick?.(selectedItems[0].id);
              }
            : undefined
          }
          onEditResourceClick={
            props.onEditClick ?
              () => {
                props.onEditClick?.(selectedItems[0].id);
              }
            : undefined
          }
          onCreateResourceClick={
            props.onCreateClick ?
              () => {
                props.onCreateClick?.();
              }
            : undefined
          }
          onDeleteResourceClick={() => {
            props.onDeleteClick && props.onDeleteClick(selectedItems.map((i) => i.id));
          }}
        />
      }
      filter={
        <>
          {disableFilter ?
            undefined
          : <PropertyFilter
              {...propertyFilterProps}
              expandToViewport
              filteringAriaLabel={`Filter ${resource.toLowerCase()}s`}
              filteringPlaceholder={`Filter ${resource.toLowerCase()}s`}
              countText={getTextFilterCounterText({
                count: filteredItemsCount,
              })}
            />
          }
        </>
      }
      preferences={
        <Preferences
          resource={resource}
          items={columnDefinitions}
          preferences={preferences}
          setPreferences={(event) => {
            setPreferences(event.detail);
          }}
        />
      }
      onSelectionChange={(event) => {
        setSelectedItems(event.detail.selectedItems);
      }}
      onColumnWidthsChange={(event) => {
        saveWidths(event);
      }}
    />
  );
};
