import React, { useState, memo } from 'react';
import './index.scss';
import { Space } from 'antd';
import Language from '../language';
import UserConnectBox from '../UserConnectBox';
import { useNavigate } from 'react-router-dom';

interface IndexType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Leftview = memo(() => {
  return (
    <Space className="cursor">
      {/* <img src={url} alt="" style={{ width: '30px', height: '30px' }} /> */}
      <span style={{ fontWeight: 'bold' }}></span>
    </Space>
  );
});

interface rightviewType {
  onClick: () => void;
}
const Rightview = memo(({ onClick }: rightviewType) => {
  const navigate = useNavigate();
  const menuSelect = (e: any) => {
    navigate(e.key);
  };
  return (
    <Space>
      <Language />
      <UserConnectBox />
    </Space>
  );
});

const Index: React.FC<IndexType> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="root-header flex-between">
      <Leftview />
      <Rightview
        onClick={() => {
          setOpen(!open);
        }}
      />
    </nav>
  );
};
export default memo(Index);
