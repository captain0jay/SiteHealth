import React from "react";
import RowItemBox from "./items/RowItemBox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import RowItemDisplay from "./items/RowItemDisplay";

interface Route {
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

interface RouteListProps {
  routeList: Route[];
}

export default function RowList({ routeList }: RouteListProps) {
  return (
    <>
      <div className="w-full h-full py-2 flex flex-col grid grid-cols-1 gap-4 pt-8">
        {routeList.map((routeObj, index) => (
          <div className="w-full cols-span-1" key={`${routeObj.route}-${index}`}>
            <Sheet>
            <SheetTrigger className="w-full"><RowItemBox {...routeObj} /></SheetTrigger>
            <SheetContent>
              <SheetHeader> 
                <SheetTitle className="text-2xl font-bold mb-1">{routeObj?.title}</SheetTitle>
                <SheetDescription className="text-muted-foreground text-sm mb-2">{routeObj?.description}</SheetDescription>
              </SheetHeader>
              <RowItemDisplay {...routeObj} />
            </SheetContent>
          </Sheet>
          </div>
        ))}
      </div>
    </>
  );
}
