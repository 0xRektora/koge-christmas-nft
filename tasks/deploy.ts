import { HardhatRuntimeEnvironment } from 'hardhat/types';

export const deploy = async (taskArgs: { noCompile: boolean }, hre: HardhatRuntimeEnvironment) => {
  if (!taskArgs.noCompile) {
    // Compile
    await hre.run('compile');
  }

  console.log(`Deploying on ChainId ${hre.network.config.chainId}`);

  const deployed = await (await hre.ethers.getContractFactory('KogeXMassNFT')).deploy(
    'https://ipfs.io/ipfs/QmSKpS6krRcBenci869E5ryxYShgEoKekuZ2dCLhcvksUo',
  );

  // Verify contracts
  if (
    Number(hre.network.config.chainId) === Number(process.env.CHAIN_ID) &&
    Number(hre.network.config.chainId) !== 1285
  ) {
    await hre.run('verify', {
      network: 'mainnet',
      address: deployed.address,
      constructorArgsParams: ['https://ipfs.io/ipfs/QmSKpS6krRcBenci869E5ryxYShgEoKekuZ2dCLhcvksUo'],
    });
  }
};
