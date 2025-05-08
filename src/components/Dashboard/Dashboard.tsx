import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
import CalendarPage from "../Sideboard/Self-Assestments/CalendarPage";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
      <CalendarPage/>
    </div>
  );
};