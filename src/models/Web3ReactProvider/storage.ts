import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { storage } from '@/utils';
import config from '@/config';
import { type WalletType } from '../Web3ReactProvider';

const NETWORK_ID_NAME = 'NETWORK_ID';
const WALLET_TYPE_NAME = 'WALLET_TYPE';

type defaultStatesType = Record<string, any>;
const defaultStates: defaultStatesType = {
  NETWORK_ID: storage(NETWORK_ID_NAME) ?? config.BASE_NETWORK_ID,
  WALLET_TYPE: storage(WALLET_TYPE_NAME) ?? config.BASE_WALLET_TYPE,
};

interface StorageType {
  networkId: number;
  walletType: WalletType;
  setNetworkId: (t: number) => any;
  setWalletType: (s: WalletType) => any;
}

function useStorage(customInitialStates = {}): StorageType {
  const initStates = Object.assign({}, defaultStates, customInitialStates);
  const [networkId, setNetworkId] = useState<number>(initStates.NETWORK_ID);
  const [walletType, setWalletType] = useState<WalletType>(
    initStates.WALLET_TYPE,
  );

  return {
    networkId,
    walletType,
    setNetworkId: (payload: number) => {
      storage(NETWORK_ID_NAME, payload);
      setNetworkId(payload);
    },
    setWalletType: (payload: WalletType) => {
      storage(WALLET_TYPE_NAME, payload);
      setWalletType(payload);
    },
  };
}

export default createContainer(useStorage);
