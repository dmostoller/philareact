// ThreadForm.tsx
import { FormEvent, useState } from 'react';
import PrimaryButton from './PrimaryButton';

interface ThreadFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  initialDescription?: string;
  placeholder?: string;
}

const ThreadForm = ({
  onSubmit,
  onCancel,
  initialValue = '',
  initialDescription = '',
  placeholder = 'New channel title',
}: ThreadFormProps) => {
  const [title, setTitle] = useState(initialValue);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="w-full px-2 md:px-0">
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dark-slate-600 rounded-md flex flex-col">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder={placeholder}
            className="flex-1 p-2 md:p-2 bg-dark-slate-950 focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Channel description"
            className="flex-1 p-2 md:p-2 bg-dark-slate-950 focus:outline-none border-t-2 border-dark-slate-600"
          />
        </div>

        <div className="flex gap-2 mt-2">
          {initialValue ? (
            <>
              <PrimaryButton onClick={onCancel} type="button" className="w-full py-2">
                Cancel
              </PrimaryButton>
              <PrimaryButton type="submit" className="w-full py-2">
                Update
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton type="submit" className="w-full py-2">
              Submit
            </PrimaryButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default ThreadForm;
