import { useState, useMemo } from 'react';
import { createContainer } from 'unstated-next';

interface defaultStatesType {
  hashAddress: string[];
  setHashAddress: (address: string) => any;

  hashLoadingAddress: string[];
  setLoadingHashAddress: (address: string) => any;
  changeHashAddress: (address: string) => any;
}

function useAppState(): defaultStatesType {
  const [hashAddress, setHashAddressList] = useState<string[]>([]); // 交易哈希列表
  const [hashLoadingAddress, setLoadingHashAddressList] = useState<string[]>(
    [],
  ); // 上链列表交易哈希列表

  // const { setMessage } = useMessage();

  const changeHashAddress = (address: string) => {
    setHashAddressList([...hashAddress, address]);
    const newloadingHash: any = hashLoadingAddress.find(
      (item: any) => item !== address,
    );
    setLoadingHashAddressList(newloadingHash);
  };

  return useMemo(() => {
    return {
      hashAddress,
      hashLoadingAddress,
      setHashAddress: (address: string) => {
        setHashAddressList([...hashAddress, address]);
      },
      setLoadingHashAddress: (address: string) => {
        setLoadingHashAddressList([...hashLoadingAddress, address]);
      },
      changeHashAddress,
    };
  }, [
    hashAddress,
    setHashAddressList,
    hashLoadingAddress,
    setLoadingHashAddressList,
    changeHashAddress,
  ]);
}

const AppState = createContainer(useAppState);

export default AppState;
