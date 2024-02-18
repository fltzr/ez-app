import { useState } from 'react';
import { CourtreserveEventTable } from '../components/courtreserve-events-table';
import type { CourtreserveEvent } from '../components/courtreserve-events-table/config';
import { useFetchCourtreserveEventsQuery } from './hooks';

export const CourtreserveEventsPage = () => {
  const [selectedItems, setSelectedItems] = useState<CourtreserveEvent[]>([]);
  const fetchCourtreserveEvents = useFetchCourtreserveEventsQuery();

  const handleRefreshClick = () => {
    fetchCourtreserveEvents.refetch().catch((error) => {
      console.error(error);
    });
  };

  return (
    <CourtreserveEventTable
      events={fetchCourtreserveEvents.data.Data}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      loading={
        fetchCourtreserveEvents.isFetching ||
        fetchCourtreserveEvents.isRefetching
      }
      onRefreshClick={handleRefreshClick}
    />
  );
};

export const Component = CourtreserveEventsPage;
