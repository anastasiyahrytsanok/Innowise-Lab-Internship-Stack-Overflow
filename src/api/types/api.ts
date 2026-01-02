export type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type Links = {
  first: string;
  previous: string;
  current: string;
  next: string;
  last: string;
};
