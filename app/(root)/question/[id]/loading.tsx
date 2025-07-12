import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
        <div className="flex flex-row gap-1">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      <Skeleton className="mt-7 h-12 w-full" />
      <div className="mt-5 flex flex-row gap-1">
        <Skeleton className="h-10 w-[90px]" />
        <Skeleton className="h-10 w-[90px]" />
        <Skeleton className="h-10 w-[90px]" />
      </div>
      <Skeleton className="mt-7 h-64 w-full" />
    </section>
  );
};

export default Loading;
