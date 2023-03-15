import { useWeb3Provider } from '@/models/Web3ReactProvider';
import { useMemo } from 'react';
import { type Contract } from 'ethers';
import { getContract } from './index';
import ERC20_ABI from '@/constants/abis/erc20.json';

// TODO: 合约
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { web3Provider: provider, account } = useWeb3Provider();

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}

// erc20合约
export const useErcContract = () => {
  const { web3Provider: provider, account } = useWeb3Provider();
  return (address: string) => {
    if (!address || !provider || !account) return null;
    return getContract(address, ERC20_ABI, provider, account);
  };
};

// TODO: erc20用户合约（用户查询token合约。）
export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
