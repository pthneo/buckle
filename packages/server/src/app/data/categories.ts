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
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? response.statusText ?? `HTTP ${response.status}`);
  }
  return response.json();
}

async function fetchCategoryDetail(category: Category, id: string): Promise<ServiceResult> {
  const response = await fetch(categoryDetailUrl(category, id));
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? response.statusText ?? `HTTP ${response.status}`);
  }
  return response.json();
}

export const categoryQueries = {
  list: (category: Category) =>
    queryOptions({
      queryKey: ["category", category],
      queryFn: () => fetchCategoryList(category),
      meta: { errorMessage: `Failed to fetch ${category}` },
    }),
  detail: (category: Category, id: string) =>
    queryOptions({
      queryKey: ["category", category, id],
      queryFn: () => fetchCategoryDetail(category, id),
      meta: { errorMessage: `Failed to fetch ${category.slice(0, -1)}` },
    }),
};
