"use client";

import { Work_Sans } from "next/font/google";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import analyzeRoutes from "@/scripts/analyzeRoutes";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

type Route = {
  route: string;
  status?: 'pending' | 'success';
};

// Then update your prop type:
export default function AddRoutes({ setRouteList }: { setRouteList: React.Dispatch<React.SetStateAction<Route[]>> }){

  const [routes, setRoutes] = useState([""]);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { protocol, hostname, port } = window.location;

      const isLocalhost = hostname === "localhost";
        const fullDomain = isLocalhost && port ? `${protocol}//${hostname}:${port}` : hostname;

      setDomain(fullDomain);
    }
  }, []);
  const [open, setOpen] = useState(false);

  const handleRouteChange = (index: number, value: string) => {
    const updated = [...routes];
    updated[index] = value;
    setRoutes(updated);
  };

  const addRoute = () => {
    setRoutes([...routes, ""]);
  };

  const removeRoute = (index: number) => {
    const updated = [...routes];
    updated.splice(index, 1);
    setRoutes(updated);
  };

  const handleRouteAnalysis = async () => {
    setOpen(false)
    setRouteList(routes.map(route => ({ route, status: 'pending' })));
    const routeData = await analyzeRoutes(routes, domain);
    setRouteList(routeData.map(route => ({ ...route, status: 'success' })));
  }

  return (
    <div className={workSans.className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="cursor-pointer hover:bg-gray-100 px-4 py-2 border border-gray-200 w-[150px] font-bold">
            Add routes
          </div>
        </DialogTrigger>
        <DialogContent className="p-10">
          <DialogHeader>
            <DialogTitle>Please Input All the Routes</DialogTitle>
            <DialogDescription>
              These routes will be used for analysis. You can edit or remove them later.
            </DialogDescription>
          </DialogHeader>

          {/* Domain Input */}
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Domain Name</label>
            <Input
              className="mt-1 cursor-not-allowed"
              placeholder="https://example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          {/* Route Inputs with Remove Option */}
          <div className="mt-1 space-y-3 max-h-60 overflow-y-auto flex flex-col">
            <label className="text-sm font-medium text-gray-700">Routes</label>
            <div className="flex flex-col gap-2">
            {routes.map((route, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`/your/route/${index + 1}`}
                  value={route}
                  onChange={(e) => handleRouteChange(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRoute(index)}
                  className="text-black hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            </div>
          </div>

          {/* Centered Add (+) Button */}
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={addRoute} size="icon" className="cursor-pointer">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="w-full">
            <Button
              className="w-full mt-4"
              onClick={handleRouteAnalysis}
            >
              Analyze Routes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
