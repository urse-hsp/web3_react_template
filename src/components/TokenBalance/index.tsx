import React from 'react';
import { useCurrencyBalances } from '@/hooks_web3/Tokens';
import Loading from '@/components/loading';
import { Tooltip } from 'antd';
import Statistic from './Statistic';

const TokenNum = (props: { address?: any; balance_data?: string | number }) => {
  const { address, balance_data } = props;

  const { value } = useCurrencyBalances(address ?? undefined);
  const { loading, value: balances } = value;

  // const [transition, setTransition] = useState<boolean>(false);
  // useEffect(() => {
  //   setTransition(true);
  //   const time: any = setTimeout(() => {
  //     setTransition(false);
  //   }, 150);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [address, balance_data]);

  if (!loading && !balance_data) {
    return <Loading size="15px" />;
  }

  return (
    <Tooltip title={balance_data ?? balances}>
      <Statistic value={balance_data ?? balances} />
    </Tooltip>
  );
};
export default TokenNum;
