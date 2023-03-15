import React, { type ReactNode, useLayoutEffect, useState } from 'react';
import { ConfigProvider, theme, Switch } from 'antd';
import utils from '@/models/utils';
import { useTranslation } from 'react-i18next';
import { resources } from '@/locales';

const { useToken } = theme;

interface AppPageType {
  children: ReactNode;
}

const algorithmList: any = {
  dark: theme.darkAlgorithm,
  light: theme.defaultAlgorithm,
};

const App: React.FC<AppPageType> = (props) => {
  const { theme: themeType, setTheme } = utils.useContainer();
  const { token } = useToken();
  const [enableDarkMode, setEnableDarkMode] = useState(themeType === 'light');
  useLayoutEffect(() => {
    setTheme(enableDarkMode ? 'light' : 'dark');
  }, [enableDarkMode]);

  useLayoutEffect(() => {
    const r: any = document.querySelector(':root');

    r.style.backgroundColor = token.colorBgLayout;
    r.style.color = token.colorTextBase;
    r.style.setProperty('--colorBgLayout', token.colorBgLayout);
    r.style.setProperty('--colorTextBase', token.colorTextBase);
    r.style.setProperty('--colorPrimary', token.colorPrimary);
  }, [themeType]);

  return (
    <>
      {props.children}
      <Switch
        checkedChildren="白"
        unCheckedChildren="黑"
        checked={enableDarkMode}
        onChange={(v) => {
          setEnableDarkMode(v);
        }}
      />
    </>
  );
};

const AppPage: React.FC<AppPageType> = (props) => {
  const { theme: themeType } = utils.useContainer();
  const { i18n } = useTranslation();

  // colorPrimary // 主题色
  // colorSuccess // 成功色
  // colorWarning // 警告色
  // colorError // 危险/报错

  // colorWhite // 不随主题变化的纯白色
  // colorText 文本颜色

  // colorBorder // 边框
  // colorBgElevated// 盒子容器背景
  // colorBgBase // 背景颜色

  const themeColor = '';
  const algorithm = algorithmList[themeType];

  return (
    <ConfigProvider
      locale={resources[i18n.language].locale}
      theme={{
        algorithm: [algorithm],
        token: {
          colorPrimary: themeColor,
          colorLink: themeColor,
        },
        components: {
          // Button: {
          //   colorPrimary: themeColor,
          // },
        },
      }}
    >
      <App>{props.children}</App>
    </ConfigProvider>
  );
};
export default AppPage;
