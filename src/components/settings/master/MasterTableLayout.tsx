"use client";

import Button from "@/components/ui/button/Button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface Props<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onAdd: () => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

const MasterTableLayout = <T extends { id: string }>({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
}: Props<T>) => {

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>

        <Button onClick={onAdd}>
          + Add
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.accessor)} isHeader>
                  {col.header}
                </TableCell>
              ))}
              <TableCell isHeader className="text-right">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(row[col.accessor])}
                  </TableCell>
                ))}

                <TableCell className="text-right space-x-2">
                  <button onClick={() => onEdit(row)}>✏️</button>
                  <button onClick={() => onDelete(row)}>🗑️</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default MasterTableLayout;
