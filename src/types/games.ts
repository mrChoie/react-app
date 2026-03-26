export type GameRow = {
  Name?: string;
  Platform?: string;
  Year_of_Release?: string;
  Genre?: string;
  Publisher?: string;
  User_Count?: string;
  Global_Sales?: string;
  [key: string]: string | undefined;
};

export type RankingOption = "none" | "userCount" | "globalSales" | "yearRelease";

export type GameFilters = {
  genre: string;
  platform: string;
  year: string;
  publisher: string;
  ranking: RankingOption;
  search: string;
};
