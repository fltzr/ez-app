import { ReusableTable } from "@/components/table";
import { courtreserveEventDefinition, type CourtreserveEvent } from "./config";

type CourtreserveEventTableProps = {
  loading?: boolean;
  events?: CourtreserveEvent[];
  onRefreshClick?: () => void;
  onInfoClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (ids: string[]) => void;
  onCreateClick?: () => void;
};

export const CourtreserveEventTable = ({
  loading,
  events,
  onRefreshClick,
  onInfoClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onCreateClick,
}: CourtreserveEventTableProps) => (
  <ReusableTable<CourtreserveEvent>
    stickyHeader
    variant="borderless"
    localstorageKeyPrefix="Courtreserve-Events"
    resource="Event"
    columnDefinitions={courtreserveEventDefinition}
    items={events ?? []}
    loading={loading}
    selectionType="multi"
    onInfoClick={onInfoClick}
    onViewClick={onViewClick}
    onEditClick={onEditClick}
    onDeleteClick={onDeleteClick}
    onCreateClick={onCreateClick}
    onRefreshClick={onRefreshClick}
  />
);
