"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import StatusTable from "@/components/settings/status/StatusTable";
import StatusModal from "@/components/settings/status/StatusModal";
import { useLanguage } from "@/context/LanguageContext";

interface Status {
  id: string;
  name: string;
}

export default function StatusPage() {
  const { t } = useLanguage();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [editing, setEditing] = useState<Status | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string }) => {
    setStatuses((prev) => {
      if (editing) {
        return prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s));
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

  const handleEdit = (row: Status) => {
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
      <PageBreadcrumb pageTitle={t("settings.status.pageTitle")} />

      <ComponentCard>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            {t("settings.status.add")}
          </Button>
        </div>

        <StatusTable
          data={statuses}
          onEdit={handleEdit}
          onDelete={(row) => {
            setStatuses((prev) => prev.filter((s) => s.id !== row.id));
          }}
        />
      </ComponentCard>

      <StatusModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
