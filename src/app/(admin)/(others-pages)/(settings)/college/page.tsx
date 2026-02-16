"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import CollegeTable from "@/components/settings/college/CollegeTable";
import CollegeModal from "@/components/settings/college/CollegeModal";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";

interface College {
  id: string;
  name: string;
  location: string;
}

export default function CollegePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [editing, setEditing] = useState<College | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string; location: string }) => {
    setColleges((prev) => {
      if (editing) {
        return prev.map((c) =>
          c.id === editing.id ? { ...c, ...form } : c
        );
      }

      return [...prev, { id: crypto.randomUUID(), ...form }];
    });

    setEditing(null);
  };

  const handleAddCollege = () => {
    setEditing(null);
    setModalInstanceKey((prev) => prev + 1);
    openModal();
  };

  const handleEditCollege = (row: College) => {
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
      <PageBreadcrumb pageTitle="College Settings" />

      <ComponentCard
        title="College Master"
        desc="Create and manage colleges available in master settings."
      >
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAddCollege} startIcon={<PlusIcon />}>
            Add College
          </Button>
        </div>

        <CollegeTable
          data={colleges}
          onEdit={handleEditCollege}
          onDelete={(row) => {
            setColleges((prev) => prev.filter((c) => c.id !== row.id));
          }}
        />
      </ComponentCard>

      <CollegeModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
