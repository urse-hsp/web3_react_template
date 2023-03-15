import React, { useEffect } from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import Route from '@/router/index';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 国际化测试
    setTimeout(() => {
      void i18n.changeLanguage('en');
    }, 2000);
  }, []);
  return (
    <div className="App">
      {t('help')}
      <Route />
    </div>
  );
}

export default App;
