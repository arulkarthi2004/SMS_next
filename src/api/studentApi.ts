import api from "./axios";

export type Gender = "male" | "female";

export interface Student {
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

interface StudentListResponse {
  status?: boolean;
  code?: number;
  message?: string;
  data?: unknown;
}

const toSafeString = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  return fallback;
};

const toSafeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return fallback;
};

const toGender = (value: unknown): Gender => {
  const normalized = toSafeString(value).toLowerCase();
  return normalized === "female" ? "female" : "male";
};

const extractStudentsArray = (rawData: unknown): unknown[] => {
  if (Array.isArray(rawData)) {
    return rawData;
  }

  if (rawData && typeof rawData === "object") {
    const dataObject = rawData as Record<string, unknown>;

    if (Array.isArray(dataObject.students)) {
      return dataObject.students;
    }

    if (Array.isArray(dataObject.list)) {
      return dataObject.list;
    }

    if (Array.isArray(dataObject.items)) {
      return dataObject.items;
    }
  }

  return [];
};

const normalizeStudent = (raw: unknown, index: number): Student => {
  const row = (raw ?? {}) as Record<string, unknown>;
  const college = (row.college ?? {}) as Record<string, unknown>;

  return {
    id: toSafeString(row.id, `STU-${index + 1}`),
    name: toSafeString(row.name, "Unknown Student"),
    image: toSafeString(row.image, "/images/cards/card-01.jpg"),
    age: toSafeNumber(row.age, 0),
    gender: toGender(row.gender),
    college: {
      name: toSafeString(
        row.college_name ?? college.name,
        "Unknown College"
      ),
      url: toSafeString(row.college_url ?? college.url),
    },
    graduationYear: toSafeNumber(row.graduation_year ?? row.graduationYear, 0),
    department: toSafeString(row.department, "-"),
    japaneseLevel: toSafeString(
      row.japanese_level ?? row.japaneseLevel,
      "-"
    ),
    status: toSafeString(row.status, "-"),
    selfIntro: toSafeString(row.self_intro ?? row.selfIntro, "-"),
    social: {
      facebook: toSafeString(row.facebook ?? row.facebook_url),
      linkedIn: toSafeString(row.linkedin ?? row.linkedin_url),
      instagram: toSafeString(row.instagram ?? row.instagram_url),
      x: toSafeString(row.x ?? row.x_url),
    },
  };
};

export const getStudentListApi = async (): Promise<Student[]> => {
  const response = await api.get<StudentListResponse>("/student/list");
  const rows = extractStudentsArray(response.data.data);
  return rows.map(normalizeStudent);
};

