import { useState } from 'react';
import { capitalize, isEmpty } from 'lodash-es';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import {
  getHeaderCounterText,
  getTextFilterCounterText,
} from '@/common/utils/table-utils';
import { useTableState } from '@/hooks/use-table-state';
import { FullPageHeader, type FullPageHeaderProps } from '../full-page-header';
import { ManualRefresh } from './common/manual-refresh-button';
import { Preferences } from './common/table-preferences';
import type { ReusableTableProps } from './common/table-props';

export const ReusableTable = <T extends { id: string }>({
  selectedItems = [],
  setSelectedItems,
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

  const actionButtons: FullPageHeaderProps['actions'] = [
    props.onViewClick && {
      label: 'View',
      onClick: () => props.onViewClick?.(selectedItems[0].id),
      disabled: selectedItems.length !== 1,
    },
    props.onEditClick && {
      label: 'Edit',
      onClick: () => props.onEditClick?.(selectedItems[0].id),
      disabled: selectedItems.length !== 1,
    },
    props.onCreateClick && {
      label: 'Create',
      onClick: () => props.onCreateClick?.(),
    },
    props.onDeleteClick && {
      label: 'Delete',
      onClick: () => props.onDeleteClick?.(selectedItems.map((i) => i.id)),
      disabled: isEmpty(selectedItems),
    },
  ].filter(Boolean) as FullPageHeaderProps['actions'];

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
      submitEdit={props.onSubmitEdit}
      header={
        <FullPageHeader
          title={`${capitalize(resource)}s`}
          selectedItemsCount={selectedItems.length}
          actions={actionButtons}
          counter={getHeaderCounterText({
            items,
            selectedItems,
            totalItems: props.items.length,
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
