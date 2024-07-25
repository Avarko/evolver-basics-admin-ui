import { getBackendClient } from "@evolver-fi/evolver-basics";
import {
  JwtList,
  JwtToken,
  JwtTokenResponse,
  TokenOperations,
} from "@evolver-fi/evolver-basics/jwt";
import { useState } from "react";
import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";

const JwtTokensRoute = () => {
  const [openTokenId, setOpenTokenId] = useState<number | undefined>(undefined);

  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const jwtData = useLoaderData() as JwtTokenResponse;

  if (!jwtData) return "Loading...";

  const { content } = jwtData;

  const handleTokenDelete = async (tokenId: number) => {
    const client = getBackendClient();

    // TODO: show this be wrapped in a try/catch block?
    await client.post(`/jwt/${tokenId}`);

    revalidator.revalidate();
  };

  const handleTokenSave = async (token: JwtToken) => {
    const client = getBackendClient();
    await client.post("/jwt", token);

    revalidator.revalidate();
  };

  // TODO: right now the status states are shared between all tokens. Differentiate between them or reset when changing token
  const tokenOperations: TokenOperations = {
    onTokenDelete: handleTokenDelete,
    onTokenSave: handleTokenSave,
    deleteStatus: "uninitialized",
    saveStatus: "uninitialized",
  };

  return (
    <JwtList
      tokens={content ?? []}
      isLoading={navigation.state !== "idle"}
      isError={false}
      openTokenId={openTokenId}
      onExpandedChange={(isExpanded, tokenId) => {
        setOpenTokenId(isExpanded ? tokenId : undefined);
      }}
      tokenOperations={tokenOperations}
    />
  );
};

export default JwtTokensRoute;
