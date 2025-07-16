"use client";

import { useEffect, useState } from "react";

interface NetworkInfo {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export default function Home() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({});

  useEffect(() => {
    const connection = (navigator as any).connection;

    if (!connection) {
      console.warn("Network Information API not supported");
      return;
    }

    const updateNetworkInfo = () => {
      setNetworkInfo({
        type: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      });
    };

    // Initial set
    updateNetworkInfo();

    // Update every 3 seconds
    const interval = setInterval(updateNetworkInfo, 1000);

    // Optional: also use 'change' event for instant update (when it works)
    connection.addEventListener("change", updateNetworkInfo);

    return () => {
      clearInterval(interval);
      connection.removeEventListener("change", updateNetworkInfo);
    };
  }, []);

  return (
    <div className="p-4 rounded-xl shadow-md bg-white text-black max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">📶 Network Information</h2>
      <ul className="space-y-2">
        <li><strong>Type:</strong> {networkInfo.type ?? "N/A"}</li>
        <li><strong>Effective Type:</strong> {networkInfo.effectiveType ?? "N/A"}</li>
        <li><strong>Downlink:</strong> {networkInfo.downlink ?? "N/A"} Mbps</li>
        <li><strong>RTT:</strong> {networkInfo.rtt ?? "N/A"} ms</li>
        <li><strong>Save Data:</strong> {networkInfo.saveData ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
}
