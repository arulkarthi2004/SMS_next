"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  male: number;
  female: number;
  other?: number;
}

export default function GenderDonutChart({
  male,
  female,
  other = 0,
}: Props) {

  const series = [male, female, other];

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },

    labels: ["Male", "Female", "Other"],

    colors: ["#465FFF", "#22C55E", "#F59E0B"],

    legend: {
      position: "bottom",
    },

    dataLabels: {
      enabled: true,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Gender Distribution
      </h3>

      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={320}
      />
    </div>
  );
}
