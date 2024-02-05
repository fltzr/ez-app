import { ReusableTable } from '@/components/table';
import { courtreserveEventDefinition, type CourtreserveEvent } from './config';

type CourtreserveEventTableProps = {
  tableStatus?: 'loading' | 'error' | 'finished';
  events?: CourtreserveEvent[];
};

export const CourtreserveEventTable = ({
  tableStatus,
  events,
}: CourtreserveEventTableProps) => (
  <ReusableTable<CourtreserveEvent>
    stickyHeader
    variant="borderless"
    localstorageKeyPrefix="Courtreserve-Events"
    resource="Event"
    columnDefinitions={courtreserveEventDefinition}
    items={events ?? []}
    loading={tableStatus === 'loading'}
    selectionType="multi"
    onSelectionChange={event => {
      console.log(event.detail.selectedItems);
    }}
    onViewClick={(id) => {
      console.log(`Requesting to VIEW courtreserve event #${id}`);
    }}
    onEditClick={(id) => {
      console.log(`Requesting to EDIT courtreserve event #${id}`);
    }}
    onDeleteClick={(ids) => {
      ids.forEach((id) => {
        console.log(`Requesting to DELETE courtreserve event #${id}`);
      })
    }}
    onCreateClick={() => {
            console.log(`Requesting to CREATE courtreserve event`);
    }}
  />
);
