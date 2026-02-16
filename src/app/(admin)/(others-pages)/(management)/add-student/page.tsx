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
      locale: Japanese,
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
      nextErrors.photo = "Student photo is required.";
    }
    if (!form.name.trim()) {
      nextErrors.name = "Student name is required.";
    }
    if (!form.gender) {
      nextErrors.gender = "Gender is required.";
    }
    if (!form.college.trim()) {
      nextErrors.college = "College is required.";
    }
    if (!form.linkedInUrl.trim()) {
      nextErrors.linkedInUrl = "LinkedIn URL is required.";
    } else if (!urlRegex.test(form.linkedInUrl.trim())) {
      nextErrors.linkedInUrl = "LinkedIn URL must start with http:// or https://";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email ID is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
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
      <PageBreadcrumb pageTitle="Add Student" />

      <ComponentCard
        title="Student Registration"
        desc="Fields marked with * are required."
      >
        {submitted && (
          <div className="rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700 dark:border-success-500/20 dark:bg-success-500/10 dark:text-success-400">
            Student details submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Label htmlFor="student-photo">Student Photo *</Label>
              <FileInput
                className={errors.photo ? "border-error-500 focus:border-error-500" : ""}
                onChange={handlePhotoChange}
              />
              {errors.photo && (
                <p className="mt-1.5 text-xs text-error-500">{errors.photo}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
                error={Boolean(errors.name)}
                hint={errors.name}
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
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
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1.5 text-xs text-error-500">{errors.gender}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleInputChange}
                placeholder="Enter age"
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="college">College *</Label>
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
                <option value="">Select college</option>
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
              <Label htmlFor="collegeUrl">College URL</Label>
              <Input
                id="collegeUrl"
                name="collegeUrl"
                type="url"
                value={form.collegeUrl}
                onChange={handleInputChange}
                placeholder="https://college.example"
              />
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleSelectChange}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="">Select department</option>
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                value={form.graduationYear}
                onChange={handleInputChange}
                placeholder="Enter graduation year"
              />
            </div>

            <div>
              <Label htmlFor="dob">DOB</Label>
              <input
                id="dob"
                name="dob"
                type="text"
                ref={dobInputRef}
                value={form.dob}
                readOnly
                placeholder="YYYY-MM-DD"
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <Label htmlFor="japaneseLevel">Japanese Level</Label>
              <select
                id="japaneseLevel"
                name="japaneseLevel"
                value={form.japaneseLevel}
                onChange={handleSelectChange}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="">Select Japanese level</option>
                {japaneseLevelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="selfIntro">Self Intro</Label>
              <TextArea
                placeholder="Write self introduction"
                value={form.selfIntro}
                onChange={(value) => setForm((prev) => ({ ...prev, selfIntro: value }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="linkedInUrl">LinkedIn URL *</Label>
              <Input
                id="linkedInUrl"
                name="linkedInUrl"
                type="url"
                value={form.linkedInUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
                error={Boolean(errors.linkedInUrl)}
                hint={errors.linkedInUrl}
              />
            </div>

            <div>
              <Label htmlFor="gitUrl">Git URL</Label>
              <Input
                id="gitUrl"
                name="gitUrl"
                type="url"
                value={form.gitUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <Label htmlFor="portfolioUrl">Portfolio URL</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                value={form.portfolioUrl}
                onChange={handleInputChange}
                placeholder="https://portfolio.example"
              />
            </div>

            <div>
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="student@example.com"
                error={Boolean(errors.email)}
                hint={errors.email}
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp No.</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={handleInputChange}
                placeholder="+1 555 555 5555"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Save Student
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
