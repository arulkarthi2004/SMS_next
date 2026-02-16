"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import TagsTable from "@/components/settings/tags/TagsTable";
import TagsModal from "@/components/settings/tags/TagsModal";

interface Tag {
  id: string;
  name: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = (form: { name: string }) => {
    setTags((prev) => {
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

  const handleEdit = (row: Tag) => {
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
      <PageBreadcrumb pageTitle="Tags Settings" />

      <ComponentCard
        title="Tags Master"
        desc="Create and manage tags available in master settings."
      >
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd} startIcon={<PlusIcon />}>
            Add Tag
          </Button>
        </div>

        <TagsTable
          data={tags}
          onEdit={handleEdit}
          onDelete={(row) => {
            setTags((prev) => prev.filter((t) => t.id !== row.id));
          }}
        />
      </ComponentCard>

      <TagsModal
        key={modalInstanceKey}
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editing}
      />
    </>
  );
}
