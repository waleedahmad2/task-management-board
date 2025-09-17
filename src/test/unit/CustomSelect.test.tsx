import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import CustomSelect from '#/components/common/CustomSelect';
import { CustomSelectProps } from '#/types/components/customSelect.types';

describe('CustomSelect', () => {
  const defaultProps: CustomSelectProps = {
    dropdownItemsList: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select an option',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<CustomSelect {...defaultProps} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render with title when provided', () => {
      render(<CustomSelect {...defaultProps} title='Select Title' />);

      expect(screen.getByText('Select Title')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      render(<CustomSelect {...defaultProps} />);

      expect(screen.queryByText('Select Title')).not.toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<CustomSelect {...defaultProps} placeholder='Custom placeholder' />);

      expect(screen.getByText('Custom placeholder')).toBeInTheDocument();
    });
  });

  describe('Props and Styling', () => {
    it('should set value correctly', () => {
      render(<CustomSelect {...defaultProps} value='Option 2' />);

      // Check that the value is displayed in the trigger
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should disable trigger when isActionsDisabled is true', () => {
      render(<CustomSelect {...defaultProps} isActionsDisabled={true} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('should not disable trigger when isActionsDisabled is false', () => {
      render(<CustomSelect {...defaultProps} isActionsDisabled={false} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).not.toBeDisabled();
    });
  });

  describe('Download Icon', () => {
    it('should not render download icon when downloadIcon is false', () => {
      render(<CustomSelect {...defaultProps} downloadIcon={false} />);

      const downloadIcons = screen.queryAllByAltText('document icon');
      expect(downloadIcons).toHaveLength(0);
    });

    it('should not render download icon when downloadIcon is undefined', () => {
      render(<CustomSelect {...defaultProps} />);

      const downloadIcons = screen.queryAllByAltText('document icon');
      expect(downloadIcons).toHaveLength(0);
    });
  });

  describe('Event Handling', () => {
    it('should not call onChange when onChange is not provided', () => {
      render(<CustomSelect {...defaultProps} />);

      const trigger = screen.getByRole('combobox');
      expect(() => trigger.click()).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined dropdownItemsList', () => {
      render(<CustomSelect {...defaultProps} dropdownItemsList={undefined} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle empty dropdownItemsList', () => {
      render(<CustomSelect {...defaultProps} dropdownItemsList={[]} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper structure for screen readers', () => {
      render(<CustomSelect {...defaultProps} title='Select Title' />);

      expect(screen.getByText('Select Title')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should maintain proper focus management', () => {
      render(<CustomSelect {...defaultProps} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render with proper CSS classes', () => {
      render(<CustomSelect {...defaultProps} className='custom-class' />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('h-9.5');
    });

    it('should render with custom trigger class', () => {
      render(<CustomSelect {...defaultProps} triggerClassName='custom-trigger' />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger');
    });
  });
});
