import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
    {Array(6).fill(null).map((_, index) => (
      <div key={index} className="bg-white p-6 shadow-md rounded-lg">
        <div className="flex space-x-4 mb-4">
          <Skeleton circle={true} height={40} width={40} />
          <Skeleton height={20} width={`80%`} />
        </div>
        <Skeleton height={20} width={`60%`} className="mb-4" />
        <Skeleton count={3} />
        <Skeleton height={20} width={`40%`} className="mt-4" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;