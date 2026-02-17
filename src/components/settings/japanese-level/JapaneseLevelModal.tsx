"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useLanguage } from "@/context/LanguageContext";

interface JapaneseLevelFormData {
  name: string;
}

interface JapaneseLevelFormErrors {
  name?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: JapaneseLevelFormData) => void;
  initialData?: JapaneseLevelFormData | null;
}

export default function JapaneseLevelModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const { t } = useLanguage();
  const [form, setForm] = useState<JapaneseLevelFormData>(
    initialData ?? {
      name: "",
    }
  );
  const [errors, setErrors] = useState<JapaneseLevelFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof JapaneseLevelFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    const trimmedForm = { name: form.name.trim() };
    const nextErrors: JapaneseLevelFormErrors = {};

    if (!trimmedForm.name) {
      nextErrors.name = t("settings.japaneseLevel.errors.nameRequired");
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
        {initialData
          ? t("settings.japaneseLevel.editTitle")
          : t("settings.japaneseLevel.addTitle")}
      </h3>

      <div className="space-y-5">
        <div>
          <Label htmlFor="japanese-level-name">{t("settings.common.japaneseLevel")}</Label>
          <Input
            id="japanese-level-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("settings.japaneseLevel.placeholders.name")}
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
