import { useState, useEffect, useCallback, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { message } from 'antd';
import chains from '@/config/network.chains.json';
import Storage from './storage';

// type dataType = {
//   [key: string]: any
// };

export type WalletType = string;
type WalletProiderType = Record<WalletType, any>;
const WalletProiderData: WalletProiderType = {
  MetaMask: detectEthereumProvider,
};

type catchMsgType = Record<string, string>;

const catchMsg: catchMsgType = {
  '-32002': '请确认您在MetaMask中的操作',
};

interface web3HookType {
  web3Provider: any;
  WalletProider: any;
  chainId: number | undefined;
  account: string;
  active: boolean;
  loading: boolean;
  connect: (
    network_id: number,
    wallet_type: WalletType,
    auto_connect?: boolean,
  ) => any;
  disconnect: () => any;
}

const useWeb3Hook = (): web3HookType => {
  // Web3
  const [web3Provider, setWeb3Provider] = useState<any>(null);
  const [WalletProider, setWalletProider] = useState<any>(null); // Provider 链实例
  const [account, setAccount] = useState<string>(''); // 账户
  const [chainId, setChainId] = useState<number | undefined>(undefined); // ChainId
  const [loading, setLoading] = useState<boolean>(false);

  const { walletType, networkId, setNetworkId } = Storage.useContainer();

  const setProviderChainId = (chainId: string) => {
    return Number(
      chainId.toString().indexOf('0x') === 0 ? parseInt(chainId, 16) : chainId,
    );
  };

  const connect = useCallback(
    async (
      network_id: number,
      wallet_type: WalletType = 'MetaMask',
      auto_connect?: boolean,
    ) => {
      console.log(network_id, 'network_id');
      setLoading(true);

      // 限制支持链
      const chainsInfo: any = chains.find(
        (item: any) => item.networkId === Number(network_id),
      );
      console.log(chainsInfo, 'chainsInfo');

      if (chainsInfo == null) {
        message.error(`不支持的网络，需要切换到支持的网络:${network_id}`);
        return true;
      }

      // 匹配对应钱包Provider
      try {
        let providerInstance: any = null; // 钱包实例 provider
        let account = []; // ox账户

        // WalletProider
        providerInstance = await WalletProiderData?.[wallet_type](); // eth实例 window.ethereum

        // 解锁 MateMask
        if (providerInstance) {
          account = (
            await providerInstance.request({
              method: 'eth_requestAccounts',
            })
          )[0];
        } else {
          if (!auto_connect) {
            message.error(`Please install ${wallet_type} !`);
            return 'Please install';
          }
          return;
        }

        // 切换网络
        const walletChainId = await providerInstance.request({
          method: 'eth_chainId',
        });
        const providerChainId: number = setProviderChainId(walletChainId);

        // Change to current network/更改为当前网络
        if (network_id !== providerChainId) {
          try {
            await providerInstance.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${network_id.toString(16)}` }],
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask./此错误代码表示链尚未添加到MetaMask。
            if (switchError.code === 4902) {
              try {
                const params = {
                  chainId: `0x${network_id.toString(16)}`,
                  chainName: chainsInfo.name,
                  nativeCurrency: chainsInfo.nativeCurrency,
                  rpcUrls: chainsInfo.rpc,
                  blockExplorerUrls: [chainsInfo.explorers[0]?.url],
                };
                await providerInstance.request({
                  method: 'wallet_addEthereumChain',
                  params: [params],
                });
              } catch (addError: any) {
                message.error(addError.message);
                return addError.message;
              }
            } else if (switchError.code === 4001) {
              message.error('❌ 你拒绝了 "切换网络" 的请求');
              return;
            } else if (switchError.code === -32002) {
              message.destroy(
                '😊 已经发送了 "切换网络" 的请求，\n请动动你发财的小手在钱包内确认一下。',
              );
              return;
            } else {
              message.error(switchError.message);
              return switchError.message;
            }
          }
        }

        const web3instance = new ethers.providers.Web3Provider(
          providerInstance,
        );
        const Account = await web3instance._getAddress(account); // ethers.utils.getAddress

        // Set
        setWeb3Provider(web3instance);
        setWalletProider(providerInstance);
        setAccount(Account);
        setChainId(providerChainId);
        setLoading(false);

        return null;
      } catch (e: any) {
        const messgae = catchMsg[e.message] ?? e.message;
        console.error('最终错误', e);
        message.error(messgae);
        return messgae;
      }
    },
    [],
  );

  const disconnect = () => {
    setWeb3Provider(null);
    setWalletProider(null);
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setChainId(undefined);
  };

  useEffect(() => {
    if (networkId && walletType) {
      connect(networkId, walletType, false);
    }
  }, []);

  // 监听登录
  useEffect(() => {
    if (!WalletProider?.on) return;
    WalletProider.on('accountsChanged', (_accounts: any, a: any, b: any) => {
      // 处理新帐户或缺少新帐户（_A）。/ Handle the new _accounts, or lack thereof.
      if (!_accounts.length) return;
      if (account === _accounts[0]) return;
      setAccount(_accounts[0]);
      window.location.reload();
    });

    // chainChanged
    WalletProider.on('chainChanged', async (chainId: any) => {
      const chainIdValue = setProviderChainId(chainId);
      const network: any = chains.find((element: any) => {
        return element.chainId === Number(chainIdValue);
      });
      setNetworkId(network.networkId);
      window.location.reload();
    });

    // disconnect
    WalletProider?.once('disconnect', disconnect);
  }, [WalletProider, account, disconnect, setNetworkId]);

  return useMemo(() => {
    return {
      web3Provider,
      WalletProider,
      chainId,
      account,
      active: !!account,
      connect,
      disconnect,
      loading,
    };
  }, [web3Provider, WalletProider, chainId, account, connect, disconnect]);
};

const Web3Hook = createContainer(useWeb3Hook);

export const useWeb3Provider = (): web3HookType => {
  const data = Web3Hook.useContainer();
  return useMemo(() => {
    return data;
  }, [data]);
};

export default Web3Hook;
