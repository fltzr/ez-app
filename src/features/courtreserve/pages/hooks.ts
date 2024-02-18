import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/axios';
import type { CourtreserveEvent } from '../components/courtreserve-events-table/config';

export const COURTRESERVE_QUERY_KEY = 'courtreserve-events';
export const COURTRESERVE_EVENTS_API_URL = '/courtreserve/events';

export type CourtreserveEventResponse = {
  Data: CourtreserveEvent[];
  Total: number;
  AggregateResults: unknown[];
  Errors: unknown;
};

export const useFetchCourtreserveEventsQuery = () =>
  useQuery({
    queryKey: [COURTRESERVE_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get<CourtreserveEventResponse>(
        COURTRESERVE_EVENTS_API_URL
      );

      return response.data;
    },
    initialData: {
      Data: [],
      Total: 0,
      AggregateResults: [],
      Errors: [],
    } as CourtreserveEventResponse,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
