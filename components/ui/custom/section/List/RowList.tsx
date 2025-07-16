import React from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import RowItemBox from "./items/RowItemBox";

export default function RowList() {
  return (
    <>
      <div className="w-full h-full py-2 flex flex-col grid grid-cols-1 gap-4 pt-8">
        <div className="w-full cols-span-1">
          <RowItemBox label="Shopify" slug="shopify" count={90} icon={<ShoppingBag width={25} height={25} className="transform -rotate-5" />} />
        </div>
        <div className="w-full cols-span-1">
          <RowItemBox label="Amazon" slug="amazon" count={85} icon={<ShoppingCart width={25} height={25} className="transform -rotate-5" />} />
        </div>
      </div>
    </>
  );
}
