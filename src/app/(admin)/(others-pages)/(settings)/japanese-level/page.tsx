"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import JapaneseLevelTable from "@/components/settings/japanese-level/JapaneseLevelTable";
import JapaneseLevelModal from "@/components/settings/japanese-level/JapaneseLevelModal";

interface JapaneseLevel {
  id: string;
  name: string;
}

export default function JapaneseLevelPage() {
  const [levels, setLevels] = useState<JapaneseLevel[]>([]);
  const [editing, setEditing] = useState<JapaneseLevel | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string }) => {
    setLevels((prev) => {
      if (editing) {
        return prev.map((l) => (l.id === editing.id ? { ...l, ...form } : l));
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

  const handleEdit = (row: JapaneseLevel) => {
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
      <PageBreadcrumb pageTitle="Japanese Level Settings" />

      <ComponentCard
        title="Japanese Level Master"
        desc="Create and manage Japanese levels available in master settings."
      >
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            Add Japanese Level
          </Button>
        </div>

        <JapaneseLevelTable
          data={levels}
          onEdit={handleEdit}
          onDelete={(row) => {
            setLevels((prev) => prev.filter((l) => l.id !== row.id));
          }}
        />
      </ComponentCard>

      <JapaneseLevelModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
