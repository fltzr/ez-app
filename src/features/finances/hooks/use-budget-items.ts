import { useQuery } from '@tanstack/react-query';
import { fetchBudgetItems } from '../api/budget-items';
import type { BudgetItemsResponse, UseBudgetItemsParams } from '../types';

export const useBudgetItems = (params: UseBudgetItemsParams) => {
  const queryKey = ['budgetItems', params];
  const { currentPageIndex } = params.pagination;

  return useQuery({
    queryKey,
    queryFn: () => fetchBudgetItems({}),
    initialData: {
      budgetItems: [{}],
      pagesCount: 0,
      currentPageIndex,
      totalCount: 0,
    } as BudgetItemsResponse,
  });
};
