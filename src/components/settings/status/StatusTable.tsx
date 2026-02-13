"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashBinIcon } from "@/icons";

interface Status {
  id: string;
  name: string;
}

interface Props {
  data: Status[];
  onEdit: (row: Status) => void;
  onDelete: (row: Status) => void;
}

function getBadgeColors(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  return {
    backgroundColor: `hsl(${hue} 92% 92%)`,
    borderColor: `hsl(${hue} 70% 78%)`,
    color: `hsl(${hue} 55% 30%)`,
  };
}

export default function StatusTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[740px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Badge
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    No statuses added yet.
                  </TableCell>
                  <TableCell className="px-4 py-8 text-theme-sm text-gray-400 dark:text-gray-500">
                    Status badges will be auto colored.
                  </TableCell>
                  <TableCell className="px-4 py-8 text-end text-theme-sm text-gray-400 dark:text-gray-500">
                    Add your first status from the button above.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {row.name}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <span
                        className="inline-flex rounded-full border px-2.5 py-1 text-theme-xs font-medium"
                        style={getBadgeColors(row.name)}
                      >
                        {row.name}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-end">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-brand-400"
                          aria-label={`Edit ${row.name}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          aria-label={`Delete ${row.name}`}
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
    </div>
  );
}
