import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationStore } from '@/stores/use-notification-store';
import { ConfirmDeleteModal } from '../../components/confirm-delete-modal';
import {
  CreateBudgetItemModal,
  type BudgetItemSchema,
} from '../../components/create-budget-modal';
import { BudgetItemsTable } from '../../components/table';
import type { BudgetItem } from '../../types';
import {
  BUDGET_ITEMS_QUERY_KEY,
  useFetchBudgetItemsQuery,
  useCreateBudgetItemMutation,
  useUpdateBudgetItemMutation,
  useDeleteBudgetItemsMutation,
} from './hooks';

const BudgetItems = () => {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showCreateBudgetItemModal, setShowCreateBudgetItemModal] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState<BudgetItem[]>([]);

  const queryClient = useQueryClient();

  const fetchBudgetItemsQuery = useFetchBudgetItemsQuery();
  const createBudgetItemMutation = useCreateBudgetItemMutation();
  const updateBudgetItemMutation = useUpdateBudgetItemMutation();
  const deleteBudgetItemsMutation = useDeleteBudgetItemsMutation();

  const addNotification = useNotificationStore((s) => s.addNotification);

  const invalidateQueries = () => {
    queryClient
      .invalidateQueries({ queryKey: [BUDGET_ITEMS_QUERY_KEY] })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRefreshClick = () => {
    fetchBudgetItemsQuery.refetch().catch((error) => {
      console.error(error);
    });
  };

  const handleSubmitEdit = (budgetItem: BudgetItem) => {
    updateBudgetItemMutation.mutate(budgetItem, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          id: 'notification-budget-item-updated-successfully',
          header: 'Budget item updated successfully',
          dismissible: true,
        });

        invalidateQueries();
      },

      onError: (error) => {
        addNotification({
          type: 'error',
          id: 'notification-budget-item-updated-error',
          header: 'Error updating budget item',
          content: error.message,
          dismissible: true,
        });
      },
    });
  };

  const handleCreateInit = () => {
    setShowCreateBudgetItemModal(true);
  };

  const handleCreateCancel = () => {
    setShowCreateBudgetItemModal(false);
  };

  const handleCreateConfirm = (data: BudgetItemSchema) => {
    createBudgetItemMutation.mutate(data, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          id: 'notification-budget-item-created-successfully',
          header: 'Budget item created successfully',
          dismissible: true,
        });

        setShowCreateBudgetItemModal(false);
        invalidateQueries();
      },

      onError: (error) => {
        addNotification({
          type: 'error',
          id: 'notification-budget-item-created-error',
          header: 'Error creating budget item',
          content: error.message,
          dismissible: true,
        });
      },
    });
  };

  const handleDeleteInit = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    const selectedIds = selectedItems.map((item) => item.id);

    deleteBudgetItemsMutation.mutate(selectedIds, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          id: 'notification-budget-items-deleted-successfully',
          header: 'Budget items deleted successfully',
          dismissible: true,
          autoDismiss: true,
        });

        setShowConfirmDeleteModal(false);
        invalidateQueries();
      },

      onError: (error) => {
        addNotification({
          type: 'error',
          id: 'notification-budget-items-deleted-error',
          header: 'Error deleting budget items',
          content: error.message,
          dismissible: true,
        });
      },

      onSettled: () => {
        setSelectedItems([]);
      },
    });
  };

  return (
    <>
      <BudgetItemsTable
        budgetItems={fetchBudgetItemsQuery.data.budgetItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        loading={
          fetchBudgetItemsQuery.isFetching || fetchBudgetItemsQuery.isRefetching
        }
        onRefreshClick={handleRefreshClick}
        onCreateClick={handleCreateInit}
        onSubmitEdit={handleSubmitEdit}
        onDeleteClick={handleDeleteInit}
      />
      <ConfirmDeleteModal
        resources={selectedItems}
        visible={showConfirmDeleteModal}
        onDismiss={handleDeleteCancel}
        onConfirmDelete={handleDeleteConfirm}
      />
      <CreateBudgetItemModal
        visible={showCreateBudgetItemModal}
        onDismiss={handleCreateCancel}
        onConfirmCreate={handleCreateConfirm}
      />
    </>
  );
};

export const Component = BudgetItems;
