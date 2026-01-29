import { Version } from '../types/version-history';

/**
 * Mock version data for demo purposes
 */
export const mockVersions: Version[] = [
  {
    id: 'v-mission-5',
    itemType: 'brand-foundation',
    itemId: 'brand-foundation-1',
    sectionId: 'mission',
    versionNumber: 5,
    content: {
      text: 'At Brandshift, we empower brands to discover their authentic voice and create meaningful connections with their audiences through AI-powered insights and strategic brand building.',
    },
    createdAt: new Date('2026-01-28T14:32:00'),
    createdBy: {
      id: 'user-1',
      name: 'Erik van der Meer',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    changeNote: 'Updated mission to reflect AI focus',
  },
  {
    id: 'v-mission-4',
    itemType: 'brand-foundation',
    itemId: 'brand-foundation-1',
    sectionId: 'mission',
    versionNumber: 4,
    content: {
      text: 'At Brandshift, we empower brands to discover their authentic voice and create meaningful connections with their audiences through sustainable brand strategies.',
    },
    createdAt: new Date('2026-01-25T09:15:00'),
    createdBy: {
      id: 'user-1',
      name: 'Erik van der Meer',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    changeNote: 'Refined value proposition section',
  },
  {
    id: 'v-mission-3',
    itemType: 'brand-foundation',
    itemId: 'brand-foundation-1',
    sectionId: 'mission',
    versionNumber: 3,
    content: {
      text: 'At Brandshift, we empower brands to discover their authentic voice and create meaningful connections with their audiences through data-driven insights and sustainable brand strategies.',
    },
    createdAt: new Date('2026-01-22T16:48:00'),
    createdBy: {
      id: 'user-2',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    changeNote: 'Added sustainability commitment',
  },
  {
    id: 'v-mission-2',
    itemType: 'brand-foundation',
    itemId: 'brand-foundation-1',
    sectionId: 'mission',
    versionNumber: 2,
    content: {
      text: 'At Brandshift, we empower brands to discover their authentic voice and create meaningful connections with their audiences.',
    },
    createdAt: new Date('2026-01-18T11:20:00'),
    createdBy: {
      id: 'user-1',
      name: 'Erik van der Meer',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    changeNote: 'Initial mission statement draft',
  },
  {
    id: 'v-mission-1',
    itemType: 'brand-foundation',
    itemId: 'brand-foundation-1',
    sectionId: 'mission',
    versionNumber: 1,
    content: {
      text: 'We help brands find their voice.',
    },
    createdAt: new Date('2026-01-15T10:00:00'),
    createdBy: {
      id: 'user-1',
      name: 'Erik van der Meer',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    changeNote: 'Created brand foundation',
  },
];
