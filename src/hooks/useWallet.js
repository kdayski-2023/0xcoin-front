import { useEffect, useState } from 'react';
import { getAddress } from '../lib/lib';
import WalletService from '../services/wallet.service';

const useWallet = () => {
  const [userAddress, setUserAddress] = useState(WalletService.state.address);
  const [connected, setConnected] = useState(WalletService.state.connected);
  const [networkName, setNetworkName] = useState(
    WalletService.state.networkName
  );
  const [shortAddress, setShortAddress] = useState(
    getAddress(WalletService.state.address)
  );
  const [chainId, setChainId] = useState(WalletService.state.chainId);
  const [balance, setBalance] = useState(WalletService.balance);
  const [balanceToken, setBalanceToken] = useState(WalletService.balanceToken);
  const [balanceUSDC, setBalanceUSDC] = useState(WalletService.balanceUSDC);
  const [balanceETH, setBalanceETH] = useState(WalletService.balanceETH);
  const [connecting, setConnecting] = useState(WalletService.connecting);
  const [providerType, setProviderType] = useState(WalletService.providerType);
  const [isNotEnoughBalance, setIsNotEnoughBalance] = useState(
    WalletService.isNotEnoughBalance
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    const walletState$ = WalletService.state$.subscribe((state) => {
      setError(state.error);
      setConnected(state.connected);
      setUserAddress(state.address);
      setChainId(state.chainId);
      setNetworkName(state.networkName);
      setShortAddress(getAddress(state.address));
      setBalance(state.balance);
      setBalanceToken(state.balanceToken);
      setBalanceUSDC(state.balanceUSDC);
      setBalanceETH(state.balanceETH);
      setConnecting(state.connecting);
      setProviderType(state.providerType);
      setIsNotEnoughBalance(state.isNotEnoughBalance);
    });

    return () => {
      walletState$.unsubscribe();
    };
  }, []);

  return {
    error,
    providerType,
    connected,
    userAddress,
    networkName,
    shortAddress,
    chainId,
    balance,
    balanceToken,
    balanceUSDC,
    balanceETH,
    connecting,
    isNotEnoughBalance,
  };
};

export default useWallet;
