import Web3 from 'web3';

import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { MetaMaskSDK } from '@metamask/sdk';
import BN from 'bn.js';

import { BehaviorSubject } from 'rxjs';
import { isMobile } from '../lib/lib';
import MessageDialogService from './message-dialog.service';
import ERC20Abi from '../abi/ERC20.json';
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

class WalletService {
  initialState = {
    chainId: 1,
    balance: 0,
    balanceUSDC: 0,
    balanceETH: 0,
    connected: false,
    connecting: false,
    isNotEnoughBalance: false,
    address: '',
    networkName: '',
    error: '',
    deviceType: '',
    providerType: '',
    balanceToken: 'ETH',
    // gasETH: 21000,
    // gasToken: 48600,
  };

  state = this.initialState;
  state$ = new BehaviorSubject(this.initialState);

  constructor() {
    this.providerOptions = null;
    this.provider = null;
    this.web3 = null;
    this.metadata = {
      name: 'Coinmentor',
      description: 'Coinmentor',
      url: 'http://0xcoin.io/',
    };
    this.providerConfig = {
      wc: {
        projectId: PROJECT_ID,
        showQrModal: true,
        qrModalOptions: { themeMode: 'light' },
        chains: [1],
        optionalChains: [80001, 42161, 421613],
        methods: [
          'eth_sendTransaction',
          'personal_sign',
          'wallet_switchEthereumChain',
        ],
        events: ['chainChanged', 'accountsChanged', 'disconnect'],
        metadata: this.metadata,
      },
      mm: {
        dappMetadata: this.metadata,
      },
    };

    this.activateConnection();
  }

  activateConnection = async () => {
    this.state = {
      ...this.state,
      connecting: true,
    };
    this.state$.next(this.state);
    const walletLS = JSON.parse(window.localStorage.getItem('wallet'));

    if (walletLS) {
      await this.#setProviderOptions(walletLS.providerType, true);

      const addressResponse = await this.#getUserAddress(walletLS.deviceType);
      const chainId = Number((await this.web3.eth.getChainId()).toString());
      const networkName = await this.#getNetworkName(chainId);

      this.state = {
        ...this.state,
        ...walletLS,
        connected: true,
        address: addressResponse[0],
        chainId,
        networkName,
        connecting: false,
      };

      this.#storeConnection();

      this.state$.next(this.state);
    } else {
      this.state = {
        ...this.state,
        connecting: false,
      };

      this.state$.next(this.state);
    }
  };

  #getUserAddress = async (deviceType) => {
    if (
      deviceType === 'desktop' &&
      !Object.keys(this.provider).includes('wc')
    ) {
      return await this.provider.request({
        method: 'eth_requestAccounts',
      });
    } else {
      return this.provider.enable();
    }
  };

  #getBalance = async (token, address, provider) => {
    try {
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(ERC20Abi, token);
      const balance = await contract.methods.balanceOf(address).call();
      const decimals = await contract.methods.decimals().call();
      if (decimals === '18') {
        return this.#roundDown(web3.utils.fromWei(balance, 'ether'), 6);
      }
      if (decimals !== '18') {
        const delimiter = new BN('10')
          .pow(new BN(String(18 - Number(decimals))))
          .toString();
        const value = new BN(String(balance)).mul(new BN(delimiter)).toString();
        return this.#roundDown(web3.utils.fromWei(value, 'ether'), 6);
      }
    } catch (e) {
      console.log('samara', e);
      throw e;
    }
  };

  #roundDown = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(num * precision) / precision;
  };

  setBalanceToken = async (config, targetSymbol) => {
    const { CHAIN_LIST, PAYIN_TOKEN_ADDRESS_LIST } = config;
    const currentToken = PAYIN_TOKEN_ADDRESS_LIST[CHAIN_LIST[0]].find(
      (item) => item.tokenSymbol === targetSymbol
    );
    targetSymbol = currentToken ? currentToken.tokenSymbol : 'ETH';

    this.state = {
      ...this.state,
      balanceToken: targetSymbol,
    };

    this.state$.next(this.state);
  };

  setBalance = async (config, wallet, targetSymbol) => {
    if (!this.state.connected) {
      return;
    }

    const { chainId } = wallet;
    const {
      WITHDRAWAL_TOKEN_ADDRESS,
      CHAIN_LIST,
      PAYIN_TOKEN_ADDRESS_LIST,
      INFURA_PROVIDERS,
    } = config;
    if (this.provider && CHAIN_LIST.includes(Number(chainId))) {
      const currentToken = PAYIN_TOKEN_ADDRESS_LIST[chainId].find(
        (item) => item.tokenSymbol === targetSymbol
      );
      targetSymbol = currentToken ? currentToken.tokenSymbol : 'ETH';
      const targetToken = currentToken
        ? currentToken.tokenAddress
        : '0x0000000000000000000000000000000000000000';
      let balance;

      if (targetToken === '0x0000000000000000000000000000000000000000') {
        const balanceWei = await this.web3.eth.getBalance(this.state.address);
        balance = this.#roundDown(
          this.web3.utils.fromWei(balanceWei, 'ether'),
          6
        );
      } else {
        balance = await this.#getBalance(
          targetToken,
          this.state.address,
          INFURA_PROVIDERS[chainId]
        );
      }
      const balanceWei = await this.web3.eth.getBalance(this.state.address);
      const balanceETH = this.#roundDown(
        this.web3.utils.fromWei(balanceWei, 'ether'),
        6
      );
      const balanceUSDC = await this.#getBalance(
        WITHDRAWAL_TOKEN_ADDRESS[this.state.chainId],
        this.state.address,
        INFURA_PROVIDERS[chainId]
      );

      this.state = {
        ...this.state,
        balance,
        balanceETH,
        balanceUSDC,
        balanceToken: targetSymbol,
      };

      this.#storeConnection();

      this.state$.next(this.state);
    }
  };

  isNotEnoughBalance = async (price, amount, direction) => {
    if (!this.state.connected) {
      return;
    }

    let result = false;
    if (direction === 'sell' && amount) {
      result = amount >= this.state.balance;
    }
    if (direction === 'buy' && amount && price) {
      result = amount * price > this.state.balanceUSDC;
    }
    this.state = {
      ...this.state,
      isNotEnoughBalance: result,
    };

    this.state$.next(this.state);
  };

  connect = async (provider) => {
    if (this.state.connected) {
      return;
    }
    this.state = {
      ...this.state,
      connecting: true,
    };
    this.state$.next(this.state);

    const deviceType = isMobile() ? 'mobile' : 'desktop';

    await this.#setProviderOptions(provider);

    if (this.provider) {
      const addressResponse = await this.#getUserAddress(deviceType);
      const chainId = Number((await this.web3.eth.getChainId()).toString());
      const networkName = await this.#getNetworkName(chainId);

      this.state = {
        ...this.state,
        connected: true,
        address: addressResponse[0],
        chainId,
        networkName,
        deviceType,
        providerType: provider,
        connecting: false,
      };

      this.#storeConnection();

      this.state$.next(this.state);
    }
  };

  disconnect = async () => {
    if (this.state.providerType === 'wc')
      this.web3.eth.currentProvider.disconnect();
    window.localStorage.removeItem('wallet');

    this.state = {
      ...this.initialState,
      chainId: this.state.chainId,
      balanceToken: this.state.balanceToken,
    };
    this.state$.next(this.state);
  };

  changeNetwork = async (network) => {
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(Number(network)) }],
      });
    } catch (e) {
      throw e;
    }
  };

  #getBCDataByNetworkId = async (networkId) => {
    switch (networkId) {
      case 1:
        return 'Etherium Mainnet';
      case 80001:
        return 'Mumbai Testnet';
      case 42161:
        return 'Arbitrum Mainnet';
      case 421613:
        return 'Arbitrum Goerli';
      default:
        return 'Unlisted network';
    }
  };

  #getNetworkName = async (networkId) => {
    return await this.#getBCDataByNetworkId(networkId);
  };

  #setProviderOptions = async (provider, shadow = false) => {
    try {
      switch (provider) {
        case 'wc':
          this.provider = await EthereumProvider.init(this.providerConfig.wc);
          if (!shadow) await this.provider.connect();
          break;
        case 'mm':
          const MMSDK = new MetaMaskSDK(this.providerConfig.mm);
          this.provider = MMSDK.getProvider();
          break;
        default:
          this.provider = await EthereumProvider.init(this.providerConfig.wc);
          if (!shadow) await this.provider.connect();
          break;
      }
      try {
        await this.provider.request({ method: 'eth_requestAccounts' });
      } catch (e) {
        console.log(e);
        if (e.code === 4001) {
          this.provider = null;
          throw new Error(e.message);
        }
        if (e.code === -32002) {
          const errMessage =
            'Connection request is already pending. Please confirm.';
          throw new Error(errMessage);
        }
        await this.disconnect();
        await this.provider.connect();
        await this.provider.request({ method: 'eth_requestAccounts' });
      }
      this.web3 = new Web3(this.provider);
    } catch (error) {
      console.log(error);
      MessageDialogService.showError(error.message, 'Provider error');
      await this.disconnect();
      return;
    }

    // Subscribe to accounts change
    this.provider.on('accountsChanged', async (accounts) => {
      await this.#accountChanged(accounts);
    });

    // Subscribe to chainId change
    this.provider.on('chainChanged', async (chainId) => {
      await this.#chainChanged(+chainId);
    });

    // Subscribe to session disconnection
    this.provider.on('disconnect', async (error) => {
      await this.#providerDisconnected(error);
    });

    // Subscribe to error
    this.provider.on('error', async (error) => {
      console.log({ error });
      // await this.#providerDisconnected(error);
    });

    // this.web3.eth.net.isListening(async (error) => {
    //   if (error) {
    //     await this.disconnect();
    //     MessageDialogService.showError(error.message, 'Provider error');
    //   }
    // });
  };

  #accountChanged = async (accounts) => {
    if (this.state.connected) {
      this.state = {
        ...this.state,
        address: accounts[0],
      };
      this.#storeConnection();
      this.state$.next(this.state);
    }
  };

  #chainChanged = async (chainId) => {
    if (this.state.connected) {
      try {
        const networkName = await this.#getNetworkName(chainId);
        this.state = {
          ...this.state,
          connected: true,
          networkName,
          chainId: chainId,
        };
        this.#storeConnection();
        this.state$.next(this.state);
      } catch (e) {
        this.state = {
          ...this.state,
          connected: false,
          chainId: chainId,
          error: e.message,
        };
        this.state$.next(this.state);
      }
    }
  };

  // async getFeePrice(estimated_delivery_price, direction) {
  //   let gasAmount = 0;
  //   switch (direction) {
  //     case 'sell':
  //       gasAmount = this.state.gasETH;
  //       break;
  //     case 'buy':
  //       gasAmount = this.state.gasToken;
  //       break;
  //     default:
  //       break;
  //   }
  //   if (!gasAmount) return 0;
  //   const gasPrice = await this.web3.eth.getGasPrice();
  //   const fee = gasPrice * gasAmount;
  //   const eth = this.web3.utils.fromWei(`${fee}`, 'ether');
  //   const feePrice = estimated_delivery_price * eth;
  //   return feePrice;
  // }

  #providerDisconnected = async (error) => {
    // TODO:
    // console.log('disconnect', error);
    // this.state = {
    // 	...this.state,
    // 	connected: false,
    // 	error,
    // };
    // this.state$.next(this.state);
  };

  #storeConnection() {
    window.localStorage.setItem(
      'wallet',
      JSON.stringify({
        address: this.state.address,
        chainId: this.state.chainId,
        networkName: this.state.networkName,
        deviceType: this.state.deviceType,
        providerType: this.state.providerType,
      })
    );
  }
}

const WalletServiceInstance = new WalletService();
export default WalletServiceInstance;
