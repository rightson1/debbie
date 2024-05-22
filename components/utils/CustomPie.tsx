"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function CustomPie({
  pieData,
}: {
  pieData: {
    id: string;
    value: number;
    label: string;
  }[];
}) {
  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={600}
      arcLabelMinAngle={true}
      height={350}
    />
  );
}
