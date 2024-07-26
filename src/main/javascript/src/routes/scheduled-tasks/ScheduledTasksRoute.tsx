import { FormEvent } from "react";
import {
  ScheduledTaskListComponent,
  ScheduledTasksResponse,
  triggerTask,
  updateTaskState,
} from "@evolver-fi/evolver-basics/scheduled-task";
import {
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import {
  getScheduledTasksFilterFromSearchParams,
  getSearchParamsFromScheduledTasksFilter,
} from "./loader";

// TODO: add a creation UI to the component library
const ScheduledTasksRoute = () => {
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const taskFilter = getScheduledTasksFilterFromSearchParams(searchParams);

  const navigationState = navigation.state;

  const scheduledTasksResponse = useLoaderData() as ScheduledTasksResponse;
  const { content: scheduledTasksList, totalElements } = scheduledTasksResponse;

  const handlePageChange = (newPage: number) => {
    const params = getSearchParamsFromScheduledTasksFilter({
      ...taskFilter,
      page: newPage,
    });

    setSearchParams(params);
  };

  const handleTriggerTask = async (id: number) => {
    await triggerTask(id);
    revalidator.revalidate();
  };

  const handleUpdateTaskState = async (id: number, state: string) => {
    await updateTaskState(id, state);
    // or just a fetcher based mutation?
    revalidator.revalidate();
  };

  const handleFilterFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: this handler might be unused in the library?
    revalidator.revalidate();
  };

  // TODO: insert some scheduled tasks into the backend and actually test this
  return (
    <ScheduledTaskListComponent
      // react router navigation.state happens to match the only checked fetchStatus i.e. "loading"
      fetchStatus={navigationState}
      scheduledTasks={scheduledTasksList || []}
      scheduledTaskFilters={taskFilter}
      scheduledTasksTotalCount={totalElements || 0}
      handlePageChange={handlePageChange}
      triggerTask={handleTriggerTask}
      updateTaskState={handleUpdateTaskState}
      handleFilterFormSubmit={handleFilterFormSubmit}
    />
  );
};

export default ScheduledTasksRoute;
