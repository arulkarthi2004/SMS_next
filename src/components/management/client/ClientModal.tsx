"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface ClientFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
  initialData?: ClientFormData | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ClientModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<ClientFormData>(
    initialData ?? {
      firstName: "",
      lastName: "",
      email: "",
    }
  );
  const [errors, setErrors] = useState<ClientFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ClientFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    const trimmedForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    };

    const nextErrors: ClientFormErrors = {};

    if (!trimmedForm.firstName) {
      nextErrors.firstName = "First name is required.";
    }
    if (!trimmedForm.lastName) {
      nextErrors.lastName = "Last name is required.";
    }
    if (!trimmedForm.email) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(trimmedForm.email)) {
      nextErrors.email = "Enter a valid email address.";
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
        {initialData ? "Edit Client" : "Add Client"}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="client-first-name">First Name</Label>
          <Input
            id="client-first-name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            error={Boolean(errors.firstName)}
            hint={errors.firstName}
          />
        </div>
        <div>
          <Label htmlFor="client-last-name">Last Name</Label>
          <Input
            id="client-last-name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            error={Boolean(errors.lastName)}
            hint={errors.lastName}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="client-email">Email</Label>
          <Input
            id="client-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={Boolean(errors.email)}
            hint={errors.email}
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
