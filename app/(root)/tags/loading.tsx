import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="flex flex-row gap-3">
        <Skeleton className="mt-4 h-10 w-full" />
        <Skeleton className="mt-4 h-10 w-[140px] max-md:hidden" />
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {[...Array(10)].map((_, i) => (
          <article
            key={i}
            className="background-light900_dark200 light-border flex w-[250px] flex-col rounded-2xl border p-8"
          >
            <Skeleton className="h-10 w-16" />

            <div className="mt-4 flex flex-row gap-2">
              <Skeleton className="h-4 w-[30px]" />
              <Skeleton className="h-4 w-[90px]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Loading;
