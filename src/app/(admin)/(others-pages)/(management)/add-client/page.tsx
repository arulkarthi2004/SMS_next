"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import ClientTable from "@/components/management/client/ClientTable";
import ClientModal from "@/components/management/client/ClientModal";
import { useLanguage } from "@/context/LanguageContext";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AddClientPage() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Client | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: Omit<Client, "id">) => {
    setClients((prev) => {
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

  const handleEdit = (row: Client) => {
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
      <PageBreadcrumb pageTitle={t("addClient.pageTitle")} />

      <ComponentCard title={t("addClient.title")} desc={t("addClient.desc")}>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            {t("addClient.add")}
          </Button>
        </div>

        <ClientTable
          data={clients}
          onEdit={handleEdit}
          onDelete={(row) => {
            setClients((prev) => prev.filter((c) => c.id !== row.id));
          }}
        />
      </ComponentCard>

      <ClientModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
