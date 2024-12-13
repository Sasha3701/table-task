import queryString from "query-string";
import { type IData } from "../types";

export const filterData = (data: Array<IData>, param: string): Array<IData> => 
  data.filter(item => JSON.stringify(item).includes(param));

export const sortData = (data: Array<IData>, param: string, orderBy: 'asc' | 'desc' | null): Array<IData> => {
  if (!data.length || !(param in data[0])) {
    return data;
  }

  const cloneData = [...data];

  cloneData.sort((a, b) => {
    if (a[param as keyof IData] < b[param as keyof IData]) {
      return orderBy === 'asc' ? -1 : 1;
    }
    if (a[param as keyof IData] > b[param as keyof IData]) {
      return orderBy === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return cloneData;
};

export const getOrderQuery = (search: string) => {
    const query = queryString.parse(search);

    if (query?.order) {
      switch(query?.order) {
        case 'asc': {
          return 'asc';
        }

        case 'desc': {
          return 'desc';
        }

        default: {
          return null;
        }
      }
    }

    return null;
};

export const getSearchQuery = (search: string) => {
  const searchQuery = queryString.parse(search)?.search;

  if (typeof searchQuery === 'string') {
    return searchQuery;
  }

  return '';
};

export const getSortQuery = (search: string) => {
  const sortQuery = queryString.parse(search)?.sort;

  if (typeof sortQuery === 'string') {
    return sortQuery;
  }

  return undefined;
};

export const createNewQuery = (search: string, obj: Record<string, string | undefined>): string => {
  const currentQuery = queryString.parse(search);
  const newQuery = queryString.stringify({
    ...currentQuery,
    ...obj,
  });

  return newQuery;
};
