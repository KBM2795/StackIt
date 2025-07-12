import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTag from './RenderTag';
import { getHotQuestions } from '@/lib/actions/question.action';
import { getPopularTags } from '@/lib/actions/tags.action';

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-6 flex flex-col gap-5">
          {hotQuestions.map((question) => {
            return (
              <Link
                key={question._id}
                href={`/question/${question._id}`}
                className="flex items-center justify-between gap-7 hover:cursor-pointer"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-14">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-6 flex flex-col gap-5">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
