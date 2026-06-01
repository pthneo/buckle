import { queryOptions } from "@tanstack/react-query";

function categoryListUrl(category: Category) {
  return `/api/${category}`;
}

function categoryDetailUrl(category: Category, id: string) {
  return `/api/${category}/${id}`;
}

async function fetchCategoryList(category: Category): Promise<ServiceResult[]> {
  const response = await fetch(categoryListUrl(category));
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  return response.json();
}

async function fetchCategoryDetail(category: Category, id: string): Promise<ServiceResult> {
  const response = await fetch(categoryDetailUrl(category, id));
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} entry`);
  }
  return response.json();
}

export const categoryQueries = {
  list: (category: Category) =>
    queryOptions({
      queryKey: ["category", category],
      queryFn: () => fetchCategoryList(category),
    }),
  detail: (category: Category, id: string) =>
    queryOptions({
      queryKey: ["category", category, id],
      queryFn: () => fetchCategoryDetail(category, id),
    }),
};
