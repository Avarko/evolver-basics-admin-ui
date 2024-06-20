import { LogMessageResponse } from "@evolver-fi/evolver-basics/message-log";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<LogMessageResponse> => {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;

  // TODO: use utilities from @evolver-fi/evolver-basics
  const apiUrl = new URL("http://localhost:8080/log");
  searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value);
  });

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  return response.json();
};
