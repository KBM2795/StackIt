import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className="flex flex-row gap-2">
        <Skeleton className="h-[140px] w-[140px] rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="mt-3 h-6 w-[100px]" />
          <Skeleton className="mt-2 h-4 w-[100px]" />
          <div className="flex flex-row gap-2">
            <Skeleton className="mt-2 h-4 w-[100px]" />
            <Skeleton className="mt-2 h-4 w-[100px]" />
          </div>
          <Skeleton className="mt-2 h-4 w-[100px]" />
          <Skeleton className="mt-5 h-4 w-[100px]" />
        </div>
      </div>
      <Skeleton className="mt-6 h-8 w-[100px]" />
      <div className="mt-3 flex w-full flex-row flex-wrap justify-evenly gap-2">
        <Skeleton className="h-32 w-[130px]" />
        <Skeleton className="h-32 w-[130px]" />
        <Skeleton className="h-32 w-[130px]" />
        <Skeleton className="h-32 w-[130px]" />
      </div>
    </section>
  );
};

export default Loading;
