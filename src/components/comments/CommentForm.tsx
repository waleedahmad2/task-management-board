import { JSX } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { DynamicForm } from '#/components/common/';
import { Button } from '#/components/ui/button';
import { COMMENT_FORM_FIELDS } from '#/constants';
import { commentFormSchema, CommentFormData } from '#/schemas';
import type { DynamicFormField } from '#/types/forms';

interface CommentFormProps {
  onSubmit: (data: { content: string }) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const CommentForm = ({ onSubmit, isLoading = false }: CommentFormProps): JSX.Element => {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = async (data: CommentFormData): Promise<void> => {
    await onSubmit({ content: data.content });
    form.reset();
  };

  const handleButtonClick = (): void => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <div className='border-t pt-4'>
      <DynamicForm
        fields={COMMENT_FORM_FIELDS as DynamicFormField<{ content: string }>[]}
        form={form}
        onSubmit={handleSubmit}
        submitLabel=''
        isLoading={isLoading}
        showSubmitButton={false}
      />
      <div className='flex justify-end mt-2'>
        <Button
          type='button'
          onClick={handleButtonClick}
          disabled={isLoading || !form.watch('content')?.trim()}
          className='flex items-center space-x-2'
        >
          <Send className='w-4 h-4' />
          <span>Comment</span>
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
