import { useMemo, useEffect, useState } from 'react';
import { useWeb3Provider } from '@/models/Web3ReactProvider';
import { type Contract, ethers } from 'ethers';
import { toCallState, type MethodArg } from './utils';
import AppState from '@/models/appState';
import { message, notification } from 'antd';
import { formatHash, getEtherscanLink, isAddress } from './utils';

// 单个调用结果
export function useSingleResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: MethodArg[],
): any {
  const { account } = useWeb3Provider();
  const [data, setData] = useState<MethodArg | undefined>(undefined);
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName.trim()),
    [contract, methodName],
  );

  useEffect(() => {
    (async () => {
      if (!fragment) return;
      const res = await contract?.[methodName.trim()](...(inputs ?? []));
      setData(res);
    })();
  }, [contract?.address, account]); // , fragment

  return useMemo(() => {
    return toCallState(data, methodName);
  }, [data]);
}

// message
export const useMessage = () => {
  const { web3Provider: provider, chainId } = useWeb3Provider();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoadingHashAddress, changeHashAddress } = AppState.useContainer();

  // message
  const Message = (
    hash: string,
    fn?: () => any,
    successText: string = '链上已确认',
  ) => {
    message.loading('链上确认中...', 0);
    setLoading(true);
    setLoadingHashAddress(hash);
    try {
      provider?.waitForTransaction(hash).then(() => {
        fn?.();
        message.destroy();
        setLoading(false);
        // message.success(successText, 1000);
        notification.success({
          placement: 'topRight',
          message: successText,
          description: `View on fiboscan:${formatHash(hash)}`,
          onClick: () => {
            window.open(
              getEtherscanLink(chainId ?? 0, hash, 'transaction'),
              '_blank',
            );
          },
        });
        changeHashAddress(hash);
      });
    } catch (error) {
      setLoading(false);
    }
  };
  return useMemo(() => {
    return { Message, loading };
  }, [loading]);
};

// 创建合约
export function getContract(
  address: string, // 合约地址
  ABI: any,
  library: any,
  account?: string,
): Contract {
  const AddressZero: string = '0x0000000000000000000000000000000000000000';
  if (!isAddress(address, true) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account),
  );
}

// 处理Provider/Signer
export function getProviderOrSigner(library: any, account?: string): any {
  return account ? getSigner(library, account) : library;
}

// 返回一个新的 Signer 对象，它在发送交易时不执行额外的检查。 有关详细信息，请参阅 getUncheckedSigner。
export function getSigner(library: any, account: string): any {
  return library.getSigner(account).connectUnchecked();
}

export const useContract = () => {};
export const useBalance = () => {};

export { useWeb3Provider };
