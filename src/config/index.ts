import chains from './network.chains.json';
const { version } = require('@package');

const env = process.env.REACT_APP_ENV;

/**
 * @description 系统全局配置 统一调用接入【默认正式环境配置】
 *
 */
interface BaseDataType {
  BASE_URL: string;
  CHAIN_ID: number; // 默认链 ID
  Contract: string; // 合约
  NETWORK_URL: string; // 链url
}

const BaseData: BaseDataType = {
  BASE_URL: '',
  CHAIN_ID: 1230,
  Contract: '',
  NETWORK_URL: '',
};
if (env === 'development') {
  BaseData.BASE_URL = '';
}

const { BASE_URL, CHAIN_ID, Contract, NETWORK_URL } = BaseData;
const config = {
  // 环境
  env,
  version,
  BASE_URL,
  BaseLocale: 'zh-cn', // 中文

  // 钱包
  BASE_NETWORK_ID: 1230,
  BASE_WALLET_TYPE: 'MetaMask',
  chains, // 支持链
  WEBSITE: 'FlySwap',
  precision: 2,

  // 主网
  CHAIN_ID,
  NETWORK_URL,
  Contract,
};
export default config;
