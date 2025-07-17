"use client"
import React from 'react'

import { Work_Sans } from 'next/font/google'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300'],
});


interface RowItemBoxProps {
  route: string;
  screen?: string;
  title?: string;
  description?: string;
  loadTime?: number;
  fcp?: number;
  lcp?: number;
  cls?: number;
  networkType?: string;
  images?: { src: string; width: number; height: number; alt: string }[];
  totalImages?: number;
  visibleElements?: number;
  totalElements?: number;
  wordCount?: number;
  headings?: Record<string, number>;
  externalLinks?: number;
  internalLinks?: number;
  fontCount?: number;
  scriptCount?: number;
  score?: number;
  status?: 'pending' | 'success';
};

export default function RowItemBox(props: RowItemBoxProps) {
  const rawSrc = props?.images?.[0]?.src;
  const isOptimizedImage = rawSrc?.includes('/_next/image');

  return (
    <div className={workSans.className}>
      <div className="group w-full h-16 flex items-center text-xl font-medium border border-gray-200 px-4 hover:underline">
        <div className="flex items-center">
          <div className="pr-4">
            <Image
              src={isOptimizedImage ? '/page.svg' : rawSrc || '/page.svg'}
              alt={props?.images?.[0]?.alt || 'icon'}
              width={40}
              height={40}
              className="rounded-md"
            />  
          </div>
          {props?.route}
          <div className="bg-lime-300 ml-2 px-1 transform rotate-1">{props.score}%</div>
          { props?.screen &&
          <Badge variant="secondary" className={`${getBadgeColor(props.screen ?? 'mobile')} hover:no-underline text-white text-xs ml-2`}>
            {props?.screen}
          </Badge>
          }
        </div>
        <div className="ml-auto h-full flex items-center pr-4">
          {props?.status === 'pending'? 
          <>
          <Image src='/loading.svg' alt='loading' width={20} height={20} className="animate-spin" />
          </>
          :
          <ArrowRight
            width={30}
            height={30}
            className="transform transition-transform duration-300 group-hover:-rotate-45"
          />
          }
        </div>
      </div>
    </div>
  )
}

function getBadgeColor(screen: string): string | undefined{
  if (screen == 'mobile') return 'bg-blue-500';
  if (screen == 'tablet') return 'bg-yellow-500';
  return 'bg-emerald-500';
}