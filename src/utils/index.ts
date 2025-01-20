import type { QueryParams } from "../types";

export const getStringifyQuery = (query: Record<string, any>) => {
  return Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => {
      if (typeof value === "number") {
        return `${key}=${value.toString()}`;
      }

      if (value === undefined) {
        return "";
      }
      return `${key}=${value}`;
    })
    .join("&");
};

export const setOffset = (page: number, limit: number) => {
  return (page - 1) * Number(limit);
};

export const getCurrentPage = (offset: number, limit: number) => {
  return Math.ceil(offset / limit) + 1;
};

export function parseQueryString(queryString: string): QueryParams {
  const params: Record<string, string> = {};
  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = value;
  });

  return {
    limit: parseInt(params.limit || "10", 10),
    offset: parseInt(params.offset || "0", 10),
    categories: params.categories,
  };
}
