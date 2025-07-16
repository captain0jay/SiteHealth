"use client"

import React from 'react'
import Heading from '../section/Hero/Heading'
import AddRoutes from '../section/Hero/AddRoutes'
import RowList from '../section/List/RowList'

type Route = {
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

export default function Main() {
  const [routeList, setRouteList] = React.useState<Route[]>([]);
  
  return (
    <>
    <div className='p-8'>
        <Heading title='Website Health checker' subtitle='Captain jay'/>
        <AddRoutes setRouteList={setRouteList}/>
        <RowList routeList={routeList}/>
    </div>
    </>
  )
}
