"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import ClassificationTable from "@/components/settings/classification/ClassificationTable";
import ClassificationModal from "@/components/settings/classification/ClassificationModal";
import { useLanguage } from "@/context/LanguageContext";

interface Classification {
  id: string;
  name: string;
}

export default function ClassificationPage() {
  const { t } = useLanguage();
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [editing, setEditing] = useState<Classification | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string }) => {
    setClassifications((prev) => {
      if (editing) {
        return prev.map((c) => (c.id === editing.id ? { ...c, ...form } : c));
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

  const handleEdit = (row: Classification) => {
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
      <PageBreadcrumb pageTitle={t("settings.classification.pageTitle")} />

      <ComponentCard>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            {t("settings.classification.add")}
          </Button>
        </div>

        <ClassificationTable
          data={classifications}
          onEdit={handleEdit}
          onDelete={(row) => {
            setClassifications((prev) => prev.filter((c) => c.id !== row.id));
          }}
        />
      </ComponentCard>

      <ClassificationModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
