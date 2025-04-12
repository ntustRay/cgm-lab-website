// Basic news item type
export type News = {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
};

// Person type for director and students
export type Person = {
  id: string;
  name: string;
  chineseName?: string;
  title?: string;
  department?: string;
  university?: string;
  imageUrl?: string;
  email?: string;
  researchInterests?: string[];
  contact?: {
    email: string;
    phone?: string;
    fax?: string;
    address?: string;
  };
  graduationYear?: number;
};

// More types to be added as we develop the app...