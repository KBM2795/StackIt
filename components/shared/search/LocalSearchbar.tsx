'use client';

import { Input } from '@/components/ui/input';
import { formURLQuery, removeKeysFromURLQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || '');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formURLQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });
        router.push(newURL, { scroll: false });
      } else {
        if (pathname === route) {
          const newURL = removeKeysFromURLQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, route, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 dark:text-white ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular text-dark400_light700 no-focus placeholder border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
