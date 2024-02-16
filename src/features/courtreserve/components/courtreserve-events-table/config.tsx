/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import type { TableColumnDefinition } from '@/common/utils/table-utils';

export type CourtreserveEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  reservationId: number;
  number: string;
  uqId: string;
  eventType: CourtreserveEventType;
  eventName: string;
  eventId: number;
  maxMembersOnEvent: number;
  signedMembers: number;
  isFull: boolean;
  allowWaitList: boolean;
  isMemberOnWaitList: boolean;
  isMemberRegistered: boolean;
  canSignUp: boolean;
  isRegistrationOpen: boolean;
  timeDisplay: string;
};

export enum CourtreserveEventType {
  PickleballClinic = 'Pickleball Clinic',
  PickleballDropIn = 'Pickleball Drop-In',
  PickleballLeagueAdult = 'Pickleball League (Adult)',
  PickleballSocial = 'Pickleball  Social',
  PlayWithTheProPBDropIn = 'Play with the Pro: PB Drop-In',
  TennisAdultSocial = 'Tennis Adult Social',
}

export const courtreserveEventDefinition: TableColumnDefinition<CourtreserveEvent>[] =
  [
    {
      id: 'id',
      sortingField: 'id',
      header: 'ID',
      cell: (item) => item.id,
      width: 260,
    },
    {
      id: 'title',
      sortingField: 'title',
      header: 'Title',
      cell: (item) => item.title,
      width: 120,
    },
    {
      id: 'start',
      sortingField: 'start',
      header: 'Start',
      cell: (item) => item.start,
      width: 120,
      isDateTime: true,
    },
    {
      id: 'end',
      sortingField: 'end',
      header: 'End',
      cell: (item) => item.end,
      width: 120,
      isDateTime: true,
    },
    {
      id: 'reservationId',
      sortingField: 'reservationId',
      header: 'Reservation ID',
      cell: (item) => item.reservationId,
      width: 120,
    },
    {
      id: 'number',
      sortingField: 'number',
      header: 'Number',
      cell: (item) => item.number,
      width: 120,
    },
    {
      id: 'eventType',
      sortingField: 'eventType',
      header: 'Event Type',
      cell: (item) => item.eventType,
      width: 120,
    },
    {
      id: 'eventName',
      sortingField: 'eventName',
      header: 'Event Name',
      cell: (item) => item.eventName,
      width: 120,
    },
    {
      id: 'maxMembersOnEvent',
      sortingField: 'maxMembersOnEvent',
      header: 'Max',
      cell: (item) => item.maxMembersOnEvent,
      width: 120,
    },
    {
      id: 'signedMembers',
      sortingField: 'signedMembers',
      header: 'Registered',
      cell: (item) => item.signedMembers,
      width: 120,
    },
    {
      id: 'isFull',
      sortingField: 'isFull',
      header: 'Is Full?',
      cell: (item) => (item.isFull ? 'Yes' : 'No'),
      width: 120,
    },
    {
      id: 'isMemberOnWaitList',
      sortingField: 'isMemberOnWaitList',
      header: 'On Wait List?',
      cell: (item) => (item.isMemberOnWaitList ? 'Yes' : 'No'),
      width: 120,
    },
    {
      id: 'isMemberRegistered',
      sortingField: 'isMemberRegistered',
      header: 'Registered?',
      cell: (item) => (item.isMemberRegistered ? 'Yes' : 'No'),
      width: 120,
    },
  ];
