import { api } from '@/utils/axios';
import type { BudgetItemsResponse, UseBudgetItemsParams } from '../types';

export const fetchBudgetItems = async ({ params }: { params?: UseBudgetItemsParams }) => {
  const response = await api<BudgetItemsResponse>('/finances/budget-items', { params });

  return response.data;
};
