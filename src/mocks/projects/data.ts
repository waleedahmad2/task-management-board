import { Project } from '#/types';

/**
 * Mock project data
 */
export const ProjectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description:
      'A comprehensive e-commerce platform with modern UI/UX design, payment integration, and inventory management.',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    },
    members: [
      {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        role: 'admin',
      },
      {
        id: 'user-3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'editor',
      },
      {
        id: 'user-4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        role: 'viewer',
      },
      {
        id: 'user-5',
        name: 'David Brown',
        email: 'david.brown@example.com',
        role: 'editor',
      },
      {
        id: 'user-6',
        name: 'Lisa Davis',
        email: 'lisa.davis@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        role: 'viewer',
      },
      {
        id: 'user-7',
        name: 'Tom Miller',
        email: 'tom.miller@example.com',
        role: 'viewer',
      },
    ],
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android with real-time features and offline support.',
    status: 'draft',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    owner: {
      id: 'user-8',
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    },
    members: [
      {
        id: 'user-9',
        name: 'Emma Taylor',
        email: 'emma.taylor@example.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
        role: 'admin',
      },
      {
        id: 'user-10',
        name: 'Ryan Garcia',
        email: 'ryan.garcia@example.com',
        role: 'editor',
      },
    ],
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description:
      'Advanced analytics dashboard with interactive charts, real-time data visualization, and custom reporting features.',
    status: 'active',
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    owner: {
      id: 'user-11',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face',
    },
    members: [
      {
        id: 'user-12',
        name: 'Kevin Lee',
        email: 'kevin.lee@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        role: 'admin',
      },
      {
        id: 'user-13',
        name: 'Anna Kim',
        email: 'anna.kim@example.com',
        role: 'editor',
      },
      {
        id: 'user-14',
        name: 'Chris Anderson',
        email: 'chris.anderson@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        role: 'viewer',
      },
    ],
  },
  {
    id: '4',
    name: 'Legacy System Migration',
    description: 'Migration of legacy systems to modern cloud infrastructure with zero downtime deployment strategy.',
    status: 'archived',
    createdAt: '2023-12-20T08:45:00Z',
    updatedAt: '2024-01-15T13:15:00Z',
    owner: {
      id: 'user-15',
      name: 'Robert Wilson',
      email: 'robert.wilson@example.com',
    },
    members: [
      {
        id: 'user-16',
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        role: 'admin',
      },
      {
        id: 'user-17',
        name: 'Daniel Thompson',
        email: 'daniel.thompson@example.com',
        role: 'editor',
      },
    ],
  },
];
