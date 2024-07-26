import {
  createFilterQuery,
  filterFromUrlSearchParams,
} from "@evolver-fi/evolver-basics";
import {
  formatterByKey,
  MessageFilter,
  MessageListComponent,
  MessageResponse,
} from "@evolver-fi/evolver-basics/messages";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

const MessageSendingRoute = () => {
  const navigate = useNavigate();

  const data = useLoaderData() as MessageResponse;
  const { content, totalElements } = data;

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = filterFromUrlSearchParams<MessageFilter>(searchParams, [
    "s",
    "mci",
    "ct",
    "lut",
    "fc",
    "mgi",
    "p",
    "md",
    "page",
    "size",
    "sort",
  ]);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickRowAction = (id: string | number, _newWindow?: boolean) => {
    navigate(`./${id}`, { relative: "path" });
  };

  const handleFilterChange = (value: MessageFilter) => {
    const newSearchParams = createFilterQuery(value, formatterByKey);
    setSearchParams(newSearchParams);
  };

  return (
    <MessageListComponent
      onPageChange={handlePageChange}
      messageStatus={""}
      messageRows={content}
      messageFilters={filters}
      messageTotalCount={totalElements}
      onClickRowAction={handleClickRowAction}
      onFilterChange={handleFilterChange}
    />
  );
};

export default MessageSendingRoute;
