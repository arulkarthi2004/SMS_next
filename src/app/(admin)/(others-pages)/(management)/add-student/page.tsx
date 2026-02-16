"use client";

import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import FileInput from "@/components/form/input/FileInput";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import flatpickr from "flatpickr";
import { Japanese } from "flatpickr/dist/l10n/ja";
import { useLanguage } from "@/context/LanguageContext";

interface StudentFormData {
  photo: File | null;
  name: string;
  gender: string;
  age: string;
  college: string;
  collegeUrl: string;
  department: string;
  graduationYear: string;
  dob: string;
  japaneseLevel: string;
  selfIntro: string;
  linkedInUrl: string;
  gitUrl: string;
  portfolioUrl: string;
  email: string;
  whatsapp: string;
}

interface StudentFormErrors {
  photo?: string;
  name?: string;
  gender?: string;
  college?: string;
  linkedInUrl?: string;
  email?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^https?:\/\/.+/i;
const collegeOptions = ["Tokyo University", "Osaka University", "Kyoto University"];
const departmentOptions = ["Computer Science", "Business", "Design", "Mechanical"];
const japaneseLevelOptions = ["N5", "N4", "N3", "N2", "N1"];

const initialFormData: StudentFormData = {
  photo: null,
  name: "",
  gender: "",
  age: "",
  college: "",
  collegeUrl: "",
  department: "",
  graduationYear: "",
  dob: "",
  japaneseLevel: "",
  selfIntro: "",
  linkedInUrl: "",
  gitUrl: "",
  portfolioUrl: "",
  email: "",
  whatsapp: "",
};

export default function AddStudentPage() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<StudentFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const dobInputRef = useRef<HTMLInputElement | null>(null);
  const dobPickerRef = useRef<ReturnType<typeof flatpickr> | null>(null);

  useEffect(() => {
    if (!dobInputRef.current) {
      return;
    }

    dobPickerRef.current = flatpickr(dobInputRef.current, {
      dateFormat: "Y-m-d",
      locale: language === "ja" ? Japanese : undefined,
      allowInput: false,
      clickOpens: true,
      disableMobile: true,
      position: "below left",
      static: false,
      defaultDate: undefined,
      onReady: (_, __, instance) => {
        instance.calendarContainer.classList.add("dob-compact-picker");
      },
      onChange: (_, dateStr) => {
        setForm((prev) => ({
          ...prev,
          dob: dateStr,
        }));
      },
    });

    return () => {
      if (dobPickerRef.current && !Array.isArray(dobPickerRef.current)) {
        dobPickerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (dobPickerRef.current && !Array.isArray(dobPickerRef.current)) {
      dobPickerRef.current.setDate(form.dob || "", false);
    }
  }, [form.dob]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof StudentFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof StudentFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({
      ...prev,
      photo: file,
    }));

    if (errors.photo) {
      setErrors((prev) => ({
        ...prev,
        photo: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: StudentFormErrors = {};

    if (!form.photo) {
      nextErrors.photo = t("addStudent.errors.photoRequired");
    }
    if (!form.name.trim()) {
      nextErrors.name = t("addStudent.errors.nameRequired");
    }
    if (!form.gender) {
      nextErrors.gender = t("addStudent.errors.genderRequired");
    }
    if (!form.college.trim()) {
      nextErrors.college = t("addStudent.errors.collegeRequired");
    }
    if (!form.linkedInUrl.trim()) {
      nextErrors.linkedInUrl = t("addStudent.errors.linkedInRequired");
    } else if (!urlRegex.test(form.linkedInUrl.trim())) {
      nextErrors.linkedInUrl = t("addStudent.errors.linkedInInvalid");
    }
    if (!form.email.trim()) {
      nextErrors.email = t("addStudent.errors.emailRequired");
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = t("addStudent.errors.emailInvalid");
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setForm(initialFormData);
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("addStudent.pageTitle")} />

      <ComponentCard
        title={t("addStudent.cardTitle")}
        desc={t("addStudent.cardDesc")}
      >
        {submitted && (
          <div className="rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700 dark:border-success-500/20 dark:bg-success-500/10 dark:text-success-400">
            {t("addStudent.submitSuccess")}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Label htmlFor="student-photo">{t("addStudent.fields.studentPhoto")} *</Label>
              <FileInput
                className={errors.photo ? "border-error-500 focus:border-error-500" : ""}
                onChange={handlePhotoChange}
              />
              {errors.photo && (
                <p className="mt-1.5 text-xs text-error-500">{errors.photo}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name">{t("addStudent.fields.name")} *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.name")}
                error={Boolean(errors.name)}
                hint={errors.name}
              />
            </div>

            <div>
              <Label htmlFor="gender">{t("addStudent.fields.gender")} *</Label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleSelectChange}
                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 ${
                  errors.gender
                    ? "border-error-500 focus:border-error-500 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800"
                }`}
              >
                <option value="">{t("addStudent.select.gender")}</option>
                <option value="male">{t("addStudent.select.male")}</option>
                <option value="female">{t("addStudent.select.female")}</option>
                <option value="other">{t("addStudent.select.other")}</option>
              </select>
              {errors.gender && (
                <p className="mt-1.5 text-xs text-error-500">{errors.gender}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age">{t("addStudent.fields.age")}</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.age")}
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="college">{t("addStudent.fields.college")} *</Label>
              <select
                id="college"
                name="college"
                value={form.college}
                onChange={handleSelectChange}
                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 ${
                  errors.college
                    ? "border-error-500 focus:border-error-500 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800"
                }`}
              >
                <option value="">{t("addStudent.select.college")}</option>
                {collegeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.college && (
                <p className="mt-1.5 text-xs text-error-500">{errors.college}</p>
              )}
            </div>

            <div>
              <Label htmlFor="collegeUrl">{t("addStudent.fields.collegeUrl")}</Label>
              <Input
                id="collegeUrl"
                name="collegeUrl"
                type="url"
                value={form.collegeUrl}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.collegeUrl")}
              />
            </div>

            <div>
              <Label htmlFor="department">{t("addStudent.fields.department")}</Label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleSelectChange}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="">{t("addStudent.select.department")}</option>
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="graduationYear">{t("addStudent.fields.graduationYear")}</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                value={form.graduationYear}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.graduationYear")}
              />
            </div>

            <div>
              <Label htmlFor="dob">{t("addStudent.fields.dob")}</Label>
              <input
                id="dob"
                name="dob"
                type="text"
                ref={dobInputRef}
                value={form.dob}
                readOnly
                placeholder={t("addStudent.placeholders.dob")}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <Label htmlFor="japaneseLevel">{t("addStudent.fields.japaneseLevel")}</Label>
              <select
                id="japaneseLevel"
                name="japaneseLevel"
                value={form.japaneseLevel}
                onChange={handleSelectChange}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="">{t("addStudent.select.japaneseLevel")}</option>
                {japaneseLevelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="selfIntro">{t("addStudent.fields.selfIntro")}</Label>
              <TextArea
                placeholder={t("addStudent.placeholders.selfIntro")}
                value={form.selfIntro}
                onChange={(value) => setForm((prev) => ({ ...prev, selfIntro: value }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="linkedInUrl">{t("addStudent.fields.linkedInUrl")} *</Label>
              <Input
                id="linkedInUrl"
                name="linkedInUrl"
                type="url"
                value={form.linkedInUrl}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.linkedInUrl")}
                error={Boolean(errors.linkedInUrl)}
                hint={errors.linkedInUrl}
              />
            </div>

            <div>
              <Label htmlFor="gitUrl">{t("addStudent.fields.gitUrl")}</Label>
              <Input
                id="gitUrl"
                name="gitUrl"
                type="url"
                value={form.gitUrl}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.gitUrl")}
              />
            </div>

            <div>
              <Label htmlFor="portfolioUrl">{t("addStudent.fields.portfolioUrl")}</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                value={form.portfolioUrl}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.portfolioUrl")}
              />
            </div>

            <div>
              <Label htmlFor="email">{t("addStudent.fields.email")} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.email")}
                error={Boolean(errors.email)}
                hint={errors.email}
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">{t("addStudent.fields.whatsapp")}</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={handleInputChange}
                placeholder={t("addStudent.placeholders.whatsapp")}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm">
              {t("addStudent.saveStudent")}
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
