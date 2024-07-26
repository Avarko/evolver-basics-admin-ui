import { filterFromUrlSearchParams } from "@evolver-fi/evolver-basics";
import {
  fetchMessageById,
  fetchMessages,
  MessageFilter,
} from "@evolver-fi/evolver-basics/messages";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

export const singleMessageLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    if (!params.id) {
      throw new Error("No message id provided"); // shouldn't route here without an id
    }
    const response = await fetchMessageById(params.id);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch message: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const messageListLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const requestUrl = new URL(request.url);
    const filter = filterFromUrlSearchParams<MessageFilter>(
      requestUrl.searchParams,
      ["s", "mci", "ct", "lut", "fc", "mgi", "p", "md", "page", "size"] // TODO: should sort be included?
    );

    const response = await fetchMessages(filter);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch messages: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
