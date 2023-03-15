import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// 检测当前浏览器的语言或者从服务器获取配置资源
import XHR from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from './en-US';
import translation_zh from './zh-CN';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import config from '@/config';

const baseLocale = config.BaseLocale;

export const resources: Record<
  string,
  {
    translation: any; // 项目语言包
    name: string; //
    locale: any; // antd库语言包
    dayjsType: string; // antd库语言包
  }
> = {
  en: {
    translation: translation_en,
    name: 'English',
    locale: enUS,
    dayjsType: 'en',
  },
  'zh-cn': {
    translation: translation_zh,
    name: '简体中文',
    locale: zhCN,
    dayjsType: baseLocale,
  },
};

void i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // 默认语言
    fallbackLng: baseLocale,
    lng: baseLocale,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
