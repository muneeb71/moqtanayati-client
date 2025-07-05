import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChatWindowSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton circle height={48} width={48} />
        <div className="flex flex-col gap-2">
          <Skeleton height={18} width={120} />
          <Skeleton height={14} width={80} />
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 flex flex-col gap-4 mb-6 overflow-y-auto">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <Skeleton height={32} width={180} borderRadius={16} />
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 mt-auto">
        <Skeleton height={40} width={320} borderRadius={20} />
        <Skeleton height={40} width={40} circle />
      </div>
    </div>
  );
};

export default ChatWindowSkeleton; 