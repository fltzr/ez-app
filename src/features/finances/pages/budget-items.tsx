import { useState } from 'react';
import type { PropertyFilterQuery } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import { Preferences } from '@/components/table/table-preferences';
import { useColumnWidths } from '@/hooks/use-column-widths';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createDefaultPreferences } from '@/utils/table-utils';
import { budgetItemColumnDefinitions } from '../components/table/config';
import { useBudgetItems } from '../hooks/use-budget-items';
import type { BudgetItem } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DEFAULT_FILTERING_QUERY: PropertyFilterQuery = { tokens: [], operation: 'and' };

const BudgetItems = () => {
  const tableWidthsStorageKey = `React-Budget-Items-Table-Widths`;
  const tablePreferencesStorageKey = `React-Budget-Items-Table-Preferences`;

  const [selectedBudgetItems, setSelectedBudgetItems] = useState<BudgetItem[]>([]);
  const [filteringQuery, setFilteringQuery] = useState(DEFAULT_FILTERING_QUERY);
  const [sortingDescending, setSortingDescending] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [sortingColumn, setSortingColumn] = useState(budgetItemColumnDefinitions[0].id);

  const [columnDefinitions, saveWidths] = useColumnWidths({
    localstorageKey: tableWidthsStorageKey,
    columnDefinitions: budgetItemColumnDefinitions,
  });

  const [preferences, setPreferences] =
    useLocalStorage<CollectionPreferencesProps.Preferences>({
      localstorageKey: tablePreferencesStorageKey,
      initialValue: createDefaultPreferences(columnDefinitions),
    });

  const {
    data: { budgetItems, pagesCount, currentPageIndex: serverPageIndex },
    isLoading,
  } = useBudgetItems({
    pagination: {
      currentPageIndex,
      pageSize: preferences.pageSize ?? 10,
    },
    sorting: {
      sortingColumn,
      sortingDescending,
    },
    filtering: {
      filteringTokens: filteringQuery,
      filteringOperator: filteringQuery.operation,
    },
  });

  return (
    <Table
      resizableColumns
      items={budgetItems}
      columnDefinitions={budgetItemColumnDefinitions}
      selectedItems={selectedBudgetItems}
      selectionType='multi'
      loading={isLoading}
      loadingText='Loading budget items...'
      columnDisplay={preferences.contentDisplay}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      filter={
        <PropertyFilter
          filteringProperties={[]}
          query={filteringQuery}
          onChange={(event) => {
            setFilteringQuery(event.detail);
          }}
        />
      }
      preferences={
        <Preferences
          resource='budget item'
          items={columnDefinitions}
          preferences={preferences}
          setPreferences={(event) => {
            setPreferences(event.detail);
          }}
        />
      }
      pagination={
        <Pagination
          disabled={isLoading}
          currentPageIndex={serverPageIndex}
          pagesCount={pagesCount}
          onChange={(event) => {
            setCurrentPageIndex(event.detail.currentPageIndex);
          }}
        />
      }
      onSelectionChange={(event) => {
        setSelectedBudgetItems(event.detail.selectedItems);
      }}
      onColumnWidthsChange={(event) => {
        saveWidths(event);
      }}
      onSortingChange={({ detail: { sortingColumn: sortingColumnChange, isDescending } }) => {
        setSortingColumn(
          sortingColumnChange.sortingField ?? budgetItemColumnDefinitions[0].id
        );
        setSortingDescending(isDescending ?? false);
      }}
    />
  );
};

export const Component = BudgetItems;
