import {
  TaskStatus,
  fetchActiveTaskStatuses,
} from "@evolver-fi/evolver-basics/task-status";
import {
  TriggerableResponse,
  fetchTriggerables,
} from "@evolver-fi/evolver-basics/triggerable";

import { LoaderFunction } from "react-router-dom";

export const loader: LoaderFunction = async (): Promise<{
  triggerables: TriggerableResponse;
  activeTaskStatuses: Array<TaskStatus>;
}> => {
  try {
    const triggerablesResponse = await fetchTriggerables();
    const activeTaskStatusesResponse = await fetchActiveTaskStatuses();
    const { data: triggerables } = triggerablesResponse;
    const { data: activeTaskStatuses } = activeTaskStatusesResponse;
    return { triggerables, activeTaskStatuses };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch triggerables");
  }
};
