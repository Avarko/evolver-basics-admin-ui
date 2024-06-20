import {
  TaskStatus,
  TaskStatusMap,
} from "@evolver-fi/evolver-basics/task-status";
import {
  TriggerParams,
  TriggerableResponse,
  TriggerablesComponent,
  triggerTriggerable,
} from "@evolver-fi/evolver-basics/triggerable";
import { useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

const TriggerablesRoute = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const [triggerResponse, setTriggerResponse] = useState<{
    status: number;
    data: string;
  }>();

  const triggerablesResponse = useLoaderData() as {
    triggerables: TriggerableResponse;
    activeTaskStatuses: Array<TaskStatus>;
  };

  const { activeTaskStatuses, triggerables } = triggerablesResponse;

  const taskStatusMap = activeTaskStatuses.reduce((acc, taskStatus) => {
    acc[taskStatus.id] = taskStatus;
    return acc;
  }, {} as TaskStatusMap);

  // useSubmit, route action and a useActionData could be used too
  const handleTriggerAction = async (
    triggerName: string,
    triggerParams: TriggerParams
  ): Promise<void> => {
    try {
      const response = await triggerTriggerable(triggerName, triggerParams);
      setTriggerResponse(response);
    } catch (error) {
      console.error(error);
      setTriggerResponse({
        status: 500,
        data: `Failed to trigger ${triggerName}`,
      });
    }

    revalidator.revalidate();
  };

  // TODO: revise evolver-basics
  return (
    <TriggerablesComponent
      triggerResponse={triggerResponse?.data}
      activeTaskStatuses={taskStatusMap}
      triggerables={triggerables}
      openMessageChain={(messageChainId: number): void => {
        // TODO: not implemented in the library either
        navigate(`/message-log/${messageChainId}`);
      }}
      handleTriggerAction={handleTriggerAction}
    />
  );
};

export default TriggerablesRoute;
