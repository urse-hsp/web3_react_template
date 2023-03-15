import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/Modal';
import { useWeb3Provider } from '@/models/Web3ReactProvider';
import config from '@/config';
import style from './index.module.scss';
import { Button } from 'antd';
import WalletInfo from '../walletInfo';
import IconFont from '@/components/IconFont';

interface UserConnectBoxType {
  isVisible?: boolean;
  onClose?: () => any;
}

const UserConnectBox: React.FC<UserConnectBoxType> = (props) => {
  const { t } = useTranslation();
  const { connect, active, loading } = useWeb3Provider();

  return (
    <>
      <>
        {active && (
          <WalletInfo>
            <div className={style.user_wallet + ' flex-item-center cursor'}>
              123
              <IconFont type="icon-a-Frame427318819" />
            </div>
          </WalletInfo>
        )}
        {!active && (
          <Button
            className={`cursor ${style.connect_btn}`}
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
export default memo(UserConnectBox);
