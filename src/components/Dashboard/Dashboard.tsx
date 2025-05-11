import React from "react";
import { TopBar } from "./TopBar.tsx";
import { Grid } from "./Grid.tsx";
import CalendarPage from "../Sideboard/Self-Assestments/CalendarPage.tsx";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
      <CalendarPage/>
    </div>
  );
};