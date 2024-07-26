import { getBackendClient } from "@evolver-fi/evolver-basics";
import {
  JwtComponent,
  JwtToken,
  JwtTokenResponse,
  TokenOperations,
  TokenOperationState,
} from "@evolver-fi/evolver-basics/jwt";
import { useState } from "react";
import {
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import {
  getPageFilterFromSearchParams,
  getSearchParamsFromPageFilter,
} from "./loader";

const JwtTokensRoute = () => {
  const [openTokenId, setOpenTokenId] = useState<number | "new" | undefined>(
    undefined
  );
  const [deleteStatus, setDeleteStatus] =
    useState<TokenOperationState>("uninitialized");
  const [saveStatus, setSaveStatus] =
    useState<TokenOperationState>("uninitialized");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const jwtData = useLoaderData() as JwtTokenResponse;

  if (!jwtData) return "Loading...";

  const { content, number, totalPages } = jwtData;

  const handleTokenDelete = async (tokenId: number) => {
    try {
      setDeleteStatus("loading");
      const client = getBackendClient();
      await client.post(`/jwt/${tokenId}/delete`);
      setDeleteStatus("success");
    } catch (error) {
      setDeleteStatus("error");
    }

    revalidator.revalidate();
  };

  const handleTokenSave = async (token: JwtToken) => {
    try {
      setSaveStatus("loading");
      const client = getBackendClient();
      await client.post("/jwt", token);
      setSaveStatus("success");
    } catch (error) {
      setSaveStatus("error");
    }
    revalidator.revalidate();
  };

  const handlePageChange = (value: number) => {
    const pageFilter = getPageFilterFromSearchParams(searchParams);
    pageFilter.page = value;
    setSearchParams(getSearchParamsFromPageFilter(pageFilter));
  };

  const handleTokenExpandedChange = (
    isExpanded: boolean,
    tokenId: number | "new" | undefined
  ) => {
    if (isExpanded) {
      setOpenTokenId(tokenId);
    } else {
      setOpenTokenId(undefined);
    }

    setDeleteStatus("uninitialized");
    setSaveStatus("uninitialized");
  };

  // TODO: right now the status states are shared between all tokens. Differentiate between them or reset when changing token
  const tokenOperations: TokenOperations = {
    onTokenDelete: handleTokenDelete,
    onTokenSave: handleTokenSave,
    deleteStatus: deleteStatus,
    saveStatus: saveStatus,
  };

  return (
    <JwtComponent
      tokens={content ?? []}
      isLoading={navigation.state !== "idle"}
      isError={false}
      openTokenId={openTokenId}
      tokenOperations={tokenOperations}
      page={number}
      totalNumberOfPages={totalPages}
      onPageChange={handlePageChange}
      onExpandedChange={handleTokenExpandedChange}
    />
  );
};

export default JwtTokensRoute;
