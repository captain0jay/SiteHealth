import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Scroll } from "lucide-react";

function getBadgeColor(screen: string) {
  switch (screen) {
    case "mobile": return "bg-green-500";
    case "desktop": return "bg-blue-500";
    case "tablet": return "bg-yellow-500";
    default: return "bg-gray-500";
  }
}

export default function RowItemDisplay(props: RowItemBoxProps) {
  const images = props.images || [];

  const metricsData = [
    { name: 'Load Time', value: props.loadTime },
    { name: 'FCP', value: props.fcp },
    { name: 'LCP', value: props.lcp },
    { name: 'CLS', value: props.cls },
    { name: 'Score', value: props.score },
  ].filter(item => item.value !== undefined);

  return (
    <Card className="p-4 shadow-xl rounded rounded-0 flex flex-col gap-2 h-full overflow-y-auto">
      {/* Title Section */}
      <div>
        <div className="text-sm">
          <span className="text-gray-500">Route:</span> {props.route}
          {props.screen && (
            <Badge variant="secondary" className={`${getBadgeColor(props.screen)} hover:no-underline text-white ml-2 text-xs`}>
              {props.screen}
            </Badge>
          )}
        </div>
      </div>

      {/* Image Carousel */}
      <ScrollArea className="w-full pb-2">
        <div className="flex space-x-2">
          {images.map((img, i) => (
            <Dialog key={i}>
              <DialogTrigger>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-24 h-24 object-cover rounded border shadow cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent>
                <img src={img.src} alt={img.alt} className="max-w-full max-h-[80vh] object-contain mx-auto" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>

      {/* Metrics Chart */}
      <div>
      {metricsData.length > 0 && (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metricsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      </div>

      <div className="">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Label</th>
              <th className="px-4 py-2 border-b">Value</th>
            </tr>
          </thead>
          <tbody>
            {[ 
              { label: 'Total Images', value: props.totalImages },
              { label: 'Visible Elements', value: props.visibleElements },
              { label: 'Total Elements', value: props.totalElements },
              { label: 'Word Count', value: props.wordCount },
              { label: 'External Links', value: props.externalLinks },
              { label: 'Internal Links', value: props.internalLinks },
              { label: 'Font Count', value: props.fontCount },
              { label: 'Script Count', value: props.scriptCount },
              { label: 'Network Type', value: props.networkType },
            ].map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2 font-medium text-gray-800">{item.label}</td>
                <td className="px-4 py-2 text-gray-600">{item.value ?? 'N/A'}</td>
              </tr>
            ))}
            <tr className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">Status</td>
              <td className="px-4 py-2">
                <Badge variant={props.status === 'success' ? 'default' : 'outline'}>{props.status}</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Headings breakdown
      {props.headings && (
        <div>
          <h3 className="font-semibold mt-4">Headings</h3>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(props.headings).map(([tag, count]) => (
              <li key={tag}>{tag}: {count}</li>
            ))}
          </ul>
        </div>
      )} */}
    </Card>
  );
}

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
}