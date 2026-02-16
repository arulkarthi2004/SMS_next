"use client";

import { useMemo, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import Pagination from "@/components/tables/Pagination";

export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface StudentRow {
  id: string;
  name: string;
  email: string;
  approvalStatus: ApprovalStatus;
  classification: string;
  status: string;
  tags: string[];
}

interface Props {
  data: StudentRow[];
  onUpdateStatus: (id: string, status: ApprovalStatus) => void;
  onUpdateDetails: (
    id: string,
    updates: Partial<Pick<StudentRow, "classification" | "status" | "tags">>
  ) => void;
  classificationOptions: string[];
  statusOptions: string[];
  tagOptions: string[];
}

const ITEMS_PER_PAGE = 10;

const getStatusBadgeColor = (status: ApprovalStatus) => {
  if (status === "Approved") {
    return "success" as const;
  }

  if (status === "Rejected") {
    return "error" as const;
  }

  return "warning" as const;
};

function TagsPicker({
  selected,
  options,
  onChange,
}: {
  selected: string[];
  options: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const toggleTag = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((tag) => tag !== value));
      return;
    }

    onChange([...selected, value]);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-left text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
      >
        {selected.length > 0 ? selected.join(", ") : "Select tags"}
      </button>

      {open ? (
        <div className="mt-2 rounded-lg border border-gray-200 p-2 dark:border-white/[0.05]">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {options.map((option) => {
              const checked = selected.includes(option);

              return (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(option)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/20 dark:border-gray-700"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpen(false)}
              className="!px-3 !py-2"
            >
              Done
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function StudentApprovalTable({
  data,
  onUpdateStatus,
  onUpdateDetails,
  classificationOptions,
  statusOptions,
  tagOptions,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ApprovalStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    const filtered = data.filter((row) => {
      const matchesSearch =
        normalized.length === 0 ||
        row.id.toLowerCase().includes(normalized) ||
        row.name.toLowerCase().includes(normalized);

      const matchesStatus =
        statusFilter === "All" || row.approvalStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const aNum = Number(a.id.replace(/\D/g, ""));
      const bNum = Number(b.id.replace(/\D/g, ""));
      return bNum - aNum;
    });
  }, [data, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03] lg:grid-cols-2">
        <div>
          <label
            htmlFor="student-search"
            className="mb-1 block text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Search by ID or Name
          </label>
          <input
            id="student-search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search students"
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="mb-1 block text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Approval Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "All" | ApprovalStatus);
              setCurrentPage(1);
            }}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {paginatedData.length === 0 ? (
          <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-500 dark:border-white/[0.05] dark:text-gray-400">
            No students found. Try changing search or filter.
          </div>
        ) : (
          paginatedData.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-400">{row.id}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                    {row.name}
                  </p>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                    {row.email}
                  </p>
                </div>

                <Badge size="sm" color={getStatusBadgeColor(row.approvalStatus)}>
                  {row.approvalStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div>
                  <p className="mb-1 text-theme-xs text-gray-500 dark:text-gray-400">
                    Classification
                  </p>
                  <select
                    value={row.classification}
                    onChange={(e) =>
                      onUpdateDetails(row.id, { classification: e.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                  >
                    {classificationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-theme-xs text-gray-500 dark:text-gray-400">Status</p>
                  <select
                    value={row.status}
                    onChange={(e) => onUpdateDetails(row.id, { status: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-theme-xs text-gray-500 dark:text-gray-400">Tags</p>
                  <TagsPicker
                    selected={row.tags}
                    options={tagOptions}
                    onChange={(next) => onUpdateDetails(row.id, { tags: next })}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(row.id, "Approved")}
                  disabled={row.approvalStatus === "Approved"}
                  className="w-full sm:w-auto !px-3 !py-2"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateStatus(row.id, "Rejected")}
                  disabled={row.approvalStatus === "Rejected"}
                  className="w-full sm:w-auto !px-3 !py-2"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredData.length > 0 && (
        <div className="flex justify-end rounded-xl border border-gray-200 px-4 py-3 dark:border-white/[0.05]">
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
