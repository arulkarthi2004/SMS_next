"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
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
      nextErrors.name = t("settings.status.errors.nameRequired");
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
        {initialData ? t("settings.status.editTitle") : t("settings.status.addTitle")}
      </h3>

      <div className="space-y-5">
        <div>
          <Label htmlFor="status-name">{t("settings.common.statusName")}</Label>
          <Input
            id="status-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("settings.status.placeholders.name")}
            error={Boolean(errors.name)}
            hint={errors.name}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button size="sm" variant="outline" onClick={onClose}>
          {t("common.cancel")}
        </Button>
        <Button size="sm" onClick={handleSave}>
          {t("common.save")}
        </Button>
      </div>
    </Modal>
  );
}
