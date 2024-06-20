import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import { Filter, ParamFormatterByKey } from "@evolver-fi/evolver-basics";
import { filterFromUrlSearchParams } from "@evolver-fi/evolver-basics";

import { LogFilter } from "@evolver-fi/evolver-basics/message-log";

import {
  formatDatetimeRangeFilter,
  formatNumberRangeFilter,
} from "@evolver-fi/evolver-basics";
import {
  LogListComponent,
  LogMessageResponse,
} from "@evolver-fi/evolver-basics/message-log";

const formatterByKey: ParamFormatterByKey<LogFilter> = {
  d: formatNumberRangeFilter,
  s: formatDatetimeRangeFilter,
  rqs: formatNumberRangeFilter,
  rps: formatNumberRangeFilter,
};

const formatSearchParams = (logFilters: LogFilter): URLSearchParams => {
  const result = new URLSearchParams();
  if (!logFilters || Object.keys(logFilters).length === 0) {
    return result;
  }

  Object.entries(logFilters).forEach(([key, value]) => {
    if (value) {
      const subResult: URLSearchParams =
        formatterByKey?.[key as keyof LogFilter]?.(
          value,
          key as keyof LogFilter
        ) ?? new URLSearchParams({ [key]: value });
      subResult.forEach((subValue, subKey) => {
        result.append(subKey, subValue);
      });
    }
  });

  return result;
};

const MessageLogRoute = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const logFilters = filterFromUrlSearchParams<LogFilter>(searchParams, [
    "v",
    "p",
    "s",
    "d",
    "c",
    "mci",
    "rqs",
    "rps",
    "md",
    "page",
    "size",
  ]);

  const logMessageResponse = useLoaderData() as LogMessageResponse;

  const { totalElements, content: logRows } = logMessageResponse;

  console.log("logRows", logRows);
  const handlePageChange = (page: number): void => {
    console.log("page changed to", page);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnClickRow = (id: string | number, _newWindow?: boolean) => {
    navigate(`/system-logs/${id}`);
  };

  const handleFilterChange = (value: Partial<Filter<LogFilter>>): void => {
    const newParams = formatSearchParams(value);
    setSearchParams(newParams);
  };

  const handleFilterClear = (key: keyof LogFilter): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return (
    <LogListComponent
      onPageChange={handlePageChange}
      logStatus={""}
      logRows={logRows}
      logFilters={logFilters}
      logMessageTotalCount={totalElements}
      onClickRowAction={handleOnClickRow}
      onFilterChange={handleFilterChange}
      onFilterClear={handleFilterClear}
    />
  );
};

export default MessageLogRoute;
