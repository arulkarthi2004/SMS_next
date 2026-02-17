"use client";

import { useMemo, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import StudentApprovalTable, {
  ApprovalStatus,
  StudentRow,
} from "@/components/management/student-approval/StudentApprovalTable";
import { useLanguage } from "@/context/LanguageContext";

const initialStudents: StudentRow[] = [
  {
    id: "STD-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    approvalStatus: "Pending",
    classification: "A",
    status: "Active",
    tags: ["N5", "Frontend"],
  },
  {
    id: "STD-1002",
    name: "Mia Johnson",
    email: "mia.johnson@example.com",
    approvalStatus: "Approved",
    classification: "B",
    status: "Active",
    tags: ["N4", "Backend"],
  },
  {
    id: "STD-1003",
    name: "Noah Wilson",
    email: "noah.wilson@example.com",
    approvalStatus: "Rejected",
    classification: "C",
    status: "Inactive",
    tags: ["N5", "Design"],
  },
  {
    id: "STD-1004",
    name: "Yui Nakamura",
    email: "yui.nakamura@example.com",
    approvalStatus: "Pending",
    classification: "A",
    status: "Active",
    tags: ["N3", "Data"],
  },
  {
    id: "STD-1005",
    name: "Liam Brown",
    email: "liam.brown@example.com",
    approvalStatus: "Pending",
    classification: "B",
    status: "On Hold",
    tags: ["N4", "DevOps"],
  },
  {
    id: "STD-1006",
    name: "Sofia Davis",
    email: "sofia.davis@example.com",
    approvalStatus: "Approved",
    classification: "A",
    status: "Active",
    tags: ["N2", "QA"],
  },
  {
    id: "STD-1007",
    name: "Riku Sato",
    email: "riku.sato@example.com",
    approvalStatus: "Pending",
    classification: "C",
    status: "Active",
    tags: ["N5", "Mobile"],
  },
];

const classificationOptions = ["A", "B", "C", "D"];
const statusOptions = ["Active", "Inactive", "On Hold"];
const tagOptions = [
  "N2",
  "N3",
  "N4",
  "N5",
  "Frontend",
  "Backend",
  "DevOps",
  "QA",
  "Design",
  "Data",
  "Mobile",
];

export default function ApprovalStudentPage() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<StudentRow[]>(initialStudents);

  const counts = useMemo(() => {
    return students.reduce(
      (acc, row) => {
        acc.total += 1;

        if (row.approvalStatus === "Pending") {
          acc.pending += 1;
        }

        if (row.approvalStatus === "Approved") {
          acc.approved += 1;
        }

        if (row.approvalStatus === "Rejected") {
          acc.rejected += 1;
        }

        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    );
  }, [students]);

  const handleUpdateStatus = (id: string, status: ApprovalStatus) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== id) {
          return student;
        }

        return {
          ...student,
          approvalStatus: status,
        };
      })
    );
  };

  const handleUpdateDetails = (
    id: string,
    updates: Partial<Pick<StudentRow, "classification" | "status" | "tags">>
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("studentApproval.pageTitle")} />

      <ComponentCard>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 p-3 dark:border-white/[0.05]">
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {t("studentApproval.cards.totalStudents")}
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">{counts.total}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 dark:border-white/[0.05]">
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {t("studentApproval.cards.pending")}
            </p>
            <div className="mt-1">
              <Badge size="sm" color="warning">{counts.pending}</Badge>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 dark:border-white/[0.05]">
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {t("studentApproval.cards.approved")}
            </p>
            <div className="mt-1">
              <Badge size="sm" color="success">{counts.approved}</Badge>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 dark:border-white/[0.05]">
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {t("studentApproval.cards.rejected")}
            </p>
            <div className="mt-1">
              <Badge size="sm" color="error">{counts.rejected}</Badge>
            </div>
          </div>
        </div>

        <StudentApprovalTable
          data={students}
          onUpdateStatus={handleUpdateStatus}
          onUpdateDetails={handleUpdateDetails}
          classificationOptions={classificationOptions}
          statusOptions={statusOptions}
          tagOptions={tagOptions}
        />
      </ComponentCard>
    </>
  );
}
