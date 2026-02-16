"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface CollegeData {
  college: string;
  students: number;
}

interface Props {
  data: CollegeData[];
}

export default function CollegeVerticalBarChart({ data }: Props) {

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border p-5">
        <p className="text-gray-500">No college data available</p>
      </div>
    );
  }

  // Sort for nicer visual (optional but recommended)
  const sorted = [...data].sort((a, b) => b.students - a.students);

  const categories = sorted.map(d => d.college);
  const seriesData = sorted.map(d => d.students);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "45%",
      },
    },

    xaxis: {
      categories,
      labels: {
        rotate: -45, // Important for many colleges
        style: {
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      title: {
        text: "Students",
      },
    },

    dataLabels: {
      enabled: false,
    },

    colors: ["#465FFF"],

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },

    tooltip: {
      y: {
        formatter: (val: number) => `${val} students`,
      },
    },
  };

  const series = [
    {
      name: "Students",
      data: seriesData,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Students by College
      </h3>

      <div className="overflow-x-auto">
        <div style={{ minWidth: Math.max(600, data.length * 60) }}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={420}
          />
        </div>
      </div>

    </div>
  );
}
