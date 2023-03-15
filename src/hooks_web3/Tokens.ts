import { useMemo, useEffect, useState } from 'react';
import { useTokenContract } from './useContract';
import { useSingleResult } from './index';
import { toReturnState, type ReturnState } from './utils';
import { useWeb3Provider } from '@/models/Web3ReactProvider';
import { BigNumber } from 'bignumber.js';

// TODO: 查找token（用户合约可以查询token地址的信息等。本地有信息则本地返回）
export function useToken(tokenAddress?: string): ReturnState {
  const TokenContract = useTokenContract(tokenAddress);
  const { symbol } = useSingleResult(TokenContract, 'symbol');
  const { decimals } = useSingleResult(TokenContract, 'decimals');
  const { name } = useSingleResult(TokenContract, 'name');

  return useMemo(() => {
    const data = {
      symbol,
      decimals,
      name,
      address: tokenAddress,
    };
    return toReturnState(data);
  }, [symbol, decimals, name]);
}

// token余额
export const useCurrencyBalances = (tokenAddress?: string): ReturnState => {
  const { account } = useWeb3Provider();

  const TokenContract = useTokenContract(tokenAddress ?? undefined);
  const { decimals } = useSingleResult(TokenContract, 'decimals');
  const { balanceOf } = useSingleResult(TokenContract, 'balanceOf', [account]);

  return useMemo(() => {
    const data = {
      balanceOf,
      balances: balanceOf
        ? BigNumber(balanceOf).div(Math.pow(10, decimals)).toFixed()
        : '',
    };

    return toReturnState(data);
  }, [decimals, balanceOf, tokenAddress]);
};

// eth余额
export const useETHBalances = (): ReturnState => {
  const { account, web3Provider: provider } = useWeb3Provider();
  const [pending, setPending] = useState();

  useEffect(() => {
    (async () => {
      if (!provider || !account) return;
      const pending = await provider.getBalance(account, 'pending');
      if (pending) {
        setPending(pending.toString());
      }
    })();
  }, [provider, account]);

  return useMemo(() => {
    const data = {
      pending,
      balances: pending
        ? BigNumber(pending).div(Math.pow(10, 18)).toFixed()
        : '',
    };
    return toReturnState(data);
  }, [pending]);
};
