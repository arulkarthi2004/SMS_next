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

interface Tag {
  id: string;
  name: string;
}

interface Props {
  data: Tag[];
  onEdit: (row: Tag) => void;
  onDelete: (row: Tag) => void;
}

const ITEMS_PER_PAGE = 5;

export default function TagsTable({ data, onEdit, onDelete }: Props) {
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
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t("settings.common.tagName")}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  {t("settings.common.actions")}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {t("settings.tags.emptyTitle")}
                  </TableCell>
                  <TableCell className="px-4 py-8 text-end text-theme-sm text-gray-400 dark:text-gray-500">
                    {t("settings.tags.emptyDesc")}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {row.name}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-end">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-brand-400"
                          aria-label={`${t("common.edit")} ${row.name}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          aria-label={`${t("common.delete")} ${row.name}`}
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
