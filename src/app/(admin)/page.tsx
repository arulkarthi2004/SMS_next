import type { Metadata } from "next";
import { StudentCount } from "@/components/dashboard/StudentCount";
import React from "react";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import DemographicCard from "@/components/dashboard/DemographicCard";
import PieChartCard from "@/components/dashboard/PieChartCard";
import GenderDonutChart from "@/components/dashboard/GenderDonutChart";
import DepartmentDistributionList from "@/components/dashboard/DepartmentDistributionList";
import CollegeVerticalBarChart from "@/components/dashboard/CollegeVerticalBarChart";
import DashboardDonutChart from "@/components/dashboard/DashboardDonutChart";

export const metadata: Metadata = {
  title:
    "SMS Dashboard",
  description: "Student Management System Dashboard built with Tailwind CSS and Next.js.",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      {/* ROW 1 LEFT */}
      <div className="col-span-12 xl:col-span-7 space-y-6">
        <StudentCount />

        <DepartmentDistributionList
          departments={[
            { name: "CS-1", total: 10 },
            { name: "CS-2", total: 20 },
            { name: "CS-3", total: 30 },
            { name: "CS-4", total: 40 },
            { name: "CS-5", total: 50 },
            { name: "CS-6", total: 60 },
            { name: "CS-7", total: 70 },
            { name: "CS-8", total: 80 },
          ]}
        />
      </div>

      {/* ROW 1 RIGHT */}
      <div className="col-span-12 xl:col-span-5">
        <PieChartCard
          title="Gender Distribution"
          labels={["male", "female"]}
          series={[60, 40]}
        />
      </div>

      {/* ROW 2 FULL WIDTH */}
      <div className="col-span-12">
        <CollegeVerticalBarChart
          data={[
            { college: "Tokyo Univ", students: 120 },
            { college: "Osaka Univ", students: 80 },
            { college: "Kyoto Univ", students: 60 },
            { college: "Nagoya Univ", students: 45 },
            { college: "Hokkaido Univ", students: 90 },
            { college: "Tohoku Univ", students: 70 },
            { college: "Chiba Univ", students: 50 },
          ]}
        />
      </div>

      {/* ROW 3 DONUT SECTION */}
      <div className="col-span-12 xl:col-span-6">
        <DashboardDonutChart
          title="Japanese Level Distribution"
          labels={["N5", "N4", "N3", "N2", "N1"]}
          series={[40, 10, 35, 10, 5]}
        />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DashboardDonutChart
          title="Student Status"
          labels={[
            "入学待ち",
            "学習中",
            "オンライン",
            "退学",
            "就職済",
          ]}
          series={[40, 120, 35, 10, 55]}
        />
      </div>

    </div>
  );
}
