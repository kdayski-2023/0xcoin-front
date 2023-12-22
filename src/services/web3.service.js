import WalletService from './wallet.service';
import ERC20Abi from '../abi/ERC20.json';
import { convertFloatToBnString } from '../lib/lib';

const TOKEN_ADDRESS = '0x1D9e08Aad6126FD225171F81e4c4f2AbB2F79e2a';
const TRANSFER_ADDRESS = '0xF77910EC0Af169265cE0Fe660A4d3F0B4b57D890';

class Web3Service {
  constructor() {
    this.wallet$ = WalletService.state$.subscribe((state) => {
      this.walletState = state;
    });
  }

  checkNetwork = async (networkId) => {
    if (this.walletState && this.walletState.connected) {
      if (this.walletState.chainId !== networkId) {
        try {
          await WalletService.changeNetwork(networkId);
        } catch (e) {
          throw new Error(e.message);
        }
      }
    }
  };

  depositUSDC = async (amount) => {
    if (this.walletState && this.walletState.connected) {
      await this.checkNetwork(80001);
      try {
        return await new Promise(async (resolve, reject) => {
          try {
            const contract = new WalletService.web3.eth.Contract(
              ERC20Abi,
              TOKEN_ADDRESS,
              { from: this.walletState.address }
            );
            const decimals = (
              await contract.methods.decimals().call()
            ).toString();
            const value = convertFloatToBnString(amount, decimals);

            let gas, gasPrice;
            try {
              gas = (
                await contract.methods
                  .transfer(TRANSFER_ADDRESS, value)
                  .estimateGas({ from: this.walletState.address })
              ).toString();
            } catch (e) {
              if (amount > WalletService.state.balanceUSDC) {
                reject(new Error('You have not enough tokens on your balance'));
                return;
              }
            }

            const transferData = contract.methods
              .transfer(TRANSFER_ADDRESS, value)
              .encodeABI();

            WalletService.web3.eth
              .sendTransaction({
                to: TOKEN_ADDRESS,
                data: transferData,
                from: this.walletState.address,
                gas,
                gasPrice,
              })
              .on('transactionHash', (hash) => {
                console.log({ hash });
                resolve(hash);
              })
              .on('error', (error) => {
                console.log({ error });
                reject(error);
              })
              .catch((error) => {
                console.log({ error });
                reject(error);
              });
          } catch (e) {
            reject(new Error(e.message.split('{')[0]));
          }
        });
      } catch (e) {
        throw e;
      }
    }
  };
}

const Web3ServiceInstance = new Web3Service();
export default Web3ServiceInstance;
