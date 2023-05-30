export type StrapiObject<T> = {
  id: number;
  attributes: T;
};

export type CalendarEvent = {
  Name: string;
  Description: string;
  StartDate: string; // ISO 8601
  EndDate: string; // ISO 8601
  Tag: "art" | "fashion" | "social" | "food";
};
