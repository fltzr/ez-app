import { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { capitalize } from 'lodash-es';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table, { type TableProps } from '@cloudscape-design/components/table';
import { useColumnWidths } from '@/common/hooks/use-column-widths';
import { useLocalStorage } from '@/common/hooks/use-local-storage';
import {
  createDefaultPreferences,
  createFilteringProperties,
  getHeaderCounterText,
  getTextFilterCounterText,
  type TableColumnDefinition,
} from '@/common/utils/table-utils';
import { FullPageHeader } from '../full-page-header';
import { TableEmptyState, TableNoMatchState } from './states';
import { Preferences } from './table-preferences';

type ReusableTableProps<T> = Partial<TableProps> & {
  localstorageKeyPrefix: string;
  resource: string;
  columnDefinitions: TableColumnDefinition<T>[];
  items: T[];
  loading?: boolean;
  loadingText?: string;
  disableFilter?: boolean;
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
  const tableWidthsStorageKey = `React-${localstorageKeyPrefix}-Table-Widths`;
  const tablePreferencesStorageKey = `React-${localstorageKeyPrefix}-Table-Preferences`;

  const [columnDefinitions, saveWidths] = useColumnWidths({
    localstorageKey: tableWidthsStorageKey,
    columnDefinitions: props.columnDefinitions,
  });

  const [preferences, setPreferences] =
    useLocalStorage<CollectionPreferencesProps.Preferences>({
      localstorageKey: tablePreferencesStorageKey,
      initialValue: createDefaultPreferences(columnDefinitions),
    });

  const filteringProperties = createFilteringProperties(columnDefinitions);

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    propertyFilterProps,
    paginationProps,
  } = useCollection(props.items, {
    propertyFiltering: {
      filteringProperties,
      empty: <TableEmptyState resource={resource.toLowerCase()} />,
      noMatch: (
        <TableNoMatchState
          onClearFilter={() => {
            actions.setFiltering('');
          }}
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize ?? 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  const [selectedItems, setSelectedItems] = useState<T[]>([]);

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
          onInfoLinkClick={props.onInfoClick}
          onViewResourceClick={props.onViewClick ? () => {props.onViewClick?.(selectedItems[0].id)} : undefined}
          onEditResourceClick={props.onEditClick ? () => {props.onEditClick?.(selectedItems[0].id)} : undefined}
          onCreateResourceClick={props.onCreateClick ? () => {props.onCreateClick?.()} : undefined}
          onDeleteResourceClick={() => {
            props.onDeleteClick && props.onDeleteClick(selectedItems.map(i => i.id));
          }}
        />
      }
      filter={
        <>
          {disableFilter ? undefined : (
            <PropertyFilter
              {...propertyFilterProps}
              expandToViewport
              countText={getTextFilterCounterText({ count: filteredItemsCount })}
              filteringAriaLabel={`Filter ${resource.toLowerCase()}s`}
              filteringPlaceholder={`Filter ${resource.toLowerCase()}s`}
            />
          )}
        </>
      }
      preferences={
        <Preferences
          resource={resource}
          items={columnDefinitions}
          preferences={preferences}
          setPreferences={event => {
            setPreferences(event.detail);
          }}
        />
      }
      onSelectionChange={event => {
        setSelectedItems(event.detail.selectedItems);
      }}
      onColumnWidthsChange={event => {
        saveWidths(event);
      }}
    />
  );
};
