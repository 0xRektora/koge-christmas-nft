import { task } from 'hardhat/config';
import { deploy } from './tasks/deploy';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('deploy-x', deploy);
