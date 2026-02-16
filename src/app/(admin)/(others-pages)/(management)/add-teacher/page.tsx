"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import TeacherTable from "@/components/management/teacher/TeacherTable";
import TeacherModal from "@/components/management/teacher/TeacherModal";
import { useLanguage } from "@/context/LanguageContext";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AddTeacherPage() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: Omit<Teacher, "id">) => {
    setTeachers((prev) => {
      if (editing) {
        return prev.map((t) => (t.id === editing.id ? { ...t, ...form } : t));
      }

      return [...prev, { id: crypto.randomUUID(), ...form }];
    });

    setEditing(null);
  };

  const handleAdd = () => {
    setEditing(null);
    setModalInstanceKey((prev) => prev + 1);
    openModal();
  };

  const handleEdit = (row: Teacher) => {
    setEditing(row);
    setModalInstanceKey((prev) => prev + 1);
    openModal();
  };

  const handleClose = () => {
    setEditing(null);
    closeModal();
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("addTeacher.pageTitle")} />

      <ComponentCard title={t("addTeacher.title")} desc={t("addTeacher.desc")}>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            {t("addTeacher.add")}
          </Button>
        </div>

        <TeacherTable
          data={teachers}
          onEdit={handleEdit}
          onDelete={(row) => {
            setTeachers((prev) => prev.filter((t) => t.id !== row.id));
          }}
        />
      </ComponentCard>

      <TeacherModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
