import { getBackendClient } from "@evolver-fi/evolver-basics";
import { JwtTokenResponse } from "@evolver-fi/evolver-basics/jwt";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

// TODO: should be in evolver-basics
export type PageFilter = {
  page: number;
  size?: number;
};

// TODO: should be a shared utility
export const getPageFilterFromSearchParams = (
  searchParams: URLSearchParams
): PageFilter => {
  const filter: PageFilter = {
    page: 0,
    size: 100,
  };

  if (searchParams.has("page")) {
    try {
      const parsedPage = parseInt(searchParams.get("page") ?? "", 10);
      if (!isNaN(parsedPage)) {
        filter.page = parsedPage;
      }
    } catch (e) {
      // do nothing
    }
  }

  if (searchParams.has("size")) {
    try {
      const parsedSize = parseInt(searchParams.get("size") ?? "", 10);
      if (!isNaN(parsedSize)) {
        filter.size = parsedSize;
      }
    } catch (e) {
      // do nothing
    }
  }

  return filter;
};

export const getSearchParamsFromPageFilter = (
  filter: PageFilter
): URLSearchParams => {
  const params = new URLSearchParams();
  params.append("page", filter.page.toString());
  if (filter.size) {
    params.append("size", filter.size.toString());
  }
  return params;
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<JwtTokenResponse> => {
  try {
    const requestUrl = new URL(request.url);
    const filter = getPageFilterFromSearchParams(requestUrl.searchParams);
    const searchParams = getSearchParamsFromPageFilter(filter);

    const client = getBackendClient();

    const queryUrl = `/jwt?${searchParams.toString()}`;

    const jwtTokenResponse = await client.get(queryUrl);

    const { data } = jwtTokenResponse;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch");
  }
};
