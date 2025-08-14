import { MCPServer } from "@mastra/mcp";
import { tools } from "./tools";

export const solana = new MCPServer({
  name: "solana-wallet-mcp",
  version: "1.0.0",
  tools: {
    wallet_get_balance: tools.getBalance,
    wallet_get_token_accounts: tools.getTokenAccounts,
    wallet_get_token_balance: tools.getTokenBalance,
    wallet_create_transaction: tools.createTransaction,
    wallet_sign_transaction: tools.signTransaction,
    wallet_send_transaction: tools.sendTransaction,
    wallet_generate_keypair: tools.generateKeyPair,
    wallet_import_private_key: tools.importPrivateKey,
    wallet_validate_address: tools.validateAddress,
    wallet_check_transaction: tools.checkTransaction,
    wallet_switch_network: tools.switchNetwork,
    wallet_get_current_network: tools.getCurrentNetwork,
  },
});

