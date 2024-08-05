import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import {
  createOrUpdateScheduledTask,
  deleteScheduledTaskById,
  ScheduledTask,
  ScheduledTaskForm,
} from "@evolver-fi/evolver-basics/scheduled-task";
import { Alert, Collapse } from "@mui/material";

// TODO: the component library needs a reusable toast component
type ToastProps = {
  severity: "success" | "error";
  message: string;
};

const ScheduledTaskFormRoute = () => {
  // workaround for the missing toast functionality
  const [isDeleted, setIsDeleted] = useState(false);
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  const data = useLoaderData() as ScheduledTask;
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (isDeleted || id === "new") return;

    const response = await deleteScheduledTaskById(data.id);
    const { status } = response;

    if (status === 204) {
      setIsDeleted(true);
      setToastProps({ severity: "success", message: "Task deleted" });
      setTimeout(() => {
        navigate("/scheduled-tasks");
      }, 3000);
    }

    if (status === 404) {
      setToastProps({ severity: "error", message: "Task not found" });
    }

    if (status === 500) {
      setToastProps({ severity: "error", message: "Server error" });
    }
  };

  // TODO: might have to be an action to handle revalidation and redirection
  const handleSave = async (newTask: ScheduledTask) => {
    if (isDeleted) return;

    const response = await createOrUpdateScheduledTask(newTask);

    if (response.status === 204) {
      if (id === "new") {
        setToastProps({ severity: "success", message: "Task created" });
        setTimeout(() => {
          navigate("/scheduled-tasks");
        }, 3000);
      } else {
        setToastProps({ severity: "success", message: "Task updated" });
      }
    } else {
      setToastProps({ severity: "error", message: "Failed to save task" });
    }
  };

  return (
    <>
      <Collapse in={toastProps !== null} unmountOnExit>
        <Alert severity={toastProps?.severity}>{toastProps?.message}</Alert>
      </Collapse>
      <ScheduledTaskForm
        task={data}
        onSave={handleSave}
        onDelete={handleDelete}
        onBack={() => {
          navigate("/scheduled-tasks");
        }}
      />
    </>
  );
};

export default ScheduledTaskFormRoute;
