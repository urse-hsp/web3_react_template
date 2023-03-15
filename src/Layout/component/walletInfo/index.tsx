import React, { useEffect, type ReactNode } from 'react';
import { Button, Popover, Typography } from 'antd';
import style from './index.module.scss';
import { useWeb3Provider } from '@/models/Web3ReactProvider';
import IconFont from '@/components/IconFont';
import { useETHBalances } from '@/hooks_web3/Tokens';
import TokenBalance from '@/components/TokenBalance';

const { Text, Link } = Typography;

interface WalletInfoType {
  children: ReactNode;
}

const WalletInfo: React.FC<WalletInfoType> = (props) => {
  const { disconnect, account } = useWeb3Provider();

  const {
    value: { balances: fiboBalances },
  } = useETHBalances();

  const content = () => (
    <div className={style.content}>
      <>
        <h6 style={{ marginBottom: '5px' }}>钱包地址</h6>
        <div className={style.address}>
          <Text ellipsis copyable={{ tooltips: false, text: account }}>
            {account}
          </Text>
        </div>
      </>

      <>
        <div className="flex-between">
          <span>FIBO余额</span>
          <TokenBalance balance_data={fiboBalances} />
        </div>
      </>

      <>
        <Button type="primary" block onClick={disconnect}>
          退出钱包
        </Button>
        <Link className={`flex-center ${style.footer_btn}`}>
          View on fiboscan &nbsp;
          <IconFont type="icon-tiaozhuan" />
        </Link>
      </>
    </div>
  );
  return (
    <Popover
      placement="topLeft"
      title="我的钱包"
      content={content}
      trigger="click"
      overlayClassName={style.walletInfo}
      overlayStyle={{ textAlign: 'center' }}
    >
      {props.children}
    </Popover>
  );
};
export default WalletInfo;
