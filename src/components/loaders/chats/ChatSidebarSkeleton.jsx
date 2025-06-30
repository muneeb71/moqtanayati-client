import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChatSidebarSkeleton = () => {
  return (
    <div className="hidden w-full flex-col rounded-[30px] border border-black/10 bg-[#F9F9F9] px-[20px] py-[30px] md:flex">
      <Skeleton height={32} width={180} style={{ margin: '0 auto', marginBottom: 32 }} />
      <div className="flex w-full flex-col gap-6 py-6">
        <div className="flex h-[61px] items-center gap-3 rounded-[8px] bg-white px-4">
          <Skeleton circle height={24} width={24} />
          <Skeleton height={20} width={120} />
        </div>
        <div className="flex w-full flex-col gap-4 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <Skeleton circle height={60} width={60} />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton height={18} width={120} />
                <Skeleton height={14} width={180} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarSkeleton; 