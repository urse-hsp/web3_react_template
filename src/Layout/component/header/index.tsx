import React, { useState, memo } from 'react';
import { Space, Button } from 'antd';
import Language from '../language';
import { useNavigate } from 'react-router-dom';
import { useWeb3Provider } from '@/models/Web3ReactProvider';
import config from '@/config';
import { useTranslation } from 'react-i18next';
import WalletInfo from '../walletInfo';
import IconFont from '@/components/IconFont';
import Modal from '@/components/Modal';
import './index.scss';

interface IndexType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Leftview = memo(() => {
  return (
    <Space className="cursor">
      <img
        src={
          'https://img2.baidu.com/it/u=1035356506,3713698341&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1678986000&t=9ac49d503ad7245757d4e57664354f1f'
        }
        alt=""
        style={{ width: '30px', height: '30px' }}
      />
      <span style={{ fontWeight: 'bold' }}></span>
    </Space>
  );
});

const UserConnectBox: React.FC = () => {
  const { t } = useTranslation();
  const { connect, active, loading, account } = useWeb3Provider();

  return (
    <>
      <>
        {active && (
          <WalletInfo>
            <div className={'user_wallet flex-item-center cursor'}>
              {account}
              <IconFont type="icon-a-Frame427318819" />
            </div>
          </WalletInfo>
        )}
        {!active && (
          <Button
            className={'cursor connect_btn'}
            onClick={() =>
              connect(config.BASE_NETWORK_ID, config.BASE_WALLET_TYPE)
            }
            loading={loading}
          >
            {t('Connect Wallet')}
          </Button>
        )}
      </>
      <Modal isVisible={false} />
    </>
  );
};
const UserConnectView = memo(UserConnectBox);

const Index: React.FC<IndexType> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="root-header">
      <div className="root-header-main flex-between">
        <Leftview />
        <Space>
          <Language />
          <UserConnectView />
        </Space>
      </div>
    </nav>
  );
};
export default memo(Index);
