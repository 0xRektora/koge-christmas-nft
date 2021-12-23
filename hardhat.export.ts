import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";


dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [
              {
                privateKey: process.env.PRIVATE_KEY,
                balance: "100000000000000000000",
              },
            ]
          : [],
      forking: {
        url: process.env.MAINNET || "",
      },
    },
    mainnet: {
      url: process.env.MAINNET || "",
      chainId: Number(process.env.CHAIN_ID || 1),
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.BLOCKSCAN_KEY,
  },
};

export default config;
