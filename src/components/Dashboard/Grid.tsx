import React from "react";
import { StatCards } from "./StatCards.tsx";
import { RecentTransactions } from "./RecentTransactions.tsx";
import { ActivityGraph } from "./ActivityGraph.tsx";
import { UsageRadar } from "./UsageRadar.tsx";
export const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards/>
      <ActivityGraph/>
      <UsageRadar/>
      <RecentTransactions/>
    </div>
  );
};