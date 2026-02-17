"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useLanguage } from "@/context/LanguageContext";

interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface TeacherFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TeacherFormData) => void;
  initialData?: TeacherFormData | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TeacherModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const { t } = useLanguage();
  const [form, setForm] = useState<TeacherFormData>(
    initialData ?? {
      firstName: "",
      lastName: "",
      email: "",
    }
  );
  const [errors, setErrors] = useState<TeacherFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof TeacherFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    const trimmedForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    };

    const nextErrors: TeacherFormErrors = {};

    if (!trimmedForm.firstName) {
      nextErrors.firstName = t("addTeacher.errors.firstNameRequired");
    }
    if (!trimmedForm.lastName) {
      nextErrors.lastName = t("addTeacher.errors.lastNameRequired");
    }
    if (!trimmedForm.email) {
      nextErrors.email = t("addTeacher.errors.emailRequired");
    } else if (!emailRegex.test(trimmedForm.email)) {
      nextErrors.email = t("addTeacher.errors.emailInvalid");
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
      className="m-4 max-w-[620px] p-6 sm:p-7"
    >
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        {initialData ? t("addTeacher.editTitle") : t("addTeacher.addTitle")}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="teacher-first-name">{t("profile.firstName")}</Label>
          <Input
            id="teacher-first-name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder={t("addTeacher.placeholders.firstName")}
            error={Boolean(errors.firstName)}
            hint={errors.firstName}
          />
        </div>
        <div>
          <Label htmlFor="teacher-last-name">{t("profile.lastName")}</Label>
          <Input
            id="teacher-last-name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder={t("addTeacher.placeholders.lastName")}
            error={Boolean(errors.lastName)}
            hint={errors.lastName}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="teacher-email">{t("profile.email")}</Label>
          <Input
            id="teacher-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("addTeacher.placeholders.email")}
            error={Boolean(errors.email)}
            hint={errors.email}
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
