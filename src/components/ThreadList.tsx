// ThreadList.tsx
import { Thread } from "@/lib/types";
import ThreadCard from "./ThreadCard";
import Skeleton from "react-loading-skeleton";

interface ThreadListProps {
  threads: Thread[];
  threadsLoading: boolean;
  selectedThread: Thread | null;
  handleThreadSelect: (thread: Thread) => void;
  isAdmin: boolean;
  handleDeleteThread: (threadId: number) => void;
  handleUpdateThread: (threadId: number, newTitle: string) => void;
}

const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  threadsLoading,
  selectedThread,
  handleThreadSelect,
  isAdmin,
  handleDeleteThread,
  handleUpdateThread
}) => {
  return (
    <ul className="mb-4 space-y-2">
      {threadsLoading ? (
        Array(5)
          .fill(0)
          .map((_, index) => (
            <li
              key={`skeleton-${index}`}
              className="relative px-4 py-6 md:py-4 rounded border border-dark-slate-600 bg-dark-slate-900"
            >
              <Skeleton height={24} baseColor="#737373" highlightColor="#454545" duration={2} />
            </li>
          ))
      ) : (
        <>
          {threads.map(thread => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              isSelected={selectedThread?.id === thread.id}
              onSelect={handleThreadSelect}
              isAdmin={isAdmin}
              onDelete={handleDeleteThread}
              onUpdate={handleUpdateThread}
            />
          ))}
        </>
      )}
    </ul>
  );
};

export default ThreadList;
