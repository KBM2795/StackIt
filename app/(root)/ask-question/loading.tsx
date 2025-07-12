import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="flex flex-col gap-5">
        <Skeleton className="mt-4 h-20 w-full" />
        <Skeleton className="mt-4 h-72 w-full" />
        <Skeleton className="mt-4 h-20 w-full" />
      </div>
    </section>
  );
};

export default Loading;
