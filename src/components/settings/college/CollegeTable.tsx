"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashBinIcon } from "@/icons";
import Pagination from "@/components/tables/Pagination";
import { useLanguage } from "@/context/LanguageContext";

interface College {
  id: string;
  name: string;
  location: string;
}

interface Props {
  data: College[];
  onEdit: (row: College) => void;
  onDelete: (row: College) => void;
}

const ITEMS_PER_PAGE = 5;

export default function CollegeTable({
  data,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[640px]">
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t("settings.common.collegeName")}
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t("settings.common.location")}
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  {t("settings.common.actions")}
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {t("settings.college.emptyTitle")}
                  </TableCell>
                  <TableCell className="px-4 py-8 text-theme-sm text-gray-400 dark:text-gray-500">
                    {t("settings.college.emptyDesc")}
                  </TableCell>
                  {/* <TableCell className="px-4 py-8" /> */}
                </TableRow>
              ) : (
                paginatedData.map((college) => (
                  <TableRow key={college.id}>
                    {/* Name */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {college.name}
                      </span>
                    </TableCell>

                    {/* Location */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {college.location}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-4 py-3 text-end">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(college)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-brand-400"
                          aria-label={`${t("common.edit")} ${college.name}`}
                        >
                          <PencilIcon />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(college)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          aria-label={`${t("common.delete")} ${college.name}`}
                        >
                          <TrashBinIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {data.length > 0 && (
        <div className="flex justify-end border-t border-gray-100 px-5 py-4 dark:border-white/[0.05]">
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
