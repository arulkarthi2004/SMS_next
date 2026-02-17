"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Department {
  name: string;
  total: number;
}

interface Props {
  departments: Department[];
  rowsPerPage?: number;
}

export default function DepartmentDistributionList({
  departments,
  rowsPerPage = 4,
}: Props) {
  const { t } = useLanguage();

  // Safe rows fallback
  const safeRows = rowsPerPage || 4;

  const [page, setPage] = useState(1);

  // Reset page when dataset or page size changes
  useEffect(() => {
    setPage(1);
  }, [departments, safeRows]);

  // Total pages
  const totalPages = Math.ceil(departments.length / safeRows);

  // Slice data
  const startIndex = (page - 1) * safeRows;
  const currentRows = departments.slice(
    startIndex,
    startIndex + safeRows
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      
      {/* Header */}
      <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("dashboard.department")}
        </h3>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {currentRows.map((dept, index) => (
          <div
            key={`${dept.name}-${dept.total}-${startIndex + index}`}
            className="grid grid-cols-2 px-6 py-2 items-center"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {dept.name}
              </p>
              {/* <p className="text-sm text-gray-500">{dept.name}</p> */}
            </div>

            <div className="flex justify-end">
              <span className="px-6 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400">
                {dept.total}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">

          {/* Page Info */}
          <p className="text-sm text-gray-500">
            {t("dashboard.page")} {page} {t("dashboard.of")} {totalPages}
          </p>

          {/* Controls */}
          <div className="flex gap-2">

            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
            >
              {t("dashboard.prev")}
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    page === pageNumber
                      ? "bg-indigo-600 text-white"
                      : "border hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
            >
              {t("dashboard.next")}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
