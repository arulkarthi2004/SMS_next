"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { useLanguage } from "@/context/LanguageContext";
import {
  ZoomInIcon,
  ZoomOutIcon,
  MaleSvgIcon,
  FemaleSvgIcon,
  PencilIcon,
  TrashBinIcon,
} from "@/icons";

type Gender = "male" | "female";

interface Student {
  id: string;
  name: string;
  image: string;
  age: number;
  gender: Gender;
  college: {
    name: string;
    url?: string;
  };
  graduationYear: number;
  department: string;
  japaneseLevel: string;
  status: string;
  selfIntro: string;
  social: {
    facebook?: string;
    linkedIn?: string;
    instagram?: string;
    x?: string;
  };
}

const students: Student[] = [
  {
    id: "STU-3001",
    name: "Aarav Sharma",
    image: "/images/cards/card-01.jpg",
    age: 22,
    gender: "male",
    college: { name: "Tokyo University", url: "https://www.u-tokyo.ac.jp/" },
    graduationYear: 2026,
    department: "Computer Science",
    japaneseLevel: "N3",
    status: "Q3",
    selfIntro:
      "Focused on web engineering and cloud fundamentals. Enjoys solving real business problems with clean UI and efficient APIs.",
    social: {
      linkedIn: "https://www.linkedin.com/",
      x: "https://x.com/",
    },
  },
  {
    id: "STU-3002",
    name: "Yui Nakamura",
    image: "/images/cards/card-02.jpg",
    age: 21,
    gender: "female",
    college: { name: "Osaka University", url: "https://www.osaka-u.ac.jp/" },
    graduationYear: 2025,
    department: "Design",
    japaneseLevel: "N2",
    status: "Q3",
    selfIntro:
      "Product design student building accessible interfaces. Interested in UX research and interaction design.",
    social: {
      instagram: "https://www.instagram.com/",
      linkedIn: "https://www.linkedin.com/",
    },
  },
  {
    id: "STU-3003",
    name: "Noah Wilson",
    image: "/images/cards/card-03.jpg",
    age: 23,
    gender: "male",
    college: { name: "Kyoto University" },
    graduationYear: 2024,
    department: "Mechanical",
    japaneseLevel: "N4",
    status: "Q2",
    selfIntro:
      "Engineering graduate transitioning into software development with an emphasis on automation and backend systems.",
    social: {
      facebook: "https://www.facebook.com/",
    },
  },
  {
    id: "STU-3004",
    name: "Mia Johnson",
    image: "/images/cards/card-01.png",
    age: 20,
    gender: "female",
    college: { name: "Tokyo University", url: "https://www.u-tokyo.ac.jp/" },
    graduationYear: 2027,
    department: "Business",
    japaneseLevel: "N5",
    status: "Q4",
    selfIntro:
      "Business student with an interest in analytics and digital strategy. Currently learning data visualization.",
    social: {
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
    },
  },
  {
    id: "STU-3005",
    name: "Riku Sato",
    image: "/images/cards/card-02.png",
    age: 24,
    gender: "male",
    college: { name: "Osaka University", url: "https://www.osaka-u.ac.jp/" },
    graduationYear: 2025,
    department: "Computer Science",
    japaneseLevel: "N1",
    status: "Q1",
    selfIntro:
      "Full-stack developer focused on performance and reliability. Loves TypeScript, testing, and developer tooling.",
    social: {
      x: "https://x.com/",
      linkedIn: "https://www.linkedin.com/",
    },
  },
  {
    id: "STU-3006",
    name: "Sofia Davis",
    image: "/images/cards/card-03.png",
    age: 22,
    gender: "female",
    college: { name: "Kyoto University" },
    graduationYear: 2026,
    department: "Computer Science",
    japaneseLevel: "N2",
    status: "Q3",
    selfIntro:
      "QA-minded developer who enjoys building robust products with clear user flows and fast feedback loops.",
    social: {
      linkedIn: "https://www.linkedin.com/",
      x: "https://x.com/",
    },
  },
];

export default function StudentListPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const collegeOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.college.name))),
    []
  );
  const departmentOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.department))),
    []
  );
  const levelOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.japaneseLevel))),
    []
  );
  const statusOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.status))),
    []
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const byName =
        search.trim().length === 0 ||
        student.name.toLowerCase().includes(search.trim().toLowerCase());

      const byCollege =
        collegeFilter === "all" || student.college.name === collegeFilter;
      const byDepartment =
        departmentFilter === "all" || student.department === departmentFilter;
      const byLevel =
        levelFilter === "all" || student.japaneseLevel === levelFilter;
      const byStatus = statusFilter === "all" || student.status === statusFilter;

      return byName && byCollege && byDepartment && byLevel && byStatus;
    });
  }, [search, collegeFilter, departmentFilter, levelFilter, statusFilter]);

  const openExpandedCard = (student: Student) => {
    setSelectedStudent(student);
    setIsExpanded(true);
    setIsFlipped(false);
    window.setTimeout(() => setIsFlipped(true), 60);
  };

  const closeExpandedCard = () => {
    setIsFlipped(false);
    window.setTimeout(() => {
      setIsExpanded(false);
      setSelectedStudent(null);
    }, 420);
  };

  useEffect(() => {
    if (isExpanded) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
    return undefined;
  }, [isExpanded]);

  const resetFilters = () => {
    setSearch("");
    setCollegeFilter("all");
    setDepartmentFilter("all");
    setLevelFilter("all");
    setStatusFilter("all");
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("studentList.pageTitle")} />

      <ComponentCard>
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03] md:grid-cols-2 xl:grid-cols-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("studentList.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />

          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="all">{t("studentList.allColleges")}</option>
            {collegeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="all">{t("studentList.allDepartments")}</option>
            {departmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="all">{t("studentList.allLevels")}</option>
            {levelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="all">{t("studentList.allStatus")}</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button size="sm" variant="outline" onClick={resetFilters}>
            {t("common.resetFilters")}
          </Button>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            {t("studentList.noResults")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group relative mx-auto w-full max-w-[270px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-white/[0.05] dark:bg-white/[0.03]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => openExpandedCard(student)}
                  className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 transition hover:scale-105 hover:bg-white dark:border-gray-700 dark:bg-gray-900/85 dark:text-white dark:hover:bg-gray-900"
                  aria-label={`${t("studentList.zoomIn")} ${student.name}`}
                >
                  <ZoomInIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </ComponentCard>

      {selectedStudent && (
        <div
          className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-4 transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeExpandedCard}
        >
          <div
            className={`w-[min(360px,88vw)] transition-all duration-500 ${
              isExpanded ? "translate-y-0 scale-100" : "translate-y-5 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] w-full [perspective:1800px]">
              <div
                className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                  isFlipped
                    ? "[transform:rotateY(180deg)_scale(1.01)]"
                    : "[transform:rotateY(0deg)_scale(1)]"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-white [backface-visibility:hidden] dark:bg-gray-900">
                  <div className="relative h-full w-full">
                    <Image
                      src={selectedStudent.image}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-3 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-gray-700 dark:bg-gray-800">
                  <div className="absolute right-2 top-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      aria-label={t("studentList.edit")}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      aria-label={t("studentList.delete")}
                    >
                      <TrashBinIcon />
                    </button>
                  </div>

                  <div className="space-y-2.5 pt-8">
                    <div className="border-b border-brand-300 pb-1.5 text-center text-xl font-semibold tracking-wide text-gray-800 dark:text-gray-100">
                      <p>{selectedStudent.name.toUpperCase()}</p>
                      <div className="mt-1 flex items-center justify-center gap-2 text-base font-medium">
                        <span>{selectedStudent.age}</span>
                        {selectedStudent.gender === "male" ? (
                          <MaleSvgIcon className="h-7 w-7" />
                        ) : (
                          <FemaleSvgIcon className="h-7 w-7" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 border-b border-brand-300 pb-2 text-center text-base text-gray-700 dark:text-gray-200">
                      <p>{t("studentList.college")}</p>
                      <p>{t("studentList.graduationYear")}</p>
                      <p className="text-base font-medium">
                        {selectedStudent.college.url ? (
                          <a
                            href={selectedStudent.college.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            {selectedStudent.college.name}
                          </a>
                        ) : (
                          selectedStudent.college.name
                        )}
                      </p>
                      <p className="text-base font-medium">{selectedStudent.graduationYear}</p>
                    </div>

                    <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-100">
                      {selectedStudent.department}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-base">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {t("studentList.japaneseLevel")}
                      </span>
                      <span className="rounded-md bg-brand-500 px-2.5 py-1 text-base text-white">
                        {selectedStudent.japaneseLevel}
                      </span>
                      <span className="rounded-md bg-brand-500 px-2.5 py-1 text-base text-white">
                        {selectedStudent.status}
                      </span>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-2.5 text-center dark:border-gray-600 dark:bg-gray-700">
                      <p className="mb-1 inline-block border border-brand-500 px-3 py-0.5 text-base text-brand-500 dark:border-brand-300 dark:text-brand-300">
                        {t("studentList.selfIntro")}
                      </p>
                      <p className="text-sm leading-5 text-gray-700 dark:text-gray-200">
                        {selectedStudent.selfIntro}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                      {selectedStudent.social.facebook && (
                        <a
                          href={selectedStudent.social.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-white text-sm font-semibold text-[#0a66c2] hover:bg-gray-100 dark:bg-gray-200"
                          aria-label={t("studentList.facebook")}
                        >
                          f
                        </a>
                      )}
                      {selectedStudent.social.linkedIn && (
                        <a
                          href={selectedStudent.social.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-white text-sm font-semibold text-[#0a66c2] hover:bg-gray-100 dark:bg-gray-200"
                          aria-label={t("studentList.linkedIn")}
                        >
                          in
                        </a>
                      )}
                      {selectedStudent.social.instagram && (
                        <a
                          href={selectedStudent.social.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-white text-sm font-semibold text-[#d62976] hover:bg-gray-100 dark:bg-gray-200"
                          aria-label={t("studentList.instagram")}
                        >
                          ig
                        </a>
                      )}
                      {selectedStudent.social.x && (
                        <a
                          href={selectedStudent.social.x}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-white text-sm font-semibold text-black hover:bg-gray-100 dark:bg-gray-200"
                          aria-label={t("studentList.x")}
                        >
                          x
                        </a>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeExpandedCard}
                    className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 transition hover:scale-105 hover:bg-white dark:border-gray-700 dark:bg-gray-900/85 dark:text-white dark:hover:bg-gray-900"
                    aria-label={t("studentList.zoomOut")}
                  >
                    <ZoomOutIcon className="h-4 w-4 " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

