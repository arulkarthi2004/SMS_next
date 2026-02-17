"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useLanguage } from "@/context/LanguageContext";

interface CollegeFormData {
  name: string;
  location: string;
}

interface CollegeFormErrors {
  name?: string;
  location?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CollegeFormData) => void;
  initialData?: CollegeFormData | null;
}

export default function CollegeModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const { t } = useLanguage();
  const [form, setForm] = useState<CollegeFormData>(
    initialData ?? {
      name: "",
      location: "",
    }
  );
  const [errors, setErrors] = useState<CollegeFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CollegeFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSave = () => {
    const trimmedForm = {
      name: form.name.trim(),
      location: form.location.trim(),
    };

    const nextErrors: CollegeFormErrors = {};

    if (!trimmedForm.name) {
      nextErrors.name = t("settings.college.errors.nameRequired");
    }

    if (!trimmedForm.location) {
      nextErrors.location = t("settings.college.errors.locationRequired");
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
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
        {initialData ? t("settings.college.editTitle") : t("settings.college.addTitle")}
      </h3>

      <div className="space-y-5">
        <div>
          <Label htmlFor="college-name">{t("settings.common.collegeName")}</Label>
          <Input
            id="college-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("settings.college.placeholders.name")}
            error={Boolean(errors.name)}
            hint={errors.name}
          />
        </div>

        <div>
          <Label htmlFor="college-location">{t("settings.common.location")}</Label>
          <Input
            id="college-location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder={t("settings.college.placeholders.location")}
            error={Boolean(errors.location)}
            hint={errors.location}
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
