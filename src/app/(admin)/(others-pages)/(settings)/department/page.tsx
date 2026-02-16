"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import DepartmentTable from "@/components/settings/department/DepartmentTable";
import DepartmentModal from "@/components/settings/department/DepartmentModal";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";

interface Department {
  id: string;
  name: string;
}

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editing, setEditing] = useState<Department | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string }) => {
    setDepartments((prev) => {
      if (editing) {
        return prev.map((d) => (d.id === editing.id ? { ...d, ...form } : d));
      }

      return [...prev, { id: crypto.randomUUID(), ...form }];
    });

    setEditing(null);
  };

  const handleAddDepartment = () => {
    setEditing(null);
    setModalInstanceKey((prev) => prev + 1);
    openModal();
  };

  const handleEditDepartment = (row: Department) => {
    setEditing(row);
    setModalInstanceKey((prev) => prev + 1);
    openModal();
  };

  const handleCloseModal = () => {
    setEditing(null);
    closeModal();
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Department Settings" />

      <ComponentCard
        title="Department Master"
        desc="Create and manage departments available in master settings."
      >
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAddDepartment}
            startIcon={<PlusIcon />}
          >
            Add Department
          </Button>
        </div>

        <DepartmentTable
          data={departments}
          onEdit={handleEditDepartment}
          onDelete={(row) => {
            setDepartments((prev) => prev.filter((d) => d.id !== row.id));
          }}
        />
      </ComponentCard>

      <DepartmentModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
