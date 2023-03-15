import React from 'react';
import utils from './utils';
import Web3 from './Web3ReactProvider';
import web3Storage from './Web3ReactProvider/storage';

// 注意排序
const models = {
  web3Storage,
  utils,
  Web3,
};
const modelsData = Object.values(models);

function Web3ReactProvider({ children }: any) {
  return modelsData.reduceRight(
    (children: any, Container: any) => (
      <Container.Provider>{children}</Container.Provider>
    ),
    children,
  );
}

export default React.memo(Web3ReactProvider);
