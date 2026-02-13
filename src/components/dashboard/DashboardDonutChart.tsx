"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  title: string;
  labels: string[];
  series: number[];
}

export default function DashboardDonutChart({
  title,
  labels,
  series,
}: Props) {

  const total = series.reduce((a, b) => a + b, 0);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },

    labels,

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
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => total.toString(),
            },
          },
        },
      },
    },

    colors: [
      "#465FFF",
      "#22C55E",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#06B6D4",
      "#F97316",
    ],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        {title}
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
