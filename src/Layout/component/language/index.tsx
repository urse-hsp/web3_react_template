import React from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { resources } from '@/locales';
import { useTranslation } from 'react-i18next';
import IconFont from '@/components/IconFont';
import dayjs from 'dayjs';

const items: MenuProps['items'] = Object.entries(resources).map((item): any => {
  return {
    key: item[0],
    label: `${item[0].split('-')[0]} ${item[1].name}`, //
  };
});

interface LanguageType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Language: React.FC<LanguageType> = (props) => {
  const { i18n } = useTranslation();

  const handleMenuClick = (e: any) => {
    i18n.changeLanguage(e.key);
    dayjs.locale(resources[e.key].dayjsType);
  };
  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomLeft"
      arrow
    >
      <IconFont
        type="icon-Frame-6"
        style={{ fontSize: '24px' }}
        className="cursor"
      />
    </Dropdown>
  );
};
export default Language;
