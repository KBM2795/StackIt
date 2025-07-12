'use client';
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeProvider';
import { themes } from '@/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === 'dark' ? (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="Dark Mode"
            />
          ) : (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="Light Mode"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item, index) => (
            <MenubarItem
              key={index}
              className="flex items-center gap-4 px-2.5 py-2 hover:bg-light-900 focus:bg-gray-200 dark:hover:bg-dark-200 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);

                if (item.value !== 'system') {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem('theme');
                }
              }}
            >
              <Image src={item.icon} width={20} height={20} alt={item.value} />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? 'text-primary-500'
                    : 'text-dark100_light900'
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
