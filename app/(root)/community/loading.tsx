import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="flex flex-row gap-3">
        <Skeleton className="mt-4 h-10 w-full" />
        <Skeleton className="mt-4 h-10 w-[140px] max-md:hidden" />
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {[...Array(10)].map((_, i) => (
          <article
            key={i}
            className="background-light900_dark200 light-border flex w-[250px] flex-col items-center justify-center rounded-2xl border p-8"
          >
            <Skeleton className="h-[100px] w-[100px] rounded-full" />

            <div className="mt-4 flex flex-col justify-center gap-2">
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[150px]" />
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-[50px]" />
                <Skeleton className="h-6 w-[50px]" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Loading;
