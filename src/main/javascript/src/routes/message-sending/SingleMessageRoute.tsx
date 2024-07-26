import { Message, MessageComponent } from "@evolver-fi/evolver-basics/messages";
import { useLoaderData, useNavigate } from "react-router-dom";

const SingleMessageRoute = () => {
  const message = useLoaderData() as Message;

  const navigate = useNavigate();

  const handleBackAction = () => {
    navigate(-1);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDownloadDataAction = (_id: number, _type: string) => {
    // download data from /messages/:id/download
    // TODO: download not implemented in the component library
  };

  if (!message) {
    return <div>Loading...</div>; // TODO: handle 404, maybe in the loader?
  }

  // TODO: insert some messages into the backend and actually test this
  return (
    <MessageComponent
      message={message}
      backAction={handleBackAction}
      downloadDataAction={handleDownloadDataAction}
    />
  );
};

export default SingleMessageRoute;
