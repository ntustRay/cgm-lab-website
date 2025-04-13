// Basic news item type
export type News = {
  id: string;
  date: string;
  content: string;
  isPinned?: boolean;
};

// Award type
export type Award = {
  id: string;
  content: string[];
  date: string;
};

// CGM Life event type
export type CGMLifeEvent = {
  id: string;
  title: string;
  date: string;
  imagePreviewUrl: string;
  linkPath: string;
};

export type Director = {
  id: string;
  name: string;
  chineseName?: string;
  title?: string;
  department?: string;
  university?: string;
  introduction?: string;
  researchInterests?: string[];
  contact?: {
    email: string;
    phone?: string;
    fax?: string;
    address?: string;
  };
  imageUrl?: string;
};

// Type for Student information
export type Student = {
  id: string;
  academicYear: number;
  name: string;
  hobby?: string;
  expert?: string;
  personalLink?: string;
  email?: string;
  status: "PhD" | "MS" | "EMBA"; // Or other relevant statuses
  graduated: boolean;
  imageUrl?: string;
};

// Publication type
export type Publication = {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: number;
  link?: string;
};

// Research Project type
export type ResearchProject = {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  team?: string[];
  publications?: {
    title: string;
    conference: string;
    link?: string;
  }[];
};

// Seminar type
export type Seminar = {
  id: string;
  date: string;
  topic: string;
  speaker: string;
  title: string;
};