import { ReusableTable } from '@/common/components/table';
import { courtreserveEventDefinition, type CourtreserveEvent } from './config';

type CourtreserveEventTableProps = {
  tableStatus?: 'loading' | 'error' | 'finished';
  events?: CourtreserveEvent[];
};

export const CourtreserveEventTable = ({
  tableStatus,
  events,
}: CourtreserveEventTableProps) => (
  <ReusableTable
    variant="container"
    localstorageKeyPrefix="Courtreserve-Events"
    resource="Event"
    columnDefinitions={courtreserveEventDefinition}
    items={events ?? []}
    loading={tableStatus === 'loading'}
    selectionType="multi"
  />
);
