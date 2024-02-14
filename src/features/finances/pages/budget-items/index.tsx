import { useFetchBudgetItemsQuery } from '../../api/budget-items';
import { BudgetItemsTable } from '../../components/table';

const BudgetItems = () => {
  const fetchBudgetItemsQuery = useFetchBudgetItemsQuery();

  const handleRefreshClick = () => {
    fetchBudgetItemsQuery.refetch().catch((error) => {
      console.error('Error refetching budget items:', error);
    });
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleCreateClick = () => {
    console.log('Create budget item');
  };

  // const handleDeleteClick = (ids: string[]) => {

  // };

  return (
    <BudgetItemsTable
      budgetItems={fetchBudgetItemsQuery.data.budgetItems}
      loading={fetchBudgetItemsQuery.isFetching || fetchBudgetItemsQuery.isRefetching}
      onRefreshClick={handleRefreshClick}
      onCreateClick={handleCreateClick}
      //onDeleteClick={handleDeleteClick}
    />
  );
};

export const Component = BudgetItems;
