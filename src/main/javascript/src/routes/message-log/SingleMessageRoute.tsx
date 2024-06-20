import {
  LogMessageComponent,
  LogMessageResponse,
} from "@evolver-fi/evolver-basics/message-log";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const SingleMessageRoute = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id, 10) : 0;

  const { content } = data as LogMessageResponse;

  const message = content.find((message) => message.id === parsedId);

  return (
    <LogMessageComponent
      message={message}
      backAction={() => navigate("..", { relative: "path" })}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      downloadDataAction={function (_id: number, _type: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default SingleMessageRoute;
