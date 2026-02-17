"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import { useLanguage } from "@/context/LanguageContext";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PieChartCardProps {
  title: string;
  labels: string[];
  series: number[];
}

export default function PieChartCard({
  title,
  labels,
  series,
}: PieChartCardProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
    },
    labels: labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#465FFF", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"],
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h3>

        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              {t("dashboard.viewMore")}
            </DropdownItem>
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              {t("dashboard.export")}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Chart */}
      <div className="py-4">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height={300}
        />
      </div>
    </div>
  );
}
