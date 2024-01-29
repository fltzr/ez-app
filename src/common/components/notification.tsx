import Flashbar from '@cloudscape-design/components/flashbar';
import { useLayoutStore } from '@/common/stores/use-layout-store';

export const Notification = () => {
  const notifications = useLayoutStore(state => state.notifications);
  const removeNotification = useLayoutStore(state => state.removeNotification);

  const handleDismiss = (id: string) => {
    removeNotification(id);
  };

  return (
    <Flashbar
      stackItems
      items={notifications.map(notification => ({
        ...notification,
        onDismiss: () => {
          handleDismiss(notification.id ?? '');
        },
      }))}
    />
  );
};
