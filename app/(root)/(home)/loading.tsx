import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

import React from 'react';

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <Skeleton className="mt-4 h-10 w-full" />
      <div className="flex flex-row gap-3 max-md:hidden">
        <Skeleton className="mt-4 h-10 w-[100px]" />
        <Skeleton className="mt-4 h-10 w-[100px]" />
        <Skeleton className="mt-4 h-10 w-[100px]" />
        <Skeleton className="mt-4 h-10 w-[100px]" />
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
