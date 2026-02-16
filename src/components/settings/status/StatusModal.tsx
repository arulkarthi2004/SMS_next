"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

interface StatusFormData {
  name: string;
}

interface StatusFormErrors {
  name?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StatusFormData) => void;
  initialData?: StatusFormData | null;
}

export default function StatusModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<StatusFormData>(
    initialData ?? {
      name: "",
    }
  );
  const [errors, setErrors] = useState<StatusFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof StatusFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    const trimmedForm = { name: form.name.trim() };
    const nextErrors: StatusFormErrors = {};

    if (!trimmedForm.name) {
      nextErrors.name = "Status is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave(trimmedForm);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="m-4 max-w-[560px] p-6 sm:p-7"
    >
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        {initialData ? "Edit Status" : "Add Status"}
      </h3>

      <div className="space-y-5">
        <div>
          <Label htmlFor="status-name">Status Name</Label>
          <Input
            id="status-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter status name"
            error={Boolean(errors.name)}
            hint={errors.name}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
