import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/router';
import reportWebVitals from '@/utils/reportWebVitals';
import Web3ReactProvider from '@/models';
import '@/styles/index.scss';
import '@/locales';
import config from '@/config';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
require('dayjs/locale/zh-cn');
dayjs.extend(relativeTime);
dayjs.locale(config.BaseLocale); // 默认语言

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider>
        <App />
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
