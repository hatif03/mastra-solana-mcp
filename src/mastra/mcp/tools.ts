import { z } from "zod";
import { createTool } from "@mastra/core/tools";
import {
  getBalanceHandler,
  getTokenAccountsHandler,
  getTokenBalanceHandler,
  createTransactionMessageHandler,
  signTransactionMessageHandler,
  sendTransactionHandler,
  generateKeyPairHandler,
  importPrivateKeyHandler,
  validateAddressHandler,
  checkTransactionHandler,
  switchNetworkHandler,
  getCurrentNetworkHandler,
} from "../handlers/wallet";

export const getBalance = createTool({
  id: "wallet_get_balance",
  description: "Get the balance of a Solana address (uses default wallet if no publicKey provided)",
  inputSchema: z.object({
    publicKey: z.string().optional().describe("The public key to get balance for"),
    commitment: z.enum(["confirmed", "finalized", "processed"]).optional().describe("The commitment level for the query"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await getBalanceHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error getting balance: ${error.message}`;
    }
  },
});

export const getTokenAccounts = createTool({
  id: "wallet_get_token_accounts",
  description: "Get the token accounts owned by a Solana address (uses default wallet if no publicKey provided)",
  inputSchema: z.object({
    publicKey: z.string().optional().describe("The public key to get token accounts for"),
    commitment: z.enum(["confirmed", "finalized", "processed"]).optional().describe("The commitment level for the query"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await getTokenAccountsHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error getting token accounts: ${error.message}`;
    }
  },
});

export const getTokenBalance = createTool({
  id: "wallet_get_token_balance",
  description: "Get the balance of a token account",
  inputSchema: z.object({
    tokenAccountAddress: z.string().describe("The token account address to get balance for"),
    commitment: z.enum(["confirmed", "finalized", "processed"]).optional().describe("The commitment level for the query"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await getTokenBalanceHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error getting token balance: ${error.message}`;
    }
  },
});

export const createTransaction = createTool({
  id: "wallet_create_transaction",
  description: "Create a transaction to transfer SOL (uses default wallet if no fromPublicKey provided)",
  inputSchema: z.object({
    fromPublicKey: z.string().optional().describe("The public key to send from"),
    toPublicKey: z.string().describe("The public key to send to"),
    amount: z.number().describe("The amount of SOL to transfer, in Lamports (1 SOL = 1_000_000_000 Lamports)"),
    commitment: z.enum(["confirmed", "finalized", "processed"]).optional().describe("The commitment level for the query"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await createTransactionMessageHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error creating transaction: ${error.message}`;
    }
  },
});

export const signTransaction = createTool({
  id: "wallet_sign_transaction",
  description: "Sign a transaction with a private key (uses default wallet if no privateKey provided)",
  inputSchema: z.object({
    transaction: z.string().describe("Base58 encoded transaction message"),
    privateKey: z.string().optional().describe("Base58 encoded private key"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await signTransactionMessageHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error signing transaction: ${error.message}`;
    }
  },
});

export const sendTransaction = createTool({
  id: "wallet_send_transaction",
  description: "Send a signed transaction",
  inputSchema: z.object({
    signedTransaction: z.string().describe("Base58 encoded signed transaction"),
    skipPreflight: z.boolean().optional().describe("Whether to skip preflight checks"),
    commitment: z.enum(["confirmed", "finalized", "processed"]).optional().describe("The commitment level for the query"),
    rpcUrl: z.string().optional().describe("The RPC URL to use for the transaction"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await sendTransactionHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error sending transaction: ${error.message}`;
    }
  },
});

export const generateKeyPair = createTool({
  id: "wallet_generate_keypair",
  description: "Generate a new keypair",
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const result = await generateKeyPairHandler({});
      return result.content[0].text;
    } catch (error: any) {
      return `Error generating keypair: ${error.message}`;
    }
  },
});

export const importPrivateKey = createTool({
  id: "wallet_import_private_key",
  description: "Import a private key and get the corresponding public key",
  inputSchema: z.object({
    privateKey: z.string().describe("Base58 encoded private key"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await importPrivateKeyHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error importing private key: ${error.message}`;
    }
  },
});

export const validateAddress = createTool({
  id: "wallet_validate_address",
  description: "Validate a Solana address",
  inputSchema: z.object({
    address: z.string().describe("The address to validate"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await validateAddressHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error validating address: ${error.message}`;
    }
  },
});

export const checkTransaction = createTool({
  id: "wallet_check_transaction",
  description: "Check the status of a transaction",
  inputSchema: z.object({
    signature: z.string().describe("The transaction signature to check"),
    rpcUrl: z.string().optional().describe("The RPC URL to use for the transaction"),
    commitment: z.enum(["confirmed", "finalized"]).optional().describe("The commitment level for the query"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await checkTransactionHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error checking transaction: ${error.message}`;
    }
  },
});

export const switchNetwork = createTool({
  id: "wallet_switch_network",
  description: "Switch between Solana networks (devnet or mainnet)",
  inputSchema: z.object({
    network: z.enum(["devnet", "mainnet"]).describe("The network to switch to"),
  }),
  execute: async ({ context }) => {
    try {
      const result = await switchNetworkHandler(context);
      return result.content[0].text;
    } catch (error: any) {
      return `Error switching network: ${error.message}`;
    }
  },
});

export const getCurrentNetwork = createTool({
  id: "wallet_get_current_network",
  description: "Get the currently active Solana network",
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const result = await getCurrentNetworkHandler({});
      return result.content[0].text;
    } catch (error: any) {
      return `Error getting current network: ${error.message}`;
    }
  },
});

export const tools = {
  getBalance,
  getTokenAccounts,
  getTokenBalance,
  createTransaction,
  signTransaction,
  sendTransaction,
  generateKeyPair,
  importPrivateKey,
  validateAddress,
  checkTransaction,
  switchNetwork,
  getCurrentNetwork,
};

