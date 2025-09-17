import { JSX } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { DynamicForm } from '#/components/common/DynamicForm';
import { COMMENT_FORM_FIELDS } from '#/constants';
import { commentFormSchema, CommentFormData } from '#/schemas/commentFormSchema';

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const CommentForm = ({
  onSubmit,
  isLoading = false,
  placeholder = 'Write a comment...',
}: CommentFormProps): JSX.Element => {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  // Use fields from constants and override placeholder if provided
  const fields = [
    {
      ...COMMENT_FORM_FIELDS[0],
      placeholder,
    },
  ];

  const handleSubmit = async (data: CommentFormData): Promise<void> => {
    await onSubmit(data);
    form.reset(); // Reset form after successful submission
  };

  return (
    <div className='border-t pt-4'>
      <DynamicForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        submitLabel=''
        isLoading={isLoading}
        showSubmitButton={false}
      />
      <div className='flex justify-end mt-2'>
        <button
          type='submit'
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isLoading || !form.watch('content')?.trim()}
          className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          <Send className='w-4 h-4' />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
