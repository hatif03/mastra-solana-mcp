import { Mastra } from "@mastra/core/mastra";
import { solana } from "./mcp/server";
import { logger } from "./logger";

export const mastra = new Mastra({
  mcpServers: {
    solana: solana,
  },
  logger,
});


