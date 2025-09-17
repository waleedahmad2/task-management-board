import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Projects from '#/components/projects/Projects';
import { AuthProvider } from '#/context/AuthContext';
import { useProjects } from '#/hooks/projects/useProjects';

// Mock the actual hook used by the component
vi.mock('#/hooks/projects/useProjects', () => ({
  useProjects: vi.fn(),
}));

// Mock ProjectStatusColumns component
vi.mock('#/components/projects/ProjectStatusColumns', () => ({
  default: ({ onProjectClick }: { onProjectClick: (project: { id: string; name: string }) => void }) => (
    <div data-testid='project-status-columns'>
      <div>Active</div>
      <div>Archived</div>
      <div>Draft</div>
      <div onClick={() => onProjectClick({ id: '1', name: 'Project 1' })}>Project 1</div>
      <div onClick={() => onProjectClick({ id: '2', name: 'Project 2' })}>Project 2</div>
      <div onClick={() => onProjectClick({ id: '3', name: 'Project 3' })}>Project 3</div>
    </div>
  ),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUseProjects = vi.mocked(useProjects);

const mockProjects = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description 1',
    status: 'active' as const,
    owner: { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    members: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Description 2',
    status: 'archived' as const,
    owner: { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    members: [],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Project 3',
    description: 'Description 3',
    status: 'draft' as const,
    owner: { id: 'user3', name: 'Bob Johnson', email: 'bob@example.com', role: 'member' },
    members: [],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

const defaultUseProjectsReturn = {
  projects: mockProjects,
  totalItems: 3,
  isLoading: false,
  error: null,
  fetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  refetch: vi.fn(),
  search: '',
  handleSearchChange: vi.fn(),
  handleScroll: vi.fn(),
};

describe('Projects Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseProjects.mockReturnValue(defaultUseProjectsReturn);
  });

  const renderProjects = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Projects />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  describe('Basic Rendering', () => {
    it('should render projects component with header and table by default', () => {
      renderProjects();

      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search projects')).toBeInTheDocument();
    });

    it('should display project data in table view', () => {
      renderProjects();

      // Check for project names in the table
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
      expect(screen.getByText('Project 3')).toBeInTheDocument();
    });

    it('should show view toggle buttons', () => {
      renderProjects();

      expect(screen.getByRole('button', { name: /table view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /card view/i })).toBeInTheDocument();
    });
  });

  describe('View Switching', () => {
    it('should switch to card view when card button is clicked', async () => {
      renderProjects();

      const cardButton = screen.getByRole('button', { name: /card view/i });
      fireEvent.click(cardButton);

      await waitFor(() => {
        // Table should not be visible in card view
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
        // Kanban columns should be visible
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Archived')).toBeInTheDocument();
        expect(screen.getByText('Draft')).toBeInTheDocument();
      });
    });

    it('should switch back to table view when table button is clicked', async () => {
      renderProjects();

      // Switch to card first
      const cardButton = screen.getByRole('button', { name: /card view/i });
      fireEvent.click(cardButton);

      await waitFor(() => {
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
      });

      // Switch back to table
      const tableButton = screen.getByRole('button', { name: /table view/i });
      fireEvent.click(tableButton);

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.queryByText('Active')).not.toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('should have search input field', () => {
      renderProjects();

      const searchInput = screen.getByPlaceholderText('Search projects');
      expect(searchInput).toBeInTheDocument();
    });

    it('should call handleSearchChange when search input changes', async () => {
      const mockHandleSearchChange = vi.fn();
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        handleSearchChange: mockHandleSearchChange,
      });

      renderProjects();

      const searchInput = screen.getByPlaceholderText('Search projects');
      fireEvent.change(searchInput, { target: { value: 'test search' } });

      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue('test search');

      // Wait for debounced search to complete
      await waitFor(
        () => {
          expect(mockHandleSearchChange).toHaveBeenCalledWith('test search');
        },
        { timeout: 1000 }
      );
    });

    it('should filter projects based on search query', () => {
      const filteredProjects = [mockProjects[0]]; // Only Project 1
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        projects: filteredProjects,
        search: 'Project 1',
      });

      renderProjects();

      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Project 3')).not.toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should show empty state when no projects', () => {
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        projects: [],
        totalItems: 0,
      });

      renderProjects();

      // Should show empty state message
      expect(screen.getByText('No data available')).toBeInTheDocument();
      expect(screen.getByText('No projects found. Create your first project to get started.')).toBeInTheDocument();
      expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('should show loading state when fetching projects', () => {
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        isLoading: true,
      });

      renderProjects();

      // Should show skeleton loading
      expect(screen.getByText('Projects')).toBeInTheDocument();
      // Table skeleton should be visible (it renders as a table)
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should show infinite scroll loading when fetching next page', () => {
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        isFetchingNextPage: true,
      });

      renderProjects();

      expect(screen.getByText('Loading more projects...')).toBeInTheDocument();
    });
  });

  describe('Project Interaction', () => {
    it('should navigate to project board when project is clicked in table view', () => {
      renderProjects();

      const project1 = screen.getByText('Project 1');
      fireEvent.click(project1);

      expect(mockNavigate).toHaveBeenCalledWith('/projects/1/board');
    });

    it('should navigate to project board when project is clicked in card view', async () => {
      renderProjects();

      // Switch to card view
      const cardButton = screen.getByRole('button', { name: /card view/i });
      fireEvent.click(cardButton);

      await waitFor(() => {
        const project1 = screen.getByText('Project 1');
        fireEvent.click(project1);

        expect(mockNavigate).toHaveBeenCalledWith('/projects/1/board');
      });
    });

    it('should handle scroll events for infinite loading', () => {
      const mockHandleScroll = vi.fn();
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        handleScroll: mockHandleScroll,
      });

      renderProjects();

      // Find the scrollable container (the div with overflow-auto class)
      const scrollContainer = document.querySelector('.overflow-auto');
      fireEvent.scroll(scrollContainer!);

      expect(mockHandleScroll).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when there is an error', () => {
      const errorMessage = 'Failed to load projects';
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        error: new Error(errorMessage),
      });

      renderProjects();

      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('should handle empty projects array gracefully', () => {
      mockUseProjects.mockReturnValue({
        ...defaultUseProjectsReturn,
        projects: [],
      });

      expect(() => renderProjects()).not.toThrow();
      // Should show empty state when no projects
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      renderProjects();

      expect(screen.getByRole('button', { name: /table view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /card view/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      renderProjects();

      expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    });
  });

  describe('Status Column View', () => {
    it('should display projects grouped by status in card view', async () => {
      renderProjects();

      // Switch to card view
      const cardButton = screen.getByRole('button', { name: /card view/i });
      fireEvent.click(cardButton);

      await waitFor(() => {
        // Check that status columns are displayed
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Archived')).toBeInTheDocument();
        expect(screen.getByText('Draft')).toBeInTheDocument();

        // Check that projects are displayed
        expect(screen.getByText('Project 1')).toBeInTheDocument();
        expect(screen.getByText('Project 2')).toBeInTheDocument();
        expect(screen.getByText('Project 3')).toBeInTheDocument();
      });
    });
  });
});
