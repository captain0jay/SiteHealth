"use client"
import React from 'react'

import { Work_Sans } from 'next/font/google'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300'],
});

interface RowItemBoxProps {
  label: string;
  count: number;
  icon: React.ReactNode;
  slug?: string;
}

export default function RowItemBox({ label , count, icon, slug }:RowItemBoxProps ) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/programs/${slug?.toLowerCase()}`);
  }

  return (
    <div className={workSans.className} onClick={handleClick}>
      <div className="group w-full h-16 flex items-center text-xl font-medium border border-gray-200 px-4 hover:underline">
        <div className="flex items-center">
          <div className="pr-4">
            {icon}
          </div>
          {label}
          <div className="bg-lime-300 ml-2 px-1 transform rotate-1">{count}%</div>
        </div>
        <div className="ml-auto h-full flex items-center pr-4">
          <ArrowRight
            width={30}
            height={30}
            className="transform transition-transform duration-300 group-hover:-rotate-45"
          />
        </div>
      </div>
    </div>
  )
}
