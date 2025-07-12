import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="flex flex-row gap-3">
        <Skeleton className="mt-4 h-10 w-full" />
        <Skeleton className="mt-4 h-10 w-[140px] max-md:hidden" />
      </div>
      <div className="flex flex-col">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="mt-4 h-40 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
