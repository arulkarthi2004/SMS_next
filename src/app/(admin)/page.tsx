"use client";

import { StudentCount } from "@/components/dashboard/StudentCount";
import React from "react";
import PieChartCard from "@/components/dashboard/PieChartCard";
import DepartmentDistributionList from "@/components/dashboard/DepartmentDistributionList";
import CollegeVerticalBarChart from "@/components/dashboard/CollegeVerticalBarChart";
import DashboardDonutChart from "@/components/dashboard/DashboardDonutChart";
import { useLanguage } from "@/context/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
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

      <div className="col-span-12 xl:col-span-5">
        <PieChartCard
          title={t("dashboard.genderDistribution")}
          labels={[t("dashboard.male"), t("dashboard.female")]}
          series={[60, 40]}
        />
      </div>

      <div className="col-span-12">
        <CollegeVerticalBarChart
          data={[
            { college: t("dashboard.colleges.tokyo"), students: 120 },
            { college: t("dashboard.colleges.osaka"), students: 80 },
            { college: t("dashboard.colleges.kyoto"), students: 60 },
            { college: t("dashboard.colleges.nagoya"), students: 45 },
            { college: t("dashboard.colleges.hokkaido"), students: 90 },
            { college: t("dashboard.colleges.tohoku"), students: 70 },
            { college: t("dashboard.colleges.chiba"), students: 50 },
          ]}
        />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DashboardDonutChart
          title={t("dashboard.japaneseLevelDistribution")}
          labels={["N5", "N4", "N3", "N2", "N1"]}
          series={[40, 10, 35, 10, 5]}
        />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DashboardDonutChart
          title={t("dashboard.studentStatus")}
          labels={[
            t("dashboard.status.waiting"),
            t("dashboard.status.studying"),
            t("dashboard.status.online"),
            t("dashboard.status.dropout"),
            t("dashboard.status.placed"),
          ]}
          series={[40, 120, 35, 10, 55]}
        />
      </div>
    </div>
  );
}
