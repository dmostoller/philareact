// ThreadCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Thread } from '@/lib/types';
import { DeleteIcon, EditIcon } from './icons';
import ThreadForm from './ThreadForm';

interface ThreadCardProps {
  thread: Thread;
  isSelected: boolean;
  onSelect: (thread: Thread) => void;
  isAdmin: boolean;
  onDelete: (threadId: number) => void;
  onUpdate: (threadId: number, newName: string, newDescription: string) => void;
}

const ThreadCard: React.FC<ThreadCardProps> = (props) => {
  const { thread, isSelected, onSelect, isAdmin, onDelete, onUpdate } = props;
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isSelected]);

  const handleClick = () => {
    if (!isEditing) {
      onSelect(thread);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(thread.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleUpdate = (newTitle: string, newDescription?: string) => {
    onUpdate(thread.id, newTitle, newDescription || '');
    setIsEditing(false);
  };

  return (
    <li
      ref={ref}
      className={`flex-shrink-0 md:w-full relative mb-0 md:mb-2 cursor-pointer px-4 py-6 md:py-4 font-semibold rounded border
        ${isSelected ? 'bg-dark-slate-600 border-dark-slate-500' : 'bg-dark-slate-900 border-dark-slate-600'}
      `}
      onClick={handleClick}
    >
      {isEditing ? (
        <ThreadForm
          onSubmit={handleUpdate}
          initialValue={thread.title}
          onCancel={() => setIsEditing(false)}
          initialDescription={thread.description}
          placeholder="Edit thread title"
        />
      ) : (
        <>
          <div className="truncate pr-10">{thread.title}</div>
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="absolute right-10 top-1/2 -translate-y-2/3 size-9 text-dark-slate-400 hover:text-dark-slate-300"
              >
                <EditIcon />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="absolute right-2 top-1/2 -translate-y-2/3 size-9 text-dark-slate-400 hover:text-dark-slate-300"
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default ThreadCard;
