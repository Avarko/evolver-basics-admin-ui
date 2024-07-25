import {
  ScheduledTaskFilter,
  ScheduledTasksResponse,
  fetchScheduledTasks,
} from "@evolver-fi/evolver-basics/scheduled-task";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

export const getSearchParamsFromScheduledTasksFilter = (
  filter: ScheduledTaskFilter
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  if (filter.page !== 0) {
    searchParams.set("page", filter.page.toString());
  }

  if (filter.size && filter.size !== 100) {
    searchParams.set("size", filter.size.toString());
  }

  return searchParams;
};

// TODO: converting between url params and structured data belongs in the evolver-basics package
export const getScheduledTasksFilterFromSearchParams = (
  searchParams: URLSearchParams
): ScheduledTaskFilter => {
  const filter: ScheduledTaskFilter = {
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

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<ScheduledTasksResponse> => {
  try {
    const requestUrl = new URL(request.url);
    const filter = getScheduledTasksFilterFromSearchParams(
      requestUrl.searchParams
    );

    const scheduledTaskResponse = await fetchScheduledTasks(filter);
    const { data } = scheduledTaskResponse;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch scheduled tasks");
  }
};
