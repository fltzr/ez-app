import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/axios';
import { CourtreserveEventTable } from '../components/courtreserve-events-table';
import type { CourtreserveEvent } from '../components/courtreserve-events-table/config';

export type CourtreserveEventResponse = {
  Data: CourtreserveEvent[];
  Total: number;
  AggregateResults: unknown[];
  Errors: unknown;
};

const fetchEvents = async () => {
  const response = await api.get<CourtreserveEventResponse>(
    'http://localhost:3000/courtreserve/events'
  );

  return response.data.Data;
};

export const CourtreserveEventsPage = () => {
  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['fetch-events'],
    queryFn: fetchEvents,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <CourtreserveEventTable
      events={events}
      tableStatus={isPending ? 'loading' : 'finished'}
    />
  );
};

export const Component = CourtreserveEventsPage;
