import { useState, useCallback, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import { storage } from '@/utils';

type themeColor = 'light' | 'dark';
interface defaultStatesType {
  theme: themeColor;
  globalLoading: boolean;
}
const defaultStates: defaultStatesType = {
  theme: storage('theme') !== 'dark' ? 'light' : 'dark',
  globalLoading: false,
};

interface utilsType {
  darkMode: boolean;
  theme: string;
  setTheme: (t: themeColor) => any;
}

function useAppUtils(customInitialStates = {}): utilsType {
  const initialStates = {
    ...defaultStates,
    ...customInitialStates,
  };
  const [theme, setThemeProp] = useState<string>(initialStates.theme ?? '');

  // Init
  // window.document.documentElement.setAttribute('theme-color', theme);

  const setTheme = useCallback(
    (t: string) => {
      t = t ?? theme;
      // window.document.documentElement.setAttribute('theme-color', t);
      storage('theme', t);
      setThemeProp(t);
    },
    [setThemeProp],
  );

  return {
    darkMode: theme === 'dark',
    theme,
    setTheme,
  };
}

const Utils = createContainer(useAppUtils);

export const useUtils = () => {
  const data = Utils.useContainer();
  return useMemo(() => {
    return data;
  }, [data]);
};

export default Utils;
