import { lazy, useState } from 'react';
import { z } from 'zod';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormInput } from '@/components/form/form-input';
import { GenericForm } from '@/components/form/generic-form';

const LazyModal = lazy(() => import('@cloudscape-design/components/modal'));

const budgetItemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.string(),
  description: z.string(),
});

export type BudgetItemSchema = z.infer<typeof budgetItemSchema>;

type CreateBudgetItemModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirmCreate: (data: BudgetItemSchema) => void;
};

export const CreateBudgetItemModal = ({
  visible,
  onDismiss,
  onConfirmCreate,
}: CreateBudgetItemModalProps) => {
  const [formKey, setFormKey] = useState(0);

  const resetForm = () => {
    setFormKey((prev) => prev + 1);
  };

  const handleCreateBudgetItem = (data: BudgetItemSchema) => {
    onConfirmCreate(data);
    resetForm();
  };

  const handleOnDismiss = () => {
    onDismiss();
    resetForm();
  };

  return (
    <LazyModal
      visible={visible}
      footer={
        <SpaceBetween direction='horizontal' size='xs'>
          <Button variant='normal' onClick={handleOnDismiss}>
            Cancel
          </Button>
          <Button
            form='create-budget-item-form'
            formAction='submit'
            variant='primary'>
            Create
          </Button>
        </SpaceBetween>
      }
      onDismiss={handleOnDismiss}>
      <GenericForm
        key={formKey}
        schema={budgetItemSchema}
        formId='create-budget-item-form'
        onSubmit={handleCreateBudgetItem}>
        <FormInput<BudgetItemSchema>
          name='name'
          label='Name'
          placeholder='Enter the name of the budget item'
        />
        <FormInput<BudgetItemSchema>
          type='number'
          inputMode='numeric'
          label='Amount'
          name='amount'
          placeholder='Enter the amount of the budget item'
        />
        <FormInput<BudgetItemSchema>
          label='Category'
          name='category'
          placeholder='Enter the category of the budget item'
        />
        <FormInput<BudgetItemSchema>
          label='Date'
          name='date'
          placeholder='Enter the date of the budget item'
        />
        <FormInput<BudgetItemSchema>
          label='Description'
          name='description'
          placeholder='Enter the description of the budget item'
        />
      </GenericForm>
    </LazyModal>
  );
};
