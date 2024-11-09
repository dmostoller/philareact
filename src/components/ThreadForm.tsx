// ThreadForm.tsx
import { useRef } from "react";
import { CircleCheckIcon } from "./icons/circle-check";

interface ThreadFormProps {
  onSubmit: (title: string) => void;
  initialValue?: string;
  placeholder?: string;
}

const ThreadForm = ({ onSubmit, initialValue = "", placeholder = "New thread title" }: ThreadFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim()) {
      onSubmit(inputRef.current.value.trim());
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full px-2 md:px-0">
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dark-slate-600 rounded-md flex">
          <input
            ref={inputRef}
            type="text"
            defaultValue={initialValue}
            placeholder={placeholder}
            className="flex-1 p-2 md:p-2 bg-dark-slate-950 focus:outline-none"
            onKeyDown={e => {
              if (e.key === "Enter" && inputRef.current && inputRef.current.value.trim()) {
                e.preventDefault();
                const form = e.currentTarget.closest("form");
                if (form) {
                  form.requestSubmit();
                }
              }
            }}
          />
          <button
            type="submit"
            className="text-dark-slate-400 bg-dark-slate-950 hover:bg-dark-slate-800 transition-colors"
          >
            <CircleCheckIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThreadForm;
